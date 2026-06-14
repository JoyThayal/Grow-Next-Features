"use client";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollZoom() {
  const container = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(imgRef.current, {
        width: "100vw",
        height: "100vh",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <main className="w-full min-h-screen bg-[#DBEEFA] space-y-10">
      <nav className="flex justify-between items-center h-20 px-10">
        <span>( MENU )</span>
        <span className="text-3xl font-bold">OurRevolution</span>
        <span>( WORK* )</span>
      </nav>

      <section className="w-full h-[70vh]">
        <div className="max-w-6xl mx-auto space-y-40">
          <div className="flex justify-between items-center">
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
          </div>

          <h1 className="text-center text-5xl tracking-tight">
            Till now, energy drinks have been like <br />
            a bad cologne, overwhelming and <br />
            hard to get away from. Time for a <br />
            change. Time to remove bad energy.
          </h1>

          <div className="flex justify-between items-center">
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
            <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
          </div>
        </div>
      </section>

      <section
        ref={container}
        className="w-full h-screen flex justify-center items-center relative overflow-hidden"
      >
        {/* এখানে absolute আর inset-0 এর জায়গায় ফিক্সড ক্লাসগুলো খেয়াল করো */}
        <div
          ref={imgRef}
          className="w-[25vw] h-[50vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 will-change-[width,height]"
        >
          <Image
            fill
            src={
              "https://cdn.sanity.io/images/60a2bs0u/production/766deb96495612e023c032afeee001063af9026e-2880x1760.png?w=1920&q=100&fit=clip&auto=format"
            }
            alt="Img"
            className="object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
