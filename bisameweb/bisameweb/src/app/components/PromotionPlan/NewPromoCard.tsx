"use client";
import React from "react";
import { motion } from "framer-motion";
import PromoDate from "./PromoDate";

interface PromotionCardProps {
  promoName: string;
  promoStatus: "Active" | "Inactive";
  promoSummary: string;
  price: number;
  primaryColor: string;
}

const NewPromoCard: React.FC<PromotionCardProps> = ({
  price,
  promoStatus,
  promoName,
  promoSummary,
  primaryColor,
}) => {
  return (
    <motion.div
      className={`rounded-2xl shadow-md border border-gray-100 p-2 md:p-4 space-y-4 cursor-pointer my-auto`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`type font-semibold border border-${primaryColor}-200 md:py-1 md:px-4 bg-${primaryColor}-100 rounded-md text-center md:rounded-lg text-${primaryColor}-400 text-xs md:text-sm w-1/3 md:w-auto`}
        >
          {promoName}
        </span>
        <p className="text-gray-400 text-xs md:text-sm max-w-36 xl:max-w-80">
          {promoSummary}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`type font-semibold ${
            promoStatus == "Active"
              ? "bg-green-100 text-green-500"
              : "bg-gray-200 text-gray-400"
          } md:py- md:px-4  rounded-full text-xs md:text-sm tracking-tighter px-2 py-1 flex items-center gap-1 md:gap-2 w-auto`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              promoStatus == "Active" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
          <span>{promoStatus}</span>
        </div>
        <p className={`font-semibold text-blue-500 text-sm md:text-base`}>
          GHS {price}
        </p>
      </div>
      <div className={`bg-blue-50 p-3 flex justify-between rounded-xl`}>
        <PromoDate date="25-05-2025" dateStatus="Start" />
        <span>-</span>
        <PromoDate date="31-12-2025" dateStatus="End" />
      </div>
    </motion.div>
  );
};

export default NewPromoCard;
