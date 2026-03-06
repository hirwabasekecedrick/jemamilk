"use client";
import { ChevronsRight } from "lucide-react";
import { easeInOut, motion } from "motion/react";
import { Button } from "../ui/button";
import { Item } from "../ui/item";

const FeatureCard = () => (
  <motion.div
    initial={{
      opacity: 0,
      top: 100,
    }}
    animate={{
      top: 0,
      opacity: 1,
    }}
    transition={{
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 200,
      ease: easeInOut,
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center justify-center p-4 border-2 border-red-500 rounded-2xl h-full min-h-62.5"
  >
    <div className="w-full flex justify-between gap-4 items-start">
      <p className="font-semibold">Stock</p>
      <ChevronsRight className="text-red-500 shrink-0" />
    </div>
    <hr className="w-full border-red-100/50 my-3" />
    <div className="flex-1 w-full">
      <Item />
    </div>
    <hr className="w-full my-3" />
    <Button className="bg-red-500 w-full">Continue</Button>
  </motion.div>
);

export default function Features() {
  const features = Array(4).fill(null);

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {features.map((_, index) => (
          <FeatureCard key={index} />
        ))}
      </div>
    </section>
  );
}
