"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const mainSec = useRef({ current: null });
  const leftCol = useRef({ current: null });
  const rightCol = useRef({ current: null });

  useEffect(() => {
    // সেফটি চেক: যদি কোনো একটা রেফ-ও null থাকে, তবে অ্যানিমেশন রান করবে না
    if (!mainSec.current || !leftCol.current || !rightCol.current) return;

    // GSAP Context তৈরি করা হলো যাতে ক্লিনআপ করা সহজ হয়
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mainSec.current,
        start: "top top",
        end: () => `+=${leftCol.current?.scrollHeight || 0}`,
        pin: true,
      });

      gsap.to(leftCol.current, {
        y: -((leftCol.current?.scrollHeight || 0) - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: mainSec.current,
          start: "top top",
          end: () => `+=${leftCol.current?.scrollHeight || 0}`,
          scrub: true,
        },
      });

      gsap.to(rightCol.current, {
        y: (rightCol.current?.scrollHeight || 0) - window.innerHeight,
        ease: "none",
        scrollTrigger: {
          trigger: mainSec.current,
          start: "top top",
          end: () => `+=${rightCol.current?.scrollHeight || 0}`,
          scrub: true,
        },
      });
    });

    // ক্লিনআপ ফাংশন: কম্পোনেন্ট আনমাউন্ট হলে স্ক্রলট্রিগার রিলিজ করে দেবে
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative">
      <div className="h-screen w-full bg-[#1c1c1c] flex justify-center items-center">
        <span className="text-[#eae9e4] text-5xl">
          Scroll Down and See Magic 👇
        </span>
      </div>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.032]"
          style={{
            backgroundImage:
              'url("https://www.cinecasero.uy/img/noise-full.png")',
          }}
        />
      </div>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.1]"
          style={{
            backgroundImage: 'url("https://www.cinecasero.uy/img/old.webp")',
          }}
        />
      </div>

      <section ref={mainSec} className="relative h-full">
        <div className="h-screen w-full bg-[#1c1c1c] flex gap-10 px-30">
          <div className="text-[#eae9e4] w-[53%] flex flex-col gap-10 justify-center">
            <h1 className="text-9xl">
              Home <br /> Movie Day
            </h1>
            <p>
              <span className="font-bold">Family Movie Day</span> is an open and
              free event celebrated internationally and organized by volunteers
              who seek to draw attention to the importance of preserving
              amateur, everyday and home movies for the value they have for the
              collective memory and cultural heritage of a country.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center uppercase text-md transition-all duration-[0.25s] ease-in-out hover:gap-5">
                <span>Tips for preserving your family archive</span>
                <MoveRight />
              </div>
              <div className="flex gap-2 items-center uppercase text-md transition-all duration-[0.25s] ease-in-out hover:gap-5">
                <span>Container design for your films</span>
                <MoveRight />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="uppercase text-[14px]">
                Evento impulsado por
              </span>
              <Image
                src={"https://www.cinecasero.uy/img/chm-logo.png"}
                width={200}
                height={100}
                alt="Logo"
              />
            </div>
          </div>

          <div className="w-[47%] relative h-full flex gap-5 overflow-hidden">
            <div ref={leftCol} className="w-full">
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-1.jpg"}
                  fill
                  alt="img1"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-2.jpg"}
                  fill
                  alt="img2"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-3.jpg"}
                  fill
                  alt="img3"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-4.jpg"}
                  fill
                  alt="img4"
                  className="object-cover"
                />
              </div>
            </div>
            <div ref={rightCol} className="w-full self-end">
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-6.jpg"}
                  fill
                  alt="img4"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-7.jpg"}
                  fill
                  alt="img4"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-8.jpg"}
                  fill
                  alt="img4"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-blue-950 h-100 rounded-2xl mb-7 overflow-hidden">
                <Image
                  src={"https://www.cinecasero.uy/img/hmd/hmd-9.jpg"}
                  fill
                  alt="img4"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen w-full bg-[#1d1d1d]"></div>
    </main>
  );
}
