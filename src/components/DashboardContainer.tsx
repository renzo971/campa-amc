"use client";

import { useState } from "react";
import { DashboardData } from "@/types/campaign";
import { Header } from "./Header";
import { KpiCards } from "./KpiCards";
import { Podium } from "./Podium";
import { MetricsChart } from "./MetricsChart";
import { DonutDistribution } from "./DonutDistribution";
import { LeaderboardTable } from "./LeaderboardTable";

interface DashboardContainerProps {
  initialData: DashboardData;
}

export function DashboardContainer({ initialData }: DashboardContainerProps) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error refreshing dashboard:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Barra de cabecera ejecutiva */}
      <Header
        lastUpdated={data.lastUpdated}
        dataSource={data.dataSource}
        syncStatusMessage={data.syncStatusMessage}
        onRefresh={handleRefresh}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-16">
        {/* Fila de Tarjetas KPIs */}
        <KpiCards kpis={data.kpis} />

        {/* Podio visual de honor */}
        <Podium top3={data.top3} />

        {/* Sección de Visualizaciones Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <MetricsChart teams={data.teams} />
          </div>
          <div className="lg:col-span-1">
            <DonutDistribution
              teams={data.teams}
              totalSaved={data.kpis.totalSaved}
            />
          </div>
        </div>

        {/* Tabla General de Posiciones */}
        <LeaderboardTable
          teams={data.teams}
          totalSaved={data.kpis.totalSaved}
        />
      </main>

      {/* Footer ejecutivo */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Campaña Jóvenes Monte Calvario • Conectado con Google Sheets API v4
          </span>
          <span className="text-zinc-600">
            {data.kpis.activeTeamsCount} equipos activos • {data.kpis.totalReports} reportes procesados
          </span>
        </div>
      </footer>
    </div>
  );
}
