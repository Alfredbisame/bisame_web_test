"use client";
import React, { createContext, useEffect, useState } from "react";
import { ProductPromoListProps, PromoListProps } from "../constants";
import { BenefitProps } from "../PromotionCard";
import toast from "react-hot-toast";
import {
  BenefitItem,
  ObjectProps,
  PromoContextProps,
  PromoNav,
  PromotionChildrenProps,
  PromotionPlanData,
  SelectedItems,
} from "../interfaces";
import { isBenefitArray } from "../utils";

const PromoContext = createContext<PromoContextProps | null>(null);

const PromotionContext: React.FC<PromotionChildrenProps> = ({ children }) => {
  // State to track the promotion nav
  const [promoNav, setPromoNav] = useState<PromoNav>("main");

  const handlePromoNavChange = (nav: PromoNav) => {
    setPromoNav(nav);
  };

  const [selectedPromotion, setSelectedPromotion] = useState<ObjectProps>({});

  console.log(selectedPromotion);

  const handleSelectPromotion = (data: ObjectProps) => {
    setSelectedPromotion((prevSelected) => ({ ...prevSelected, ...data }));
  };

  const [selectedProduct, setSelectedProduct] = useState<
    ProductPromoListProps[]
  >([]);
  const [countListing, setCountListing] = useState(0);
  const [benefit, setBenefit] = useState<BenefitProps[]>();
  const [, setReachMaxLimit] = useState(false);

  // Selection items
  const [sectionItems, setSectionItems] = useState<SelectedItems[] | []>([]);

  const handleSectionItems = (sectionTitle: string, value: string) => {
    setSectionItems((prev) => {
      const existing = prev.find((item) => item.sectionTitle === sectionTitle);

      if (!existing) {
        return [
          ...prev,
          {
            sectionTitle,
            selectedItems: [value],
          },
        ];
      }

      return prev.map((item) =>
        item.sectionTitle === sectionTitle
          ? {
              ...item,
              selectedItems: item.selectedItems.includes(value)
                ? item.selectedItems
                : [...item.selectedItems, value],
            }
          : item
      );
    });
  };

  const handleRemoveSectionItem = (sectionTitle: string, value: string) => {
    setSectionItems((prev) =>
      prev
        .map((item) =>
          item.sectionTitle === sectionTitle
            ? {
                ...item,
                selectedItems: item.selectedItems.filter((x) => x !== value),
              }
            : item
        )
        .filter((item) => item.selectedItems.length > 0)
    );
  };

  const [benefitQuantity, setBenefitQuantity] =
    useState<Record<string, number>>();
  const [selectedCount, setSelectedCount] = useState(0);

  // Logic to track my promotions selected
  const [promotionSelected, setPromotionSelected] = useState<PromoListProps>(
    []
  );

  // Logic to store any details on promotion plan selected
  const [promoPlan, setPromoPlan] = useState<PromotionPlanData>();

  const handlePromoPlan = (data: PromotionPlanData) => {
    setPromoPlan(data);
  };

  const handleAddPromotion = (data: string) => {
    setPromotionSelected((prevPromo) => [
      ...(prevPromo as PromoListProps),
      data,
    ]);
  };

  const handleRemovePromotion = (data: string) => {
    setPromotionSelected((prevPromo) => {
      const filterPromo = prevPromo?.filter((promoName) => promoName !== data);
      return filterPromo;
    });
  };

  const handleBenefitChange = (data: BenefitProps[]) => setBenefit(data);

  const handleIncrementCount = (key: string) => {
    setBenefitQuantity((prev) => {
      if (!prev) return prev;
      if (prev[key] > 0) return { ...prev, [key]: prev[key] - 1 };
      return prev;
    });
  };

  const handleDecrementCount = (key: string) => {
    setBenefitQuantity((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: (prev[key] || 0) + 1 };
    });
  };

  const handleIncrementSelectedCount = () =>
    setSelectedCount((prev) => prev + 1);
  const handleDecrementSelectedCount = () =>
    setSelectedCount((prev) => Math.max(prev - 1, 0));
  const handleResetSelectedCount = () => setSelectedCount(0);

  useEffect(() => {
    const benefit = selectedPromotion?.benefit;

    if (!isBenefitArray(benefit)) return;

    const quantities: Record<string, number> = benefit.reduce(
      (acc: Record<string, number>, b: BenefitItem) => {
        const key = b.sectionTitle.replaceAll(" ", "").toLowerCase();
        acc[key] = b.numberOfItemsAllowed;
        return acc;
      },
      {}
    );

    setBenefitQuantity(quantities);
  }, [selectedPromotion?.benefit]);

  useEffect(() => {
    if (selectedCount === selectedPromotion?.adsNumber) {
      toast.success("You have reached your maximum limit");
      setReachMaxLimit(true);
    }
  }, [selectedCount, selectedPromotion?.adsNumber]);

  const handleSelectedProduct = (data: ProductPromoListProps) => {
    setSelectedProduct((prev) => [...prev, data]);
  };

  const handleRemoveSelectedProduct = (data: ProductPromoListProps) => {
    setSelectedProduct((prev) => prev.filter((item) => item.id !== data.id));
  };

  const handleResetSelection = () => {
    setSelectedProduct([]);
    setCountListing(0);
    handleResetSelectedCount();
  };

  return (
    <PromoContext.Provider
      value={{
        promoNav,
        selectedProduct,
        countListing,
        benefit,
        benefitQuantity,
        selectedCount,
        promotionSelected,
        promoPlan,
        selectedPromotion,
        sectionItems,
        handleSelectPromotion,
        handlePromoNavChange,
        handleRemoveSelectedProduct,
        handleBenefitChange,
        handleSelectedProduct,
        handleResetSelection,
        handleDecrementCount,
        handleIncrementCount,
        handleIncrementSelectedCount,
        handleDecrementSelectedCount,
        handleResetSelectedCount,
        handleAddPromotion,
        handleRemovePromotion,
        handlePromoPlan,
        handleSectionItems,
        handleRemoveSectionItem,
      }}
    >
      {children}
    </PromoContext.Provider>
  );
};

export const usePromoContext = () => {
  const context = React.useContext(PromoContext);
  if (!context)
    throw new Error("usePromoContext must be used within PromotionContext");
  return context;
};

export default PromotionContext;
