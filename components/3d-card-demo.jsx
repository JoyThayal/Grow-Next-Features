"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { featuresData } from "@/data/FeaturesData";
import Image from "next/image";
import Link from "next/link";

export default function ThreeDCardDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-8xl mx-auto w-full">
      {featuresData.map((feature) => (
        <CardContainer key={feature.id} className="inter-var">
          <CardBody className="bg-[#131B2E] border-white/8 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 w-full h-auto rounded-xl p-6">
            <CardItem translateZ="50" className="text-xl font-bold text-white">
              {feature.title}
            </CardItem>

            <CardItem
              as="p"
              translateZ="60"
              className="text-slate-400 text-sm max-w-sm mt-2"
            >
              {feature.description}
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={feature.imageSrc}
                height={500}
                width={300}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={feature.title}
                priority
                placeholder="blur"
                blurDataURL={feature.imageSrc}
              />
            </CardItem>

            <Link
              href={feature.linkHref}
              className="flex justify-between items-center mt-10 w-full"
            >
              <CardItem
                translateZ={20}
                as="button"
                className="w-full px-4 py-2 rounded-sm bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white text-xs font-bold transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
              >
                View Feature
              </CardItem>
            </Link>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
