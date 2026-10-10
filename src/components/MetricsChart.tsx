"use client";

import { useState } from "react";
import { TeamMetrics } from "@/types/campaign";
import { formatNumber } from "@/lib/utils";
import {
  BarChart3,
  Flame,
  Users,
  Droplet,
  Heart,
  TrendingUp,
  LayoutList,
  BarChart2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface MetricsChartProps {
  teams: TeamMetrics[];
}

export function MetricsChart({ teams }: MetricsChartProps) {
  const [metricFilter, setMetricFilter] = useState<"all" | "saved" | "baptisms" | "guests">("all");
  const [viewMode, setViewMode] = useState<"cards" | "chart">("cards");

  // Ordenar equipos por puntaje para la vista
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  // Máximo para calcular porcentaje relativo en barras de progreso
  const maxMetric = Math.max(
    ...sortedTeams.map((t) => {
      if (metricFilter === "saved") return t.saved;
      if (metricFilter === "baptisms") return t.baptisms;
      if (metricFilter === "guests") return t.guests;
      return t.saved + t.baptisms + t.guests;
    }),
    1
  );

  const chartData = sortedTeams.map((t) => ({
    name: t.teamName,
    shortName: t.teamName.length > 18 ? `${t.teamName.slice(0, 16)}...` : t.teamName,
    Salvos: t.saved,
    Bautizos: t.baptisms,
    Invitados: t.guests,
    Puntaje: t.totalScore,
  }));

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border-zinc-800/80 mb-8 relative overflow-hidden shadow-2xl">
      {/* Luz ambiental sutil de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera del panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Comparativa de Rendimiento por Equipo
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Visualización proporcional de impacto espiritual y asistencia registrada.
          </p>
        </div>

        {/* Controles: Selector de métricas y modo de vista */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Selector de modo: Lista Proporcional vs Gráfico */}
          <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Vista Ejecutiva Proporcional"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Ejecutiva</span>
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === "chart"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Gráfico Horizontal"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Gráfico</span>
            </button>
          </div>

          {/* Filtro de métrica */}
          <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setMetricFilter("all")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                metricFilter === "all"
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setMetricFilter("saved")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                metricFilter === "saved"
                  ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Salvos
            </button>
            <button
              onClick={() => setMetricFilter("baptisms")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                metricFilter === "baptisms"
                  ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Bautizos
            </button>
            <button
              onClick={() => setMetricFilter("guests")}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                metricFilter === "guests"
                  ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Invitados
            </button>
          </div>
        </div>
      </div>

      {/* VISTA 1: BARRAS HORIZONTALES EJECUTIVAS (SaaS Premium) */}
      {viewMode === "cards" ? (
        <div className="space-y-3.5">
          {sortedTeams.map((team, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const isThird = idx === 2;

            const totalMetricValue =
              metricFilter === "saved"
                ? team.saved
                : metricFilter === "baptisms"
                ? team.baptisms
                : metricFilter === "guests"
                ? team.guests
                : team.saved + team.baptisms + team.guests;

            const pctWidth = Math.max(3, (totalMetricValue / maxMetric) * 100);

            return (
              <div
                key={team.teamName}
                className={`p-3.5 rounded-2xl border transition-all duration-300 hover:scale-[1.008] ${
                  isFirst
                    ? "bg-amber-500/5 border-amber-500/30 hover:border-amber-500/50"
                    : isSecond
                    ? "bg-zinc-800/40 border-zinc-700/60 hover:border-zinc-600"
                    : isThird
                    ? "bg-amber-900/10 border-amber-700/30 hover:border-amber-700/50"
                    : "bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
                  {/* Identidad del equipo */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isFirst
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : isSecond
                          ? "bg-zinc-700 text-zinc-200"
                          : isThird
                          ? "bg-amber-800/30 text-amber-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {isFirst ? "🥇" : isSecond ? "🥈" : isThird ? "🥉" : `#${idx + 1}`}
                    </span>

                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm truncate flex items-center gap-2">
                        <span>{team.teamName}</span>
                        {isFirst && (
                          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            Líder
                          </span>
                        )}
                      </h4>
                      {team.members.length > 0 && (
                        <p className="text-[11px] text-zinc-400 truncate">
                          {team.members.join(" • ")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Badges de métricas y puntaje */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs">
                    {(metricFilter === "all" || metricFilter === "saved") && (
                      <span className="flex items-center gap-1 font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                        <Heart className="w-3 h-3" />
                        <strong>{team.saved}</strong>
                        <span className="text-[10px] text-indigo-300/80 hidden sm:inline">salvos</span>
                      </span>
                    )}

                    {(metricFilter === "all" || metricFilter === "baptisms") && (
                      <span className="flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        <Droplet className="w-3 h-3" />
                        <strong>{team.baptisms}</strong>
                        <span className="text-[10px] text-emerald-300/80 hidden sm:inline">bautizos</span>
                      </span>
                    )}

                    {(metricFilter === "all" || metricFilter === "guests") && (
                      <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        <Users className="w-3 h-3" />
                        <strong>{team.guests}</strong>
                        <span className="text-[10px] text-amber-300/80 hidden sm:inline">inv.</span>
                      </span>
                    )}

                    <div className="bg-zinc-800/90 px-3 py-1 rounded-lg border border-zinc-700/80 text-white font-extrabold text-xs shadow-inner">
                      {formatNumber(team.totalScore)} <span className="text-[10px] font-normal text-zinc-400">pts</span>
                    </div>
                  </div>
                </div>

                {/* Barra de progreso multi-segmento proporcional */}
                <div className="w-full h-2.5 bg-zinc-950/80 rounded-full overflow-hidden p-0.5 border border-zinc-800 flex">
                  {metricFilter === "all" ? (
                    <>
                      {/* Salvos (Indigo) */}
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-l-full transition-all duration-500"
                        style={{
                          width: `${(team.saved / maxMetric) * 100}%`,
                        }}
                        title={`${team.saved} salvos`}
                      />
                      {/* Bautizos (Esmeralda) */}
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                        style={{
                          width: `${(team.baptisms / maxMetric) * 100}%`,
                        }}
                        title={`${team.baptisms} bautizos`}
                      />
                      {/* Invitados (Ámbar) */}
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-r-full transition-all duration-500"
                        style={{
                          width: `${(team.guests / maxMetric) * 100}%`,
                        }}
                        title={`${team.guests} invitados`}
                      />
                    </>
                  ) : (
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metricFilter === "saved"
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-400"
                          : metricFilter === "baptisms"
                          ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                          : "bg-gradient-to-r from-amber-600 to-amber-400"
                      }`}
                      style={{ width: `${pctWidth}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VISTA 2: GRÁFICO RECHARTS HORIZONTAL CON GRADIENTES SUAVES */
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <defs>
                <linearGradient id="indigoBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <linearGradient id="emeraldBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="amberBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
              <XAxis type="number" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="shortName"
                stroke="#a1a1aa"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-zinc-950/95 border border-zinc-700/80 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-xs space-y-1.5 min-w-[170px]">
                      <p className="font-bold text-white text-sm border-b border-zinc-800 pb-1 mb-1">
                        {data.name}
                      </p>
                      <div className="flex justify-between text-indigo-400">
                        <span>Salvos:</span>
                        <strong className="font-bold">{data.Salvos}</strong>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>Bautizos:</span>
                        <strong className="font-bold">{data.Bautizos}</strong>
                      </div>
                      <div className="flex justify-between text-amber-400">
                        <span>Invitados:</span>
                        <strong className="font-bold">{data.Invitados}</strong>
                      </div>
                      <div className="border-t border-zinc-800 pt-1.5 mt-1 flex justify-between text-zinc-200">
                        <span>Puntaje:</span>
                        <strong className="text-amber-300 font-extrabold">{data.Puntaje} pts</strong>
                      </div>
                    </div>
                  );
                }}
              />
              {(metricFilter === "all" || metricFilter === "saved") && (
                <Bar dataKey="Salvos" fill="url(#indigoBar)" radius={[0, 6, 6, 0]} maxBarSize={16} />
              )}
              {(metricFilter === "all" || metricFilter === "baptisms") && (
                <Bar dataKey="Bautizos" fill="url(#emeraldBar)" radius={[0, 6, 6, 0]} maxBarSize={16} />
              )}
              {(metricFilter === "all" || metricFilter === "guests") && (
                <Bar dataKey="Invitados" fill="url(#amberBar)" radius={[0, 6, 6, 0]} maxBarSize={16} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
