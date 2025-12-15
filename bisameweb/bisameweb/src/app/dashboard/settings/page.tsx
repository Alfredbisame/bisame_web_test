import AccountSettings from "@/app/components/AccountSettings/AccountSettings";
import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";


const SettingsPage = () => {
    return <>
    <div className="flex gap-6 xl:px-52 h-full">
        <DashboardSideBar />
        <div className="flex-1">
        <AccountSettings />
        </div>
    </div>
    </>
}

export default SettingsPage;