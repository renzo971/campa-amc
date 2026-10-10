"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { TeamMetrics } from "@/types/campaign";
import { CHART_COLORS, formatPercentage } from "@/lib/utils";
import { PieChart as PieIcon, Award } from "lucide-react";

interface DonutDistributionProps {
  teams: TeamMetrics[];
  totalSaved: number;
}

export function DonutDistribution({ teams, totalSaved }: DonutDistributionProps) {
  const data = teams
    .filter((t) => t.saved > 0)
    .map((t) => ({
      name: t.teamName,
      value: t.saved,
      percentage: t.savedPercentage,
    }));

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-zinc-800/80 mb-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-indigo-400" />
            Participación de Salvos (%)
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Distribución porcentual de las personas que han tomado decisión por equipo.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full relative flex items-center justify-center">
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="#09090b"
                  strokeWidth={2}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const item = payload[0].payload;
                    return (
                      <div className="bg-zinc-950/95 border border-zinc-700/80 p-2.5 rounded-xl shadow-xl text-xs backdrop-blur-md">
                        <p className="font-bold text-white mb-0.5">{item.name}</p>
                        <p className="text-indigo-400 font-semibold">
                          {item.value} salvos ({formatPercentage(item.percentage)})
                        </p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centro del Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {totalSaved}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Salvos
              </span>
            </div>
          </>
        ) : (
          <div className="text-xs text-zinc-500">Sin datos de salvos registrados</div>
        )}
      </div>

      {/* Leyenda interactiva */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-xs">
        {data.slice(0, 6).map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5 truncate">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="text-zinc-400 truncate text-[11px]">{item.name}:</span>
            <span className="text-zinc-200 font-semibold text-[11px]">
              {formatPercentage(item.percentage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
