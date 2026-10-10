"use client";

import { useState, useMemo } from "react";
import { TeamMetrics, EvidenceItem } from "@/types/campaign";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { EvidenceModal } from "./EvidenceModal";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trophy,
  Camera,
  Users,
  Flame,
} from "lucide-react";

interface LeaderboardTableProps {
  teams: TeamMetrics[];
  totalSaved: number;
}

type SortField =
  | "rank"
  | "teamName"
  | "saved"
  | "baptisms"
  | "guests"
  | "totalScore"
  | "savedPercentage";

export function LeaderboardTable({ teams, totalSaved }: LeaderboardTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("totalScore");
  const [sortAsc, setSortAsc] = useState(false);

  // Estado para el modal de evidencias
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTeamName, setModalTeamName] = useState("");
  const [modalEvidences, setModalEvidences] = useState<EvidenceItem[]>([]);

  const handleOpenEvidences = (team: TeamMetrics) => {
    setModalTeamName(team.teamName);
    setModalEvidences(team.evidences);
    setModalOpen(true);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === "rank" || field === "teamName"); // asc por defecto para ranking o nombre
    }
  };

  // Filtrado y ordenamiento interactivo
  const filteredAndSortedTeams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = teams.filter((team) => {
      const matchName = team.teamName.toLowerCase().includes(term);
      const matchMembers = team.members.some((m) =>
        m.toLowerCase().includes(term)
      );
      return matchName || matchMembers;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === "teamName") {
        comparison = a.teamName.localeCompare(b.teamName);
      } else {
        comparison = (a[sortField] as number) - (b[sortField] as number);
      }
      return sortAsc ? comparison : -comparison;
    });
  }, [teams, searchTerm, sortField, sortAsc]);

  const maxSavedInList = useMemo(() => {
    return Math.max(...teams.map((t) => t.saved), 1);
  }, [teams]);

  return (
    <div className="glass-panel rounded-2xl border-zinc-800/80 overflow-hidden mb-12">
      {/* Barra de control superior de la tabla */}
      <div className="p-4 sm:p-6 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Tabla General de Posiciones
          </h3>
          <p className="text-xs text-zinc-400">
            Puntaje acumulado ponderado (Salvos: ×10, Bautizos: ×15, Invitados: ×3)
          </p>
        </div>

        {/* Buscador */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por equipo o integrante..."
            className="w-full bg-zinc-900/90 text-xs text-zinc-200 placeholder-zinc-500 rounded-xl pl-9 pr-3 py-2 border border-zinc-700/60 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tabla Responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold select-none">
              <th
                onClick={() => handleSort("rank")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Pos.</span>
                  {sortField === "rank" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("teamName")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Equipo</span>
                  {sortField === "teamName" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th className="py-3.5 px-4">Integrantes</th>

              <th
                onClick={() => handleSort("saved")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Salvos</span>
                  {sortField === "saved" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("baptisms")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Bautizos</span>
                  {sortField === "baptisms" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("guests")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Invitados</span>
                  {sortField === "guests" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("totalScore")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Puntaje Total</span>
                  {sortField === "totalScore" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("savedPercentage")}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>% Salvos</span>
                  {sortField === "savedPercentage" ? (
                    sortAsc ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th className="py-3.5 px-4 text-center">Evidencias</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60">
            {filteredAndSortedTeams.length > 0 ? (
              filteredAndSortedTeams.map((team) => {
                const isLeader = team.rank === 1;
                const isSecond = team.rank === 2;
                const isThird = team.rank === 3;

                return (
                  <tr
                    key={team.teamName}
                    className={`transition-colors hover:bg-zinc-800/40 ${
                      isLeader
                        ? "bg-amber-500/5 hover:bg-amber-500/10"
                        : isSecond
                        ? "bg-zinc-400/5 hover:bg-zinc-400/10"
                        : isThird
                        ? "bg-amber-700/5 hover:bg-amber-700/10"
                        : ""
                    }`}
                  >
                    {/* Posición / Medalla */}
                    <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                      {isLeader ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-extrabold">
                          🥇 1.º
                        </span>
                      ) : isSecond ? (
                        <span className="inline-flex items-center gap-1 text-zinc-300 font-bold">
                          🥈 2.º
                        </span>
                      ) : isThird ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                          🥉 3.º
                        </span>
                      ) : (
                        <span className="text-zinc-500 pl-2">#{team.rank}</span>
                      )}
                    </td>

                    {/* Nombre del Equipo */}
                    <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{team.teamName}</span>
                        {isLeader && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            Líder
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Integrantes */}
                    <td className="py-3.5 px-4 text-zinc-400 text-xs">
                      {team.members.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                          <span className="truncate max-w-[180px] sm:max-w-[240px]">
                            {team.members.join(" & ")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-600 italic">Sin integrantes</span>
                      )}
                    </td>

                    {/* Salvos con barra de progreso inline */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-indigo-400 w-6 text-right">
                          {team.saved}
                        </span>
                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${(team.saved / maxSavedInList) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Bautizos */}
                    <td className="py-3.5 px-4 font-semibold text-emerald-400 whitespace-nowrap">
                      {team.baptisms}
                    </td>

                    {/* Invitados */}
                    <td className="py-3.5 px-4 font-medium text-amber-300 whitespace-nowrap">
                      {team.guests}
                    </td>

                    {/* Puntaje Total */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-extrabold text-white bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/60">
                        {formatNumber(team.totalScore)} pts
                      </span>
                    </td>

                    {/* % Salvos */}
                    <td className="py-3.5 px-4 font-medium text-zinc-300 whitespace-nowrap">
                      {formatPercentage(team.savedPercentage)}
                    </td>

                    {/* Botón de Evidencias */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {team.evidences.length > 0 ? (
                        <button
                          onClick={() => handleOpenEvidences(team)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 transition-all cursor-pointer"
                          title="Ver fotos de evidencia"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{team.evidences.length}</span>
                        </button>
                      ) : (
                        <span className="text-zinc-600 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-zinc-500 text-xs sm:text-sm"
                >
                  No se encontraron equipos que coincidan con &quot;{searchTerm}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Evidencias */}
      <EvidenceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        teamName={modalTeamName}
        evidences={modalEvidences}
      />
    </div>
  );
}
