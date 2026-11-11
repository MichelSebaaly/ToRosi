"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, MapPin, Calendar, HandHeart, Star } from "lucide-react";
import Image from "next/image";

// --- FLOATING HEARTS BACKGROUND COMPONENT ---
const FloatingHearts = () => {
  const hearts = [
    { id: 1, left: "10%", delay: 0, duration: 15, size: 24 },
    { id: 2, left: "25%", delay: 4, duration: 18, size: 18 },
    { id: 3, left: "40%", delay: 2, duration: 20, size: 32 },
    { id: 4, left: "60%", delay: 8, duration: 16, size: 20 },
    { id: 5, left: "80%", delay: 1, duration: 19, size: 28 },
    { id: 6, left: "90%", delay: 6, duration: 17, size: 22 },
    { id: 7, left: "15%", delay: 12, duration: 14, size: 26 },
    { id: 8, left: "35%", delay: 9, duration: 22, size: 16 },
    { id: 9, left: "55%", delay: 3, duration: 18, size: 30 },
    { id: 10, left: "75%", delay: 11, duration: 15, size: 24 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%] text-rose-300/30"
          style={{ left: heart.left }}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: "-120vh",
            opacity: [0, 1, 1, 0],
            x: [0, -20, 20, -15, 10, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

// --- TIME TOGETHER TIMER COMPONENT ---
const TimeTogether = () => {
  const startDate = new Date("2026-05-25").getTime();

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      setTime({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-rose-100/50">
      <p className="text-slate-400 font-medium tracking-widest uppercase text-xs mb-6">
        Time Since You Changed My Life
      </p>
      <div className="flex justify-center gap-4 md:gap-8 text-rose-400 font-playfair">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">{time.days}</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
            Days
          </span>
        </div>
        <span className="text-2xl md:text-3xl font-light opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {time.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
            Hrs
          </span>
        </div>
        <span className="text-2xl md:text-3xl font-light opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {time.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
            Min
          </span>
        </div>
        <span className="text-2xl md:text-3xl font-light opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl">
            {time.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
            Sec
          </span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN HOME PAGE COMPONENT ---
export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen overflow-hidden relative">
      <FloatingHearts />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center bg-white/40 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm shadow-sm border border-white/50 max-w-2xl w-full mx-4"
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 p-2 rounded-full bg-white/60 backdrop-blur-md shadow-xl border border-white/80">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">
              <Image
                src="/us.jpg"
                alt="Michel and Rosalia"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <p className="tracking-widest uppercase text-xs md:text-sm text-rose-400 font-semibold mb-6">
            To my wife, my everything, my always.
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl text-slate-900 mb-6">
            For Rosalia
          </h1>
          <div className="w-16 h-[1px] bg-rose-300 mx-auto mt-6"></div>
        </motion.div>
      </section>

      {/* 2. THE JOURNEY TIMELINE */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-slate-900 mb-4">
            Our Journey
          </h2>
          <p className="text-slate-500 font-light max-w-lg mx-auto">
            From our time around Abrams Hall to everywhere we go next, every
            moment with you is my favorite.
          </p>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
          >
            <div className="hidden md:flex flex-col items-center mt-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 shadow-sm border border-rose-100">
                <Calendar size={20} />
              </div>
              <div className="w-[1px] h-32 bg-rose-100 mt-4"></div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-rose-50 flex-1">
              <span className="text-rose-400 text-sm font-semibold tracking-wide">
                The Anchor of My Life
              </span>
              <h3 className="font-playfair text-2xl text-slate-800 mt-2 mb-3">
                When it all started
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                From the very beginning, you brought a light into my world that
                I never want to be without. You aren't just my wife; you are the
                absolute center of my universe. Every day with you is a reminder
                of how lucky I am. I mean every word said here bhebik ktir ya
                rouhe ente I can't live without you.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
          >
            <div className="hidden md:flex flex-col items-center mt-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 shadow-sm border border-rose-100">
                <MapPin size={20} />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-rose-50 flex-1">
              <span className="text-rose-400 text-sm font-semibold tracking-wide">
                Every Step By Your Side
              </span>
              <h3 className="font-playfair text-2xl text-slate-800 mt-2 mb-3">
                Exploring together
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Whether we are traveling the world or just sharing a quiet
                moment together, the only thing that matters is that I am next
                to you. No matter where we go, home is simply wherever you are.
                aanjad ma bi hemne ella ene koun hadik w bas wjoudik houwe l
                hayet.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
          >
            <div className="hidden md:flex flex-col items-center mt-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 shadow-sm border border-rose-100">
                <Star size={20} />
              </div>
              <div className="w-[1px] h-32 bg-rose-100 mt-4"></div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-rose-50 flex-1">
              <span className="text-rose-400 text-sm font-semibold tracking-wide">
                Your Beautiful Drive
              </span>
              <h3 className="font-playfair text-2xl text-slate-800 mt-2 mb-3">
                In Awe of You
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                I watch how hard you work and the quiet strength you pour into
                everything you do. Your dedication inspires me every single day.
                I love you not just for the warmth you bring to my life, but for
                the incredible woman you are to the world. Btaarfe lama shoufik
                bteshteghle hl2d bmout betala3 b2oul eno ade ente awiye btaatine
                ouwe ele men wara hal shi bmoutttttttttt fike ya marte.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12"
          >
            <div className="hidden md:flex flex-col items-center mt-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 shadow-sm border border-rose-100">
                <HandHeart size={20} />
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-rose-50 flex-1">
              <span className="text-rose-400 text-sm font-semibold tracking-wide">
                My Promise
              </span>
              <h3 className="font-playfair text-2xl text-slate-800 mt-2 mb-3">
                Always By Your Side
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                No matter what life brings, I will always be here to help you,
                support you, and lift you up. Through every high and every low,
                you will never have to face anything alone. I am by your side,
                always and forever. law shou ma sar ya albe waad ana hadik bade
                tkhaliya bi belik ma bet ghibe aan tefkire.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE LETTER */}
      <section className="py-32 px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-sm border border-rose-50 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-transparent opacity-50 z-0"></div>

          <div className="relative z-10">
            <Heart
              className="mx-auto text-rose-400 mb-8 fill-rose-100"
              size={32}
            />
            <h2 className="font-playfair text-3xl md:text-4xl text-slate-800 mb-8">
              A Note for You
            </h2>
            <div className="space-y-6 text-slate-600 font-light leading-relaxed text-lg md:text-xl font-playfair italic">
              <p>
                Marte, I built this space just to remind you of a simple truth:
                I cannot imagine a single day of this life without you. You are
                my greatest blessing, my closest confidante, and the only one I
                will ever need.
              </p>
              <p>
                Thank you for being my world, and for loving me exactly as I am.
                I love you more than words could ever fully say. ente oomre w
                hayete wel ouwe taba3e ghyebik bye2telne mafi kelme aw shi bi
                3aber 3an hobbe elik rah a3mol kel shi be2dar aamlo la khalike
                maae, wafe, mhazab, behtermik, b2adrik, bse3dik, bet3ab
                kermelik, ente awlawiyte aatoul.
              </p>
            </div>
            <p className="mt-12 text-slate-400 font-medium tracking-widest uppercase text-sm">
              Love, Michel Jawzik.
            </p>
            <TimeTogether />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
