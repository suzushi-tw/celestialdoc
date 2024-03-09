import React from "react";
import SideNave from "../components/SideNave";
import TopHeader from "../components/TopHeader";


function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="max-h-[calc(100vh-3.5rem-10rem)] md:w-64 flex-col  inset-y-0 z-50 ">
                <SideNave />
            </div>
            <div className="md:ml-64">
                <TopHeader />
                {children}
            </div>

        </div>
    )
}

export default layout;