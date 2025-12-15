import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import PromotionContext from "@/app/components/Promotion/context/PromotionContext";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Bisame | Promotion Plans",
};

const PromotionLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-row md:gap-8 xl:py-5 xl:px-24 2xl:px-52 gap-2">
      <DashboardSideBar />
      <div className="flex-grow w-[87%] md:w-full">
        <PromotionContext>{children}</PromotionContext>
      </div>
    </div>
  );
};

export default PromotionLayout;
