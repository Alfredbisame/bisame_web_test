import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import TradeAssuranceProducts from "@/app/components/DashboardTradeAssurance/TradeAssuranceProducts";

const TradeAssurancePage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 xl:px-52 gap-2">
        <DashboardSideBar />
        <div className="flex-1 w-4/5 md:w-full p-2">
          <TradeAssuranceProducts />
        </div>
      </div>
    </>
  );
};

export default TradeAssurancePage;
