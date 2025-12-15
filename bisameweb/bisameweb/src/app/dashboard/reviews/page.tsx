import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import ReviewsSection from "@/app/components/ReviewsSection/ReviewsSection"



const ReviewsPage = () => {
    return <>
    <div className="flex gap-6 xl:px-52 h-full">
        <DashboardSideBar />
        <div className="flex-1">
        <ReviewsSection />
        </div>
    </div>
    </>
}

export default ReviewsPage;