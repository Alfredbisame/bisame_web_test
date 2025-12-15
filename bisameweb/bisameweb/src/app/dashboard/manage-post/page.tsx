import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import ProductTabs from "@/app/components/ManagePost/ProductTabs";

const PostPage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 xl:px-52 gap-2 relative md:my-5">
        <DashboardSideBar />
        <div className="md:w-full mr-3">
          <ProductTabs />
        </div>
      </div>
    </>
  );
};

export default PostPage;
