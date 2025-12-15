import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import PromotionPlan from "@/app/components/PromotionPlan/PromotionPlan";

const purchasesPage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 xl:px-52 gap-2">
        <DashboardSideBar />
        <div className="flex- w-[87%] md:w-full">
          <PromotionPlan />
        </div>
      </div>
    </>
  );
};

export default purchasesPage;
