import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (


    <div className="w-full min-h-[calc(100vh-3.5rem)] flex justify-center">
      <div className="flex items-center justify-center py-12 w-1/2">
        <div className="mx-auto grid w-[350px] gap-6">
          <SignUp />
        </div>
      </div>
      <div className="flex items-center justify-center py-12 w-1/2 ">
        <Image
          src="/fileupload.png"
          alt="Image"
          width={500}
          height={500}
          quality={100}
          className="h-1/2 w-1/2 object-cover dark:brightness-[0.2] dark:grayscale hidden sm:block"
        />
      </div>
    </div>
  );
}
