import React from "react";
import Uploadsection from "../../components/Uploadsection";
import Filepreview from "../../components/Filepreview";

export default function Upload() {
    return (
        <div className="p-5 px-8 md:px-28  max-h-[calc(100vh-3.5rem-15rem)] min-h-[calc(100vh-3.5rem)]">
            <div className=" top-1/6 translate-y-1/4">
                <h2 className="text-[20px] text-center m-5">
                    Say goodbye to attachments !
                </h2>
                <div className="items-center mb-3">
                    <h1 className="mr-3 text-5xl text-center font-semibold">Upload your files</h1>
                </div>
                <p className="mt-1 text-md text-slate-600 text-center sm:block hidden">
                    And share you documents accross the globe with download and access control !
                </p>
                <div className="mt-6">
                    <Uploadsection />
                    <Filepreview />
                </div>

            </div>

        </div>
        // <div className="">
        //     <div>Upload</div>
        //     <Uploadsection />

        // </div>

        // <div className="w-full min-h-full  bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        //     <div className="absolute mx-auto my-auto -translate-x-1/2 -translate-y-1/2 ">
        //         <div className="flex flex-col items-center text-center">
        //             <div className="flex items-center">
        //                 <h1 className="mr-3 text-5xl font-semibold">Chat with your PDF</h1>

        //             </div>

        //             <p className="max-w-xl mt-1 text-md text-slate-600">
        //                 Join millions of students, researchers and professionals to
        //                 instantly answer questions and understand research with AI.
        //             </p>

        //             <div className="w-full mt-4">
        //                 <Uploadsection />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}