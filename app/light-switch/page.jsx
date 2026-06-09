"use client";

import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useRef, useEffect } from "react";

gsap.registerPlugin(Draggable);

export default function LightSwitch() {
  const boxRef = useRef(null);
  const golRef = useRef(null);
  const switchRef = useRef(null);
  const lightRef = useRef(null);
  const darkRef = useRef(null);

  useEffect(() => {
    let isSoundPlayed = false;
    const soundRef = new Audio("/switch.mp3");
    const instance = Draggable.create(golRef.current, {
      bounds: boxRef.current,
      edgeResistance: 0.99,
      type: "x",
      onDragEnd() {
        const maxDistance =
          boxRef.current.offsetWidth - golRef.current.offsetWidth;
        const midpoint = maxDistance / 2;

        if (this.x >= midpoint) {
          gsap.to(golRef.current, {
            x: maxDistance,
            duration: 0.1,
            ease: "power2.out",
          });

          gsap.to(lightRef.current, {
            opacity: 1,
            duration: 0.3,
          });
          gsap.to(darkRef.current, {
            opacity: 0,
            duration: 0.3,
          });
        } else {
          gsap.to(golRef.current, {
            x: 0,
            duration: 0.1,
            ease: "power2.out",
          });

          gsap.to(lightRef.current, {
            opacity: 0,
            duration: 0.3,
          });
          gsap.to(darkRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        }
      },
      onDrag() {
        if (this.hitTest(switchRef.current, "50%")) {
          gsap.to(lightRef.current, {
            opacity: 1,
            duration: 0.3,
            overwrite: "auto",
          });
          gsap.to(darkRef.current, {
            opacity: 0,
            duration: 0.3,
            overwrite: "auto",
          });
          if (isSoundPlayed === false) {
            soundRef.play();
            isSoundPlayed = true;
          }
        } else {
          gsap.to(lightRef.current, {
            opacity: 0,
            duration: 0.3,
            overwrite: "auto",
          });
          gsap.to(darkRef.current, {
            opacity: 1,
            duration: 0.3,
            overwrite: "auto",
          });
          isSoundPlayed = false;
        }
      },
    });
    return () => instance[0].kill();
  }, []);

  return (
    <main className="w-full h-screen relative bg-black overflow-hidden">
      <video
        ref={darkRef}
        src="/seacat-video.webm"
        className="absolute top-0 left-0 h-full max-w-none object-cover"
        style={{ width: "200%", objectPosition: "left center" }}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      <video
        ref={lightRef}
        src="/seacat-video.webm"
        className="absolute top-0 right-0 h-full max-w-none object-cover"
        style={{
          width: "200%",
          objectPosition: "right center",
          opacity: 0,
        }}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      <div
        ref={boxRef}
        className="absolute bottom-1/5 inset-x-0 mx-auto w-100 h-20 bg-transparent"
      >
        <div
          ref={golRef}
          className="absolute bg-transparent h-full w-20 rounded-full flex items-center justify-center"
        >
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            viewBox="0 0 100 100"
            style={{ animationDuration: "5s" }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            viewBox="0 0 100 100"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          >
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
          </svg>
          <span className="text-white text-xl font-bold select-none z-10">
            ⚡
          </span>
        </div>

        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-50 h-10 flex flex-col items-center justify-center">
          <h1 className="uppercase text-sm text-white/30">Turn on the lights</h1>
          <div className="w-50 h-0.5 bg-white/30"></div>
        </div>
        <div
          ref={switchRef}
          className="absolute bg-yellow-500/15 h-full w-20 rounded-full right-0 border-2 border-amber-600"
        ></div>
      </div>
    </main>
  );
}
