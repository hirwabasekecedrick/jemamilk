"use client";

import { ChevronsRight } from "lucide-react";
import { easeInOut, motion } from "motion/react";
import { Button } from "../ui/button";
import { Item } from "../ui/item";
import { useEffect, useState } from "react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  url: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => (
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
    className="flex flex-col items-center justify-center p-4 border-2 border-red-500 rounded-2xl h-full min-h-[250px]"
  >
    <div className="w-full flex justify-between gap-4 items-start">
      <p className="font-semibold">{feature.title}</p>
      <ChevronsRight className="text-red-500 flex-shrink-0" />
    </div>
    <hr className="w-full border-red-100/50 my-3" />
    <div className="flex-1 w-full">
      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
      <Item />
    </div>
    <hr className="w-full my-3" />
    <a href={feature.url} className="w-full">
      <Button className="bg-red-500 w-full">Continue</Button>
    </a>
  </motion.div>
);

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/system", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          setFeatures(data.data);
        } else {
          setFeatures([]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch features";
        console.error("Failed to fetch features:", err);
        setError(errorMessage);
        // Fallback to empty state - database features will be shown once added
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="h-[250px] bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="text-center mb-4 text-orange-500 text-sm">
          {error} - Please add features to the database
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {features.length > 0 ? (
          features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            <p>No features available yet</p>
            <p className="text-sm text-gray-400 mt-2">Features will appear here once added to the database</p>
          </div>
        )}
      </div>
    </section>
  );
}
