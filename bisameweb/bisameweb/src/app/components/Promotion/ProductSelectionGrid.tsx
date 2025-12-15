"use client";
import React, { useMemo } from "react";
import PromoListingCard from "./PromoListingCard";
import Button from "../ui/Button";
import { IoMdArrowRoundBack, IoMdEye } from "react-icons/io";
import { ProductPromoListProps } from "./constants"
import { ProfileListings } from "./hooks/useFetchListings";
import { CountType } from "./PromoListingPage";
import { usePromoContext } from "./context/PromotionContext";

interface ProductSelectionGridProps {
  handleChangeSelection: () => void;
  handleSelectionCount: (type: CountType) => void;
  countSelected: number;
  selectedProduct: ProductPromoListProps[];
  data: ProfileListings[] | undefined;
  numberOfAdsAllowed: number;
}

const ProductSelectionGrid: React.FC<ProductSelectionGridProps> = ({
  handleChangeSelection,
  countSelected,
  handleSelectionCount,
  selectedProduct,
  data,
  numberOfAdsAllowed,
}) => {
  const remainingAds = Math.max(numberOfAdsAllowed - countSelected, 0);
  console.log(countSelected);
  const remainingLabel = remainingAds > 1 ? "listings" : "listing";

  const { handlePromoNavChange } = usePromoContext();

  const promoCards = useMemo(() => {
    if (!data) return null;
    return data.map(
      ({ images, title, location, price, description, id }, index) => {
        const isDisabled = countSelected >= numberOfAdsAllowed;
        return (
          <PromoListingCard
            key={index}
            id={id}
            itemName={title}
            imageUrl={images[0].imageUrl}
            location={location}
            description={description}
            price={price}
            countSelected={countSelected}
            handleSelectionCount={handleSelectionCount}
            disabled={isDisabled}
          />
        );
      }
    );
  }, [data, countSelected, handleSelectionCount, numberOfAdsAllowed]);

  return (
    <>
      <div className="flex justify-between items-center mx-5">
        <button
          onClick={() => handlePromoNavChange("main")}
          className="flex items-center px-2 py-5 cursor-pointer text-orange-500 hover:text-orange-700"
        >
          <IoMdArrowRoundBack />
          <span>Promo Plans</span>
        </button>

        <span className="text-red-500 font-semibold text-sm">
          {remainingAds} {remainingLabel} remaining
        </span>
      </div>

      <div className="listing-grid p-2 md:p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {promoCards}
      </div>

      <div className="px-2 md:px-5 flex justify-end">
        <Button
          label={`View ${
            countSelected > 0 ? `(${countSelected}/${numberOfAdsAllowed})` : ""
          } Selections`}
          styles="countSelected bg-orange-500 text-sm md:text-base tracking-tighter hover:bg-orange-600 transition duration-300 text-white py-1 px-5 rounded-lg flex items-center justify-center gap-2"
          icon={<IoMdEye />}
          action={handleChangeSelection}
          isDisabled={selectedProduct.length === 0}
        />
      </div>
    </>
  );
};

export default ProductSelectionGrid;
