import React from "react";
import SideNave from "../components/SideNave";
import TopHeader from "../components/TopHeader";


function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <div>
        //     <div className="flex-col  inset-y-0 z-50 ">
        //         <SideNave />    
        //     </div>
        //     <div className="">
        //         {/* <TopHeader /> */}
        //         {children}
        //     </div>

        // </div>
        <main className="container mx-auto min-h-full">
        <div className="flex gap-8">
          <SideNave />
  
          <div className="w-full">{children}</div>
        </div>
      </main>
    )
}

export default layout;