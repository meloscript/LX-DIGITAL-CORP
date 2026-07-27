"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  MapPin,
  Sparkles,
  Users,
  Bell,
  BarChart3,
  Zap,
} from "lucide-react";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import {
  heroEase,
  heroTiming,
  usePerformanceMode,
} from "@/hooks/use-performance-mode";
import { useCountUp } from "@/hooks/use-count-up";

const chartBars = [40, 55, 45, 70, 65, 85, 78, 95];

const notifications = [
  {
    text: "Nouveau lead qualifié",
    time: "2 min",
    iconBg: "bg-premium/10",
    iconColor: "text-premium",
  },
  {
    text: "Position Google #1",
    time: "5 min",
    iconBg: "bg-premium/10",
    iconColor: "text-premium",
  },
  {
    text: "Automatisation activée",
    time: "12 min",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

const BASE = heroTiming.dashboard + 0.08;

function cardReveal(delay: number, animate: boolean) {
  if (!animate) return {};
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4, ease: heroEase },
  };
}

function KpiValue({
  value,
  animate,
  delay,
}: {
  value: number;
  animate: boolean;
  delay: number;
}) {
  const count = useCountUp(value, { enabled: animate, delay: delay * 1000 });
  return <>+{count}%</>;
}

export function HeroDashboard() {
  const reduced = useReducedMotion();
  const { animateEntrance, effectsEnabled } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const animate = mounted && animateEntrance && !reduced;

  useEffect(() => setMounted(true), []);

  const kpis = [
    { label: "Visibilité", value: 284, icon: MapPin, color: "text-premium" },
    { label: "Leads", value: 156, icon: Users, color: "text-accent" },
    { label: "Conversion", value: 92, icon: TrendingUp, color: "text-premium" },
  ];

  return (
    <div className="relative">
      <LiquidGlass className="rounded-2xl shadow-2xl shadow-premium/10 dark:shadow-premium/5">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="bg-surface dark:bg-white/5 px-4 py-3 border-b border-slate-200/60 dark:border-white/10 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-amber-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-lg bg-white dark:bg-night/50 text-xs text-muted font-medium">
                LX Growth Platform
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Live
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  {...cardReveal(BASE + i * 0.06, animate)}
                  className="p-3 rounded-xl liquid-glass-subtle border border-slate-200/60 dark:border-white/10"
                >
                  <div className="flex items-center justify-between mb-1">
                    <kpi.icon className={`h-3.5 w-3.5 ${kpi.color}`} />
                    <span className={`text-sm font-bold ${kpi.color}`}>
                      <KpiValue
                        value={kpi.value}
                        animate={animate}
                        delay={BASE + i * 0.06}
                      />
                    </span>
                  </div>
                  <p className="text-[10px] text-muted uppercase tracking-wider">
                    {kpi.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-3">
              <motion.div
                {...cardReveal(BASE + 0.22, animate)}
                className="col-span-3 p-4 rounded-xl bg-surface dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-night dark:text-white">
                    Croissance
                  </p>
                  <BarChart3 className="h-3.5 w-3.5 text-muted" />
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {chartBars.map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-premium to-premium/40"
                      {...(animate
                        ? {
                            initial: { height: 0 },
                            animate: { height: `${height}%` },
                            transition: {
                              duration: 0.45,
                              delay: BASE + 0.28 + i * 0.035,
                              ease: heroEase,
                            },
                          }
                        : { style: { height: `${height}%` } })}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...cardReveal(BASE + 0.26, animate)}
                className="col-span-2 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-premium/10 border border-accent/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-7 w-7 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-night dark:text-white">
                      IA Active
                    </p>
                    <p className="text-[10px] text-muted">12 tâches automatisées</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {["CRM sync", "Email auto", "Analytics"].map((task) => (
                    <div key={task} className="flex items-center gap-2">
                      <Zap className="h-2.5 w-2.5 text-accent" />
                      <span className="text-[10px] text-muted">{task}</span>
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-2">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.text}
                  {...cardReveal(BASE + 0.38 + i * 0.08, animate)}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white dark:bg-night/50 border border-slate-200/60 dark:border-white/10"
                >
                  <div
                    className={`h-8 w-8 rounded-lg ${notif.iconBg} flex items-center justify-center`}
                  >
                    <Bell className={`h-3.5 w-3.5 ${notif.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-night dark:text-white truncate">
                      {notif.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted">{notif.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </LiquidGlass>

      {effectsEnabled && (
        <>
          <div className="absolute -top-4 -right-4 hidden sm:block animate-float-gentle">
            <LiquidGlass className="rounded-xl shadow-lg px-4 py-3" interactive>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-premium/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-premium" />
                </div>
                <div>
                  <p className="text-sm font-bold text-night dark:text-white">#1 Google</p>
                  <p className="text-[10px] text-muted">Visibilité locale</p>
                </div>
              </div>
            </LiquidGlass>
          </div>

          <div className="absolute -bottom-4 -left-4 hidden sm:block animate-float-gentle-slow">
            <LiquidGlass className="rounded-xl shadow-lg px-4 py-3" interactive>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-night dark:text-white">IA</p>
                  <p className="text-[10px] text-muted">Automatisation 24/7</p>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </>
      )}
    </div>
  );
}
