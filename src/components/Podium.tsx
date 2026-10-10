"use client";

import { TeamMetrics } from "@/types/campaign";
import { formatNumber } from "@/lib/utils";
import { Trophy, Medal, Award, Crown, Users } from "lucide-react";

interface PodiumProps {
  top3: TeamMetrics[];
}

export function Podium({ top3 }: PodiumProps) {
  if (!top3 || top3.length === 0) return null;

  const first = top3[0];
  const second = top3.length > 1 ? top3[1] : null;
  const third = top3.length > 2 ? top3[2] : null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Podio de Honor | Top 3 Equipos
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Los tres equipos con mayor puntaje e impacto acumulado en la campaña.
          </p>
        </div>
      </div>

      {/* Grid de Podio estilo Olímpico (2° a la izquierda, 1° al centro y más alto, 3° a la derecha) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end pt-8 sm:pt-12">
        {/* SEGUNDO LUGAR (PLATA 🥈) */}
        {second ? (
          <div className="order-2 md:order-1 flex flex-col items-center">
            {/* Tarjeta Flotante */}
            <div className="w-full glass-panel rounded-2xl p-5 border-zinc-400/30 bg-gradient-to-b from-zinc-400/10 via-zinc-900/90 to-zinc-950 text-center relative mb-3 hover:border-zinc-300 transition-all duration-300">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-300 flex items-center justify-center text-xl shadow-lg">
                🥈
              </div>

              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  2.º Lugar
                </span>
                <h3 className="text-lg font-bold text-white truncate mt-0.5" title={second.teamName}>
                  {second.teamName}
                </h3>

                <div className="text-2xl font-black text-zinc-200 mt-2">
                  {formatNumber(second.totalScore)} <span className="text-xs font-normal text-zinc-400">pts</span>
                </div>

                <div className="flex justify-center gap-3 text-xs text-zinc-400 mt-2 pt-2 border-t border-zinc-800">
                  <span><strong>{second.saved}</strong> salvos</span>
                  <span><strong>{second.baptisms}</strong> bautizos</span>
                  <span><strong>{second.guests}</strong> inv.</span>
                </div>

                {second.members.length > 0 && (
                  <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-center gap-1.5 bg-zinc-900/80 px-2 py-1 rounded-lg">
                    <Users className="w-3 h-3 text-zinc-500" />
                    <span className="truncate">{second.members.join(" & ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pedestal visual */}
            <div className="w-full h-24 hidden md:flex items-center justify-center rounded-t-xl bg-gradient-to-b from-zinc-700/40 to-zinc-900/60 border-t-2 border-zinc-400/40 font-black text-3xl text-zinc-400/40">
              2
            </div>
          </div>
        ) : (
          <div className="order-2 md:order-1" />
        )}

        {/* PRIMER LUGAR (ORO 🥇) - MÁS ALTO Y PROMINENTE */}
        {first && (
          <div className="order-1 md:order-2 flex flex-col items-center">
            {/* Tarjeta Flotante con Glow Dorado */}
            <div className="w-full glass-panel glow-gold rounded-3xl p-6 border-amber-400/50 bg-gradient-to-b from-amber-500/20 via-zinc-900/95 to-zinc-950 text-center relative mb-3 hover:border-amber-300 transition-all duration-300 scale-100 sm:scale-105 z-10">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/20">
                <Crown className="w-8 h-8 text-amber-400 fill-amber-400/40 animate-bounce" />
              </div>

              <div className="mt-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  🥇 1.º Lugar Campeón
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white truncate mt-2" title={first.teamName}>
                  {first.teamName}
                </h3>

                <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">
                  {formatNumber(first.totalScore)} <span className="text-sm font-normal text-amber-200/70">pts</span>
                </div>

                <div className="flex justify-center gap-4 text-xs text-amber-200/90 mt-3 pt-3 border-t border-amber-500/20">
                  <span><strong className="text-white text-sm">{first.saved}</strong> salvos</span>
                  <span><strong className="text-white text-sm">{first.baptisms}</strong> bautizos</span>
                  <span><strong className="text-white text-sm">{first.guests}</strong> invitados</span>
                </div>

                {first.members.length > 0 && (
                  <div className="mt-4 text-xs font-medium text-amber-100/90 flex items-center justify-center gap-1.5 bg-amber-500/15 px-3 py-1.5 rounded-xl border border-amber-500/25">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{first.members.join(" & ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pedestal visual */}
            <div className="w-full h-36 hidden md:flex items-center justify-center rounded-t-2xl bg-gradient-to-b from-amber-500/30 to-zinc-900/80 border-t-2 border-amber-400 font-black text-4xl text-amber-400/50">
              1
            </div>
          </div>
        )}

        {/* TERCER LUGAR (BRONCE 🥉) */}
        {third ? (
          <div className="order-3 md:order-3 flex flex-col items-center">
            {/* Tarjeta Flotante */}
            <div className="w-full glass-panel rounded-2xl p-5 border-amber-700/30 bg-gradient-to-b from-amber-700/10 via-zinc-900/90 to-zinc-950 text-center relative mb-3 hover:border-amber-600 transition-all duration-300">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-800 border-2 border-amber-600 flex items-center justify-center text-xl shadow-lg">
                🥉
              </div>

              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                  3.º Lugar
                </span>
                <h3 className="text-lg font-bold text-white truncate mt-0.5" title={third.teamName}>
                  {third.teamName}
                </h3>

                <div className="text-2xl font-black text-zinc-200 mt-2">
                  {formatNumber(third.totalScore)} <span className="text-xs font-normal text-zinc-400">pts</span>
                </div>

                <div className="flex justify-center gap-3 text-xs text-zinc-400 mt-2 pt-2 border-t border-zinc-800">
                  <span><strong>{third.saved}</strong> salvos</span>
                  <span><strong>{third.baptisms}</strong> bautizos</span>
                  <span><strong>{third.guests}</strong> inv.</span>
                </div>

                {third.members.length > 0 && (
                  <div className="mt-3 text-[11px] text-zinc-400 flex items-center justify-center gap-1.5 bg-zinc-900/80 px-2 py-1 rounded-lg">
                    <Users className="w-3 h-3 text-zinc-500" />
                    <span className="truncate">{third.members.join(" & ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pedestal visual */}
            <div className="w-full h-16 hidden md:flex items-center justify-center rounded-t-xl bg-gradient-to-b from-amber-800/30 to-zinc-900/60 border-t-2 border-amber-600/40 font-black text-2xl text-amber-700/40">
              3
            </div>
          </div>
        ) : (
          <div className="order-3 md:order-3" />
        )}
      </div>
    </section>
  );
}
