import AffiliateManager from "../../components/Affiliate/AffiliateManager";
import DashboardSideBar from "../../components/DashboardSideBar/DashboardSideBar";

const AffiliatePage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 xl:px-52 gap-2 relative md:my-5">
        <DashboardSideBar />
        <div className="flex-1 md:w-full my-2 mr-2 md:my-0 md:mr-0">
          <AffiliateManager />
        </div>
      </div>
    </>
  );
};

export default AffiliatePage;
