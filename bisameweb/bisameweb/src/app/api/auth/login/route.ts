import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    console.log('Received request at /api/auth/login');
    
    // Parse the request body
    const requestText = await request.text();
    console.log('Raw request body:', requestText);
    
    let body;
    try {
      body = JSON.parse(requestText);
    } catch (e) {
      console.error('Failed to parse request body as JSON:', e);
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, { status: 400 });
    }
    
    console.log('Parsed request body:', body);
    
    const { phoneNumber, password, countryShortName } = body;
    
    // Validate required fields
    if (!phoneNumber) {
      console.error('Missing phoneNumber in request');
      return NextResponse.json({
        success: false,
        message: 'Missing required field: phoneNumber',
      }, { status: 400 });
    }
    
    if (!password) {
      console.error('Missing password in request');
      return NextResponse.json({
        success: false,
        message: 'Missing required field: password',
      }, { status: 400 });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
    const loginPath = process.env.NEXT_PUBLIC_LOGIN_API_URL;
    
    if (!baseUrl || !loginPath) {
      console.error('NEXT_PUBLIC_AUTH_API_BASE_URL or NEXT_PUBLIC_LOGIN_API_URL is not defined');
      return NextResponse.json({
        success: false,
        message: 'Server configuration error: Missing API URL',
      }, { status: 500 });
    }
    
    // Combine base URL and login path
    const apiUrl = `${baseUrl.replace(/\/$/, '')}${loginPath}`;
    
    console.log('Login API URL:', apiUrl);
    
    // Format the phone number to ensure it's in the expected format
    // Remove any non-digit characters
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 0, replace with country code (233 for Ghana)
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '233' + formattedPhone.substring(1);
    }
    // If it doesn't start with country code, add it
    else if (!formattedPhone.startsWith('233')) {
      formattedPhone = '233' + formattedPhone;
    }
    
    // Request data with new structure
    const requestData = {
      phoneNumber: formattedPhone,
      password,
      countryShortName: countryShortName || "GH"
    };
    
    console.log('Sending request to external API:', requestData);
    
    try {
      let headers: Record<string, string> | undefined = undefined;
      const response = await axios({
        method: 'POST',
        url: apiUrl,
        headers,
        data: requestData,
        timeout: 10000 // 10 second timeout
      });
      
      console.log('External API Response:', {
        status: response.status,
        data: response.data
      });
      
      // Set auth-token cookie if token is present in response
      const token = response.data.data?.token; 
      if (token) {
        const cookie = `auth-token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=None; Secure`;
        headers = { 'Set-Cookie': cookie };
      }
      
      // Return the response as-is from the external API
      return NextResponse.json(response.data, headers ? { headers } : undefined);
    } catch (apiError: unknown) {
      console.error('External API Error:', apiError);
      
      // Log the complete error response for debugging
      if (axios.isAxiosError(apiError)) {
        console.error('Error Response Data:', apiError.response?.data);
        console.error('Error Response Status:', apiError.response?.status);
        console.error('Error Response Headers:', apiError.response?.headers);
      }
      
      if (axios.isAxiosError(apiError) && (apiError.code === 'ECONNREFUSED' || apiError.code === 'ETIMEDOUT' || apiError.code === 'ENOTFOUND')) {
        return NextResponse.json({
          success: false,
          message: 'Unable to connect to the authentication service. Please try again later.',
          error: apiError.message
        }, { status: 503 });
      }
      
      if (axios.isAxiosError(apiError) && apiError.response) {
        // If the API returns a specific error message, pass it through
        const errorMessage = apiError.response.data?.message ||
                            apiError.response.data?.error ||
                            'Login failed. Please check your credentials.';
                            
        return NextResponse.json({
          success: false,
          message: errorMessage,
          error: apiError.response.data
        }, { status: apiError.response.status || 400 });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Error connecting to authentication service',
        error: apiError instanceof Error ? apiError.message : 'Unknown error'
      }, { status: 503 });
    }

  } catch (error: unknown) {
    console.error('API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
      status: axios.isAxiosError(error) ? error.response?.status : undefined
    });
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to login.',
          error: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: 'Server error', error: errorMessage },
      { status: 500 }
    );
  }
}
