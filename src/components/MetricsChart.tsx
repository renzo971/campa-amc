"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { TeamMetrics } from "@/types/campaign";
import { BarChart3, Filter } from "lucide-react";

interface MetricsChartProps {
  teams: TeamMetrics[];
}

export function MetricsChart({ teams }: MetricsChartProps) {
  const [metricFilter, setMetricFilter] = useState<"all" | "saved" | "baptisms" | "guests">("all");

  const chartData = teams.map((team) => ({
    name: team.teamName.length > 14 ? `${team.teamName.slice(0, 12)}...` : team.teamName,
    fullName: team.teamName,
    Salvos: team.saved,
    Bautizos: team.baptisms,
    Invitados: team.guests,
    Puntaje: team.totalScore,
  }));

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-zinc-800/80 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Comparativa de Métricas por Equipo
          </h3>
          <p className="text-xs text-zinc-400">
            Distribución comparativa de salvos, bautismos y personas invitadas registradas.
          </p>
        </div>

        {/* Filtros rápidos */}
        <div className="flex items-center gap-1.5 self-start sm:self-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setMetricFilter("all")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              metricFilter === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setMetricFilter("saved")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              metricFilter === "saved"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Salvos
          </button>
          <button
            onClick={() => setMetricFilter("baptisms")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              metricFilter === "baptisms"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Bautizos
          </button>
          <button
            onClick={() => setMetricFilter("guests")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              metricFilter === "guests"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Invitados
          </button>
        </div>
      </div>

      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#71717a"
              fontSize={11}
              tickLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-zinc-950/95 border border-zinc-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs">
                    <p className="font-bold text-white mb-1.5">{data.fullName}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4 text-indigo-400">
                        <span>Salvos:</span>
                        <span className="font-bold">{data.Salvos}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-emerald-400">
                        <span>Bautizos:</span>
                        <span className="font-bold">{data.Bautizos}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-amber-400">
                        <span>Invitados:</span>
                        <span className="font-bold">{data.Invitados}</span>
                      </div>
                      <div className="border-t border-zinc-800 pt-1 mt-1 flex items-center justify-between gap-4 text-zinc-300 font-semibold">
                        <span>Puntaje Total:</span>
                        <span className="text-amber-300">{data.Puntaje} pts</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
              iconType="circle"
            />

            {(metricFilter === "all" || metricFilter === "saved") && (
              <Bar dataKey="Salvos" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
            )}
            {(metricFilter === "all" || metricFilter === "baptisms") && (
              <Bar dataKey="Bautizos" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
            )}
            {(metricFilter === "all" || metricFilter === "guests") && (
              <Bar dataKey="Invitados" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={32} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
