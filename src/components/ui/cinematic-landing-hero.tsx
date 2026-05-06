"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import { Home, Calendar, Clock, Bell, User, RefreshCw, AlertCircle } from "lucide-react"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .film-grain { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay; background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>'); }
  .bg-grid-theme { background-size: 60px 60px; background-image: linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px); mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%); -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%); }
  .text-3d-matte { color: var(--color-foreground); text-shadow: 0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent); }
  .text-silver-matte { background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0); filter: drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent)); }
  .text-card-silver-matte { background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transform: translateZ(0); filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6)); }
  .premium-depth-card { background: linear-gradient(145deg, #0f172a 0%, #020617 100%); box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9), 0 20px 40px -20px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.8); border: 1px solid rgba(255, 255, 255, 0.04); position: relative; }
  .card-sheen { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50; background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%); mix-blend-mode: screen; transition: opacity 0.3s ease; }
  .iphone-bezel { background-color: #111; box-shadow: inset 0 0 0 2px #52525B, inset 0 0 0 7px #000, 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7); transform-style: preserve-3d; }
  .hardware-btn { background: linear-gradient(90deg, #404040 0%, #171717 100%); box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8); border-left: 1px solid rgba(255,255,255,0.05); }
  .screen-glare { background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%); z-index: 9999; pointer-events: none; }
  .btn-modern-light { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%); color: #0F172A; box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06); }
  .btn-modern-light:hover { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06); }
  .no-border-shadow { box-shadow: 0 8px 30px -4px rgba(0, 0, 0, 0.05); }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "ExamMate",
  tagline1 = "Ujian Modern",
  tagline2 = "Anti Cheating",
  cardHeading = "Siap untuk ujian?",
  cardDescription = <><span className="text-white font-semibold">Platform Ujian</span> kami memberikan antarmuka yang bersih, cepat, dan responsif untuk memastikan fokus penuh saat mengerjakan soal ujian.</>,
  ctaHeading = "Mulai Ujian Anda",
  ctaDescription = "Akses portal ujian CBT sekarang juga dan kerjakan soal dengan tenang dan jujur.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, { rotationY: xVal * 12, rotationX: -yVal * 12, ease: "power3.out", duration: 1.2 });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  },[]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl.to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
             .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=5000", pin: true, scrub: 1, anticipatePin: 1 }});
      scrollTl.to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper", { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 }, { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 }).set(".cta-wrapper", { autoAlpha: 1 }).to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".card-left-text", ".card-right-text"], { scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05 })
        .to(".main-card", { width: isMobile ? "92vw" : "85vw", height: isMobile ? "92vh" : "85vh", borderRadius: isMobile ? "32px" : "40px", ease: "expo.inOut", duration: 1.8 }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  },[]); 

  return (
    <div ref={containerRef} className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-slate-900 text-slate-100 font-sans antialiased", className)} style={{ perspective: "1500px" }} {...props}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">{tagline1}</h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">{tagline2}</h1>
      </div>

      {/* BACKGROUND LAYER 2: CTA Action to Ujian App */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">{ctaHeading}</h2>
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">{ctaDescription}</p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="https://ujian.smkmussa.id/" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group font-bold text-lg">
            Buka Aplikasi Ujian &rarr;
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div ref={mainCardRef} className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]">
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">{brandName}</h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-[0.85] lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div ref={mockupRef} className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d bg-[#f8fafc]">
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Screen Container (CBT Ujian UI) */}
                  <div className="absolute inset-[7px] bg-slate-50 text-slate-800 rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] z-10 relative flex flex-col font-sans">
                    <div className="absolute inset-0 screen-glare" aria-hidden="true" />
                    
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-[100]"></div>

                    {/* App Content */}
                    <div className="flex-1 overflow-y-auto px-4 pt-14 pb-20 relative z-20">
                      {/* Top Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-xs text-slate-500 font-medium tracking-wide">Selamat Datang,</p>
                          <h2 className="text-2xl font-bold font-serif text-slate-900 mt-0.5">Abid <span className="inline-block hover:animate-wiggle">👋</span></h2>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100/50">
                          <User className="h-3 w-3 text-amber-600" />
                          <span className="text-[10px] font-bold text-amber-600 tracking-wider">HADIR</span>
                        </div>
                      </div>

                      {/* Main Card */}
                      <div className="bg-white rounded-2xl p-5 mb-5 no-border-shadow flex flex-col items-center relative overflow-hidden">
                        {/* Decorative background shape */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full mix-blend-multiply opacity-50"></div>
                        
                        <div className="w-full relative z-10">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-2">TOKEN UJIAN</label>
                          <input 
                            type="text" 
                            disabled
                            placeholder="MTK-7X12"
                            className="w-full bg-slate-50 text-center text-xl font-bold tracking-[0.2em] text-slate-800 py-4 rounded-xl mb-4 border-none focus:ring-0 placeholder:text-slate-300"
                          />
                          <button className="w-full bg-blue-400 hover:bg-blue-500 transition-colors text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 no-border-shadow">
                            MULAI UJIAN <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                          </button>
                        </div>

                        {/* Warning Box */}
                        <div className="mt-4 w-full bg-amber-50 rounded-xl p-3 flex items-start gap-2 border border-amber-100/30">
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] leading-relaxed text-amber-700/80 font-medium">
                            Status Anda masih <strong className="text-amber-600">HADIR</strong>.Anda Telah Hadir.
                          </p>
                        </div>
                      </div>

                      {/* Schedule Section */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <h3 className="text-xs font-bold text-slate-700">Jadwal Hari Ini</h3>
                        </div>
                        <button className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors">
                          <RefreshCw className="h-3 w-3" />
                          Refresh
                        </button>
                      </div>

                      <div className="py-8 flex flex-col items-center justify-center">
                        <p className="text-xs font-medium text-slate-400">Tidak ada ujian aktif.</p>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white border-t border-slate-100/50 flex items-center justify-between px-6 pb-2 z-30">
                      <div className="flex flex-col items-center gap-1 text-blue-500">
                        <div className="p-1.5 bg-blue-50 rounded-xl">
                          <Home className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-bold">Home</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                        <div className="p-1.5">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-medium">Jadwal</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                        <div className="p-1.5">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-medium">Riwayat</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors relative">
                        <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <div className="p-1.5">
                          <Bell className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-medium">Info</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                        <div className="p-1.5">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-medium">Akun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">{cardHeading}</h3>
              <p className="hidden md:block text-slate-300 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">{cardDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
