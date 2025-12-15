"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ObjectProps = Record<string, string | string[] | (string | string[])[]>;

export interface OptionsProps {
  options: string[];
  triggerAttribute: string;
}

export interface TriggerProps {
  triggerValue: string;
  triggerAttribute: string;
}

interface ContextProps {
  error: Record<string, string>;
  handleUpdateError: (errors: Record<string, string>) => void;
  FormData: ObjectProps;
  triggerValue: TriggerProps;
  optionData: OptionsProps;
  newOptions: Record<string, string[]> | undefined;
  handleChangeOptionData: (data: OptionsProps) => void;
  handleFormData: (data: ObjectProps) => void;
  handleTriggerValue: (value: TriggerProps) => void;
  clearFormData: () => void;
  handleUpdateOptions: (data: Record<string, string[]>) => void;
}

const Context = createContext<ContextProps | null>(null);

const FormContext = ({ children }: { children: React.ReactNode }) => {
  //
  const [FormData, setFormData] = useState<ObjectProps>({});
  const [error, setError] = useState<Record<string, string>>({});

  console.log(error);

  const handleUpdateError = (errors: Record<string, string>) => {
    setError(errors);
  };

  // Handles the dynamic options which are dependent
  const [triggerValue, setTriggerValue] = useState<TriggerProps>({
    triggerAttribute: "",
    triggerValue: "",
  });
  const [optionData, setOptionData] = useState<OptionsProps>({
    options: [],
    triggerAttribute: "",
  });
  const [newOptions, setNewOptions] = useState<Record<string, string[]>>();

  const handleUpdateOptions = (data: Record<string, string[]>) =>
    setNewOptions((prev) => ({ ...prev, ...data }));

  const handleChangeOptionData = (data: OptionsProps) => setOptionData(data);
  const clearFormData = () => setFormData({});
  const handleTriggerValue = (value: TriggerProps) => setTriggerValue(value);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("baseFormData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("baseFormData", JSON.stringify(FormData));
  }, [FormData]);

  const handleFormData = (data: ObjectProps) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Context.Provider
      value={{
        newOptions,
        error,
        FormData,
        triggerValue,
        optionData,
        handleUpdateError,
        handleFormData,
        handleTriggerValue,
        handleChangeOptionData,
        clearFormData,
        handleUpdateOptions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Forgot to wrap context with Provider");
  return context;
};

export default FormContext;
