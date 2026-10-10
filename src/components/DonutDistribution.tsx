"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { TeamMetrics } from "@/types/campaign";
import { CHART_COLORS, formatPercentage, formatNumber } from "@/lib/utils";
import { PieChart as PieIcon, Sparkles } from "lucide-react";

interface DonutDistributionProps {
  teams: TeamMetrics[];
  totalSaved: number;
}

export function DonutDistribution({ teams, totalSaved }: DonutDistributionProps) {
  const data = teams
    .filter((t) => t.saved > 0)
    .sort((a, b) => b.saved - a.saved)
    .map((t, idx) => ({
      name: t.teamName,
      value: t.saved,
      percentage: t.savedPercentage,
      color: CHART_COLORS[idx % CHART_COLORS.length],
    }));

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border-zinc-800/80 mb-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <PieIcon className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Participación de Salvos
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
            {data.length} {data.length === 1 ? "equipo" : "equipos"}
          </span>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Distribución porcentual de las personas que han tomado decisión por equipo.
        </p>
      </div>

      {/* Donut Principal */}
      <div className="h-56 sm:h-64 w-full relative flex items-center justify-center my-1">
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#09090b"
                  strokeWidth={3}
                  cornerRadius={4}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="hover:opacity-85 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const item = payload[0].payload;
                    return (
                      <div className="bg-zinc-950/95 border border-zinc-700/80 p-3 rounded-2xl shadow-2xl text-xs backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <p className="font-bold text-white">{item.name}</p>
                        </div>
                        <p className="text-indigo-400 font-semibold pl-4.5">
                          {formatNumber(item.value)} salvos ({formatPercentage(item.percentage)})
                        </p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centro del Donut con totalizador y efecto glow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300 drop-shadow-md">
                {formatNumber(totalSaved)}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                Salvos
              </span>
            </div>
          </>
        ) : (
          <div className="text-xs text-zinc-500">Sin datos de salvos registrados</div>
        )}
      </div>

      {/* Desglose tipo Leaderboard (Vertical, ultra legible) */}
      <div className="space-y-2 mt-4 pt-4 border-t border-zinc-800/80">
        {data.slice(0, 5).map((item) => (
          <div
            key={item.name}
            className="group flex flex-col gap-1 p-2 rounded-xl hover:bg-zinc-900/60 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-zinc-300 font-medium truncate group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-zinc-400 text-[11px] font-semibold">
                  {item.value} salvos
                </span>
                <span className="text-white font-extrabold text-[11px] bg-zinc-800/90 px-2 py-0.5 rounded-md border border-zinc-700/50">
                  {formatPercentage(item.percentage)}
                </span>
              </div>
            </div>

            {/* Barra de progreso de participación */}
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, item.percentage)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}

        {data.length > 5 && (
          <div className="text-center pt-1 text-[11px] text-zinc-500">
            + {data.length - 5} equipos adicionales en la tabla general
          </div>
        )}
      </div>
    </div>
  );
}
