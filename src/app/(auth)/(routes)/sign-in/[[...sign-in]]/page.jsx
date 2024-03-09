import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <SignIn />
      </div>
    </section>
  );
}
