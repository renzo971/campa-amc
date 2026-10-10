"use client";

import { GlobalKPIs } from "@/types/campaign";
import { formatNumber, formatPercentage } from "@/lib/utils";
import {
  Heart,
  Droplet,
  Users,
  Trophy,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface KpiCardsProps {
  kpis: GlobalKPIs;
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const {
    totalSaved,
    totalBaptisms,
    totalGuests,
    targetSaved,
    savedProgressPct,
    leaderTeam,
    activeTeamsCount,
  } = kpis;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {/* 1. TOTAL SALVOS */}
      <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Total Salvos
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Heart className="w-4 h-4 fill-indigo-400/20" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {formatNumber(totalSaved)}
          </span>
          <span className="text-xs font-medium text-zinc-500">
            / meta {formatNumber(targetSaved)}
          </span>
        </div>

        {/* Barra de progreso hacia la meta */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 flex items-center gap-1 font-medium">
              <Target className="w-3 h-3 text-indigo-400" />
              Avance del objetivo
            </span>
            <span className="font-bold text-indigo-400">
              {formatPercentage(savedProgressPct)}
            </span>
          </div>
          <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/50">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, savedProgressPct)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. TOTAL BAUTIZOS */}
      <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Total Bautizos
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Droplet className="w-4 h-4 fill-emerald-400/20" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {formatNumber(totalBaptisms)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-3 h-3" />
            Impacto espiritual
          </span>
          <span className="text-[11px] text-zinc-400">
            Paso de fe confirmado
          </span>
        </div>
      </div>

      {/* 3. TOTAL INVITADOS */}
      <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10">
        <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Total Invitados
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {formatNumber(totalGuests)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <ArrowUpRight className="w-3 h-3" />
            Alcance / Conexión
          </span>
          <span className="text-[11px] text-zinc-400">
            Asistencia registrada
          </span>
        </div>
      </div>

      {/* 4. EQUIPO LÍDER (Glow dorado y destaque especial) */}
      <div className="glass-panel glow-gold p-5 rounded-2xl relative overflow-hidden border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-zinc-900/90 to-zinc-950/90 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            Equipo Líder #1
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-zinc-950 shadow-sm">
            ORO 🥇
          </span>
        </div>

        {leaderTeam ? (
          <div>
            <div className="text-xl sm:text-2xl font-black text-white truncate tracking-tight mb-1" title={leaderTeam.teamName}>
              {leaderTeam.teamName}
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-200/90 mb-3">
              <span className="font-bold text-amber-400">
                {formatNumber(leaderTeam.totalScore)} pts
              </span>
              <span>•</span>
              <span>{leaderTeam.saved} salvos</span>
              <span>•</span>
              <span>{leaderTeam.baptisms} bautizos</span>
            </div>

            <div className="text-[11px] text-zinc-400 bg-zinc-900/80 rounded-xl p-2 border border-zinc-800">
              <span className="text-zinc-500 font-medium block text-[10px] uppercase">Integrantes:</span>
              <span className="text-zinc-200 font-semibold truncate block">
                {leaderTeam.members.length > 0
                  ? leaderTeam.members.join(" & ")
                  : "Por asignar"}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-zinc-400 py-4">Sin datos de equipos aún</div>
        )}
      </div>
    </div>
  );
}
