import Features from "@/components/reusables/features";
import Image from "next/image";

export default async function Page() {
  return (
    <div className="flex justify-between sm:justify-center items-center h-screen w-full flex-col gap-4">
      <div className="flex justify-center items-center w-full">
        <Image
          className="mt-10"
          width={500}
          height={60}
          alt="JEMAMILK"
          src={"/jemamilkminiLogo.jpg"}
        />
      </div>
      <Features />
    </div>
  );
}
