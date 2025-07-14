'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import logo from '../../../../public/asset/images/ويمي تك.jpg';
export default function LogoImageAnimation() {
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    requestIdleCallback(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setTimeout(() => setShowLoader(false), 150);
          },
        });

        tl.fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.6,
            rotateY: 45,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
          }
        );

        tl.to(containerRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.3,
        });
      }, containerRef);

      return () => ctx.revert();
    });
  }, []);

  if (!showLoader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-l from-[#e7c8f9] to-[#a066e7] shadow-lg backdrop-blur-md border-b border-purple-100"
    >
      <Image
        ref={logoRef}
        src={logo}
        alt="ويمى تك"
        width={256}
        height={256}
        className="rounded-full"
        unoptimized
      />
    </div>
  );
}
