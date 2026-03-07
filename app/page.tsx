import Features from "@/components/reusables/features";
import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center min-h-screen w-full flex-col gap-0 sm:gap-8 py-4 sm:py-12">
        <div className="flex justify-center items-center w-full px-4 ">
          <Image
            className="w-full max-w-md h-auto"
            width={500}
            height={60}
            loading="eager"
            alt="JEMAMILK"
            src={"/jemamilkminiLogo.jpg"}
          />
        </div>
        <Features />
      </section>
    </main>
  );
}
