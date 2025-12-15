import React from "react";
import PromotionHeader from "./PromotionHeader";
import NewPromoCard from "./NewPromoCard";

const PromotionPlan = () => {
  return (
    <div className="shadow-md h-full m-1 md:m-3 rounded-lg">
      {/* Header component of promotion section */}
      <PromotionHeader
        promoHeader="Promo Plans"
        optionalHeader="Status & Price"
      />
      <div className="promotion-card p-3 md:p-5 grid md:grid-cols-2 gap-5">
        <NewPromoCard
          price={150}
          promoStatus="Active"
          promoName="Akwaaba Promo"
          promoSummary="Perfect for new sellers to start their journey"
          primaryColor="blue"
        />
        <NewPromoCard
          price={80}
          promoStatus="Active"
          promoName="Sika Promo"
          promoSummary="Best value package for growing businesses"
          primaryColor="orange"
        />
        <NewPromoCard
          price={80}
          promoStatus="Inactive"
          promoName="Ohene Promo"
          promoSummary="Perfect for new sellers to start their journey"
          primaryColor="green"
        />
        <NewPromoCard
          price={100}
          promoStatus="Active"
          promoName="Kode3 Promo"
          promoSummary="Perfect for new sellers to start their journey"
          primaryColor="green"
        />
      </div>
    </div>
  );
};

export default PromotionPlan;
