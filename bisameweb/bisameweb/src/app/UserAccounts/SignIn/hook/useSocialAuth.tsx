import {
  auth,
  googleProvider,
  browserPopupRedirectResolver,
} from "@/firebase/firebaseConfig";
import axios from "axios";
import {
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import toast from "react-hot-toast";

let inFlight = false;

const useSocialAuth = () => {
  const signIn = async () => {
    if (inFlight) return;
    inFlight = true;

    const loadingToast = toast.loading("Signing you in securely. Please wait…");

    try {
      // Ensure persistence before popup
      await setPersistence(auth, browserLocalPersistence);

      let firebaseResponse;

      try {
        firebaseResponse = await signInWithPopup(
          auth,
          googleProvider,
          browserPopupRedirectResolver
        );
      } catch (e) {
        const message = e instanceof Error ? e.message.toLowerCase() : "";

        // Popup fallback
        if (
          message.includes("popup-blocked") ||
          message.includes("popup-closed-by-user") ||
          message.includes("pending promise was never set") ||
          message.includes("internal assertion failed")
        ) {
          toast.dismiss(loadingToast);
          toast.loading("Opening sign-in…");
          await signInWithRedirect(auth, googleProvider);
          return;
        }

        throw e;
      }

      const user = firebaseResponse.user;
      if (!user) throw new Error("User authentication failed.");

      const idToken = await user.getIdToken();
      if (!idToken) throw new Error("Unable to retrieve authentication token.");

      const payload = {
        accessToken: idToken,
        fcmToken: null,
        referralCode: null,
      };

      const response = await axios.post("/api/auth/googleAuth", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Authentication could not be completed."
        );
      }

      const authToken = response.data?.data?.token;
      if (!authToken)
        throw new Error("No authentication token returned from server.");

      // Save session
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("auth_token", authToken);

      if (response.data?.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }

      toast.dismiss(loadingToast);
      toast.success("You have been signed in successfully.");

      // 🔑 FINAL REDIRECT LOGIC
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo");

      // ✅ Go back ONLY if it was a dashboard route
      if (returnTo && returnTo.startsWith("/dashboard")) {
        window.location.href = returnTo;
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      toast.dismiss(loadingToast);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401)
          toast.error("Authentication failed. Please sign in again.");
        else if (status === 403)
          toast.error("You do not have permission to access this account.");
        else if (status === 400)
          toast.error(
            "The sign-in request could not be processed. Please try again."
          );
        else toast.error("Sign-in was unsuccessful. Please try again later.");
      } else if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes("popup-closed-by-user"))
          toast.error("Sign-in was cancelled.");
        else if (message.includes("popup-blocked"))
          toast.error(
            "Sign-in popup was blocked. Please enable popups and try again."
          );
        else if (message.includes("network"))
          toast.error(
            "A network error occurred. Please check your connection."
          );
        else toast.error("An unexpected error occurred during sign-in.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      // Cleanup
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    } finally {
      inFlight = false;
    }
  };

  return { signIn };
};

export default useSocialAuth;
