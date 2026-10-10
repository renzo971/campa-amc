"use client";

import { useState } from "react";
import { RefreshCw, Database, CheckCircle2, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  lastUpdated: string;
  dataSource: "google_sheets" | "mock_data";
  syncStatusMessage?: string;
  onRefresh?: () => Promise<void>;
}

export function Header({
  lastUpdated,
  dataSource,
  syncStatusMessage,
  onRefresh,
}: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await fetch("/api/sync", { method: "POST" });
        window.location.reload();
      }
    } catch (e) {
      console.error("Error refreshing data:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <header className="glass-panel sticky top-0 z-30 px-4 sm:px-6 py-4 border-b border-zinc-800/80 mb-6 sm:mb-8 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Título y subtítulo */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-2xl" role="img" aria-label="Gráfico">
              📊
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              DASHBOARD EJECUTIVO DE CAMPAÑA
            </h1>
            <span className="hidden sm:inline-block text-zinc-500 font-light">|</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              REPORTE GENERAL
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Última sincronización: <strong className="text-zinc-300">{formatDate(lastUpdated)}</strong></span>
            </div>

            {/* Badge de fuente de datos */}
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                dataSource === "google_sheets"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              }`}
              title={syncStatusMessage}
            >
              {dataSource === "google_sheets" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Google Sheets v4</span>
                </>
              ) : (
                <>
                  <Database className="w-3 h-3 text-amber-400" />
                  <span>Modo Mock (Local)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2.5 self-start md:self-center">
          <ThemeToggle />

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60 rounded-xl shadow-lg shadow-indigo-600/20 transition-all border border-indigo-400/30 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>{isRefreshing ? "Actualizando..." : "Refrescar datos"}</span>
          </button>
        </div>
      </div>

      {syncStatusMessage && (
        <div className="max-w-7xl mx-auto mt-2 text-[11px] text-zinc-400 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-zinc-500 flex-shrink-0" />
          <span className="truncate">{syncStatusMessage}</span>
        </div>
      )}
    </header>
  );
}
