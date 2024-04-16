import Image from "next/image";
import Header from "../components/Header";
import Featuresection from "@/components/homepage/Featuresection";
import Landing from "@/components/homepage/Landing";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-between p-6 sm:p-24 ">

      <MaxWidthWrapper>
        <Landing />

      </MaxWidthWrapper>
     
    </main>
  );
}
