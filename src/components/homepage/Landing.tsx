"use client";
import { LineText } from "@/components/LineText";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const Landing = () => {
    return (
        <>
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
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center">
                    <h1 className="text-6xl">
                        Send <LineText>File</LineText> fast
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
                        {/* {siteConfig.description} */}
                        An open source Google drive / Docsend alternative to store your files and share with others !
                    </p>
                </section>
                <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="items-cneter justify-center"
                >
                    <Button
                        variant="default"
                        className="justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                        aria-label="Get Boilerplate"
                    >

                        Self host
                    </Button>
                </Link>
            </motion.div>

        </>
    );
};

export default Landing;