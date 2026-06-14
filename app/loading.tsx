"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      // ১. পার্সেন্টেজ কাউন্টার অ্যানিমেশন (0 থেকে 100)
      gsap.to(counter, {
        value: 100,
        duration: 2.5, // লোডার কতক্ষণ চলবে (সেকেন্ডে)
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counter.value) + "%";
          }
        },
        onComplete: () => {
          // ২. ১০০% হয়ে গেলে পুরো লোডার স্ক্রিনটা ওপরের দিকে স্লাইড আপ হয়ে যাবে
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              onComplete(); // মেইন পেজকে সিগন্যাল দেবে যে লোডিং শেষ!
            },
          });
        },
      });

      // ৩. ব্যাকগ্রাউন্ডে একটা হালকা প্রোগ্রেস বার অ্যানিমেশন (ঐচ্ছিক, দেখতে ভালো লাগে)
      gsap.to(progressBgRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 flex flex-col justify-between bg-[#1c1c1c] p-10 text-[#eae9e4] select-none pointer-events-auto"
    >
      {/* টপ সেকশন: কোম্পানির নাম বা ব্র্যান্ডিং */}
      <div className="flex justify-between items-center overflow-hidden">
        <span className="text-sm font-mono tracking-widest uppercase opacity-70">
          Grow Tech © 2026
        </span>
        <span className="text-sm font-mono tracking-widest uppercase opacity-70">
          Loading Experience
        </span>
      </div>

      {/* মিডল সেকশন: বড় কাউন্টার নম্বর */}
      <div className="my-auto overflow-hidden">
        <h1
          ref={counterRef}
          className="text-[12vw] font-light leading-none tracking-tighter"
        >
          0%
        </h1>
      </div>

      {/* বটম সেকশন: প্রোগ্রেস বার লাইনিং */}
      <div className="w-full h-0.5 bg-white/10 relative overflow-hidden">
        <div
          ref={progressBgRef}
          className="absolute top-0 left-0 h-full w-0 bg-[#eae9e4]"
        />
      </div>
    </div>
  );
}
