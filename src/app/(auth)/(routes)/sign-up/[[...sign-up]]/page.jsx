import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (


    <div className="flex h-screen justify-center items-center">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black mx-auto">
        <div className="max-w-md text-center">
          <Image src="/fileupload.png" alt="signup" width={500} height={500} quality={100} />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center mx-auto">
        <div className="max-w-md w-full p-6">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
