import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OptionsProps, TriggerProps } from "../../Foods/context/FormContext";

const useFetchDynamicOptions = (
  trigger: TriggerProps,
  attributeKey: string,
  attributeValue: string,
  optionKey: string,
  handleChangeOptionData: (data: OptionsProps) => void
) => {
  const searchParams = useSearchParams();
  const group = "Buy and Sell";
  const category = searchParams.get("category") as string;
  const subCategory = searchParams.get("subCategory") as string;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const apiUrl = `/api/dynamicOptions?category=${encodeURIComponent(
        category
      )}&subCategory=${encodeURIComponent(
        subCategory
      )}&attributeKey=${encodeURIComponent(
        attributeKey
      )}&attributeValue=${encodeURIComponent(
        attributeValue
      )}&optionKey=${optionKey}&group=${encodeURIComponent(group)}`;
      
      try {
        const response = await axios.get(apiUrl);
        if (response.data) {
          setData(response.data.data || []);
          handleChangeOptionData({
            options: response.data.data || [],
            triggerAttribute: attributeKey,
          });
          toast.success(response.data.message || "Options updated");
        }
      } catch (error) {
        console.error("Dynamic fetch failed:", error);
      }
    };
    
    if (
      trigger.triggerValue &&
      attributeKey &&
      attributeValue &&
      optionKey &&
      category &&
      subCategory
    ) {
      fetcher();
    }
  }, [trigger.triggerValue, attributeKey, attributeValue, optionKey, category, subCategory, handleChangeOptionData]);

  return { data };
};

export default useFetchDynamicOptions;
