
"use client"
import { ChevronsRight } from "lucide-react";
import {easeInOut, motion} from "motion/react"
import { Item } from "../ui/item";
import { Button } from "../ui/button";
import { Feature } from "./features";


export const FeatureCard = ({feature}: {feature: Feature}) => (
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
      <p className="font-semibold">{feature.title}</p>
      <ChevronsRight className="text-red-500 shrink-0" />
    </div>
    <hr className="w-full border-red-100/50 my-3" />
    <div className="flex-1 w-full">
      <Item>

      </Item>
    </div>
    <hr className="w-full my-3" />
    <a href={`${feature.url}`} className="w-full"><Button className="bg-red-500 w-full">Continue</Button></a>
  </motion.div>
);