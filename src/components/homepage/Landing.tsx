"use client";
import { LineText } from "@/components/LineText";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const Landing = () => {
    return (
        <>
            {/* <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1],
                    scale: {
                        type: "tween", // tween spring
                        // damping: 10, // if spring
                        // stiffness: 50, // if spring
                        // restDelta: 0.001, // if spring
                    },
                }}
            >
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center">
                    <h1 className="text-6xl">
                        Send <LineText>File</LineText> fast
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
                        
                        An open source Google drive / Docsend alternative to store your files and share with others !
                    </p>
                </section>
               
            </motion.div> */}
            <div
                className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] z-[-1]"
            ></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1],
                    scale: {
                        type: "tween", // tween spring
                        // damping: 10, // if spring
                        // stiffness: 50, // if spring
                        // restDelta: 0.001, // if spring
                    },
                }}
            >
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-16 md:pt-24 text-center">
                    <h1 className="text-6xl">
                        Send <LineText>File</LineText> fast
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
                        An open source Google drive / Docsend alternative to store your files and share with others !
                    </p>
                </section>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-6 justify-center items-center">
                    {/* <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                        Join now
                    </button> */}
    
                    <Link href={"https://github.com/suzushi-tw/celestialdoc"} className="w-40 inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        Self Host
                    </Link>
                    <Link href={"/sign-in"}>
                        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                            Signup
                        </button>
                    </Link>
                   

                </div>

            </motion.div>


        </>
    );
};

export default Landing;