import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex bg-indigo-50 min-h-screen ">
            <Sidebar />

            <div className="flex-1 h-screen overflow-y-auto">
                    <Outlet />
            </div>
        </div>
    );
}
