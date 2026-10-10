import {
  RawFormResponse,
  RawTeamCatalogItem,
  TeamMetrics,
  GlobalKPIs,
  DashboardData,
  EvidenceItem,
} from "@/types/campaign";
import {
  parseGoogleDriveFileId,
  getDirectImageUrl,
  getDriveViewerUrl,
} from "@/lib/utils";

// Ponderación de puntaje por métrica
export const SCORE_WEIGHTS = {
  SAVED: 10,
  BAPTISMS: 15,
  GUESTS: 3,
};

// Meta global de salvos estimada para el indicador de progreso
export const DEFAULT_CAMPAIGN_GOAL_SAVED = 100;

export function processCampaignData(
  responses: RawFormResponse[],
  catalog: RawTeamCatalogItem[],
  dataSource: "google_sheets" | "mock_data" = "mock_data",
  syncStatusMessage?: string
): DashboardData {
  // 1. Mapear catálogo de equipos para obtener nombres e integrantes normalizados
  const catalogMap = new Map<string, string[]>();
  for (const item of catalog) {
    const key = item.teamName.trim().toLowerCase();
    const members: string[] = [];
    if (item.member1?.trim()) members.push(item.member1.trim());
    if (item.member2?.trim()) members.push(item.member2.trim());
    catalogMap.set(key, members);
  }

  // 2. Agrupar respuestas por equipo
  const teamsMap = new Map<
    string,
    {
      teamName: string;
      members: string[];
      saved: number;
      baptisms: number;
      guests: number;
      latestReportDate: string;
      evidences: EvidenceItem[];
    }
  >();

  // Inicializar equipos que están en el catálogo aunque aún no tengan respuestas
  for (const item of catalog) {
    const key = item.teamName.trim().toLowerCase();
    const members = catalogMap.get(key) || [];
    teamsMap.set(key, {
      teamName: item.teamName.trim(),
      members,
      saved: 0,
      baptisms: 0,
      guests: 0,
      latestReportDate: "",
      evidences: [],
    });
  }

  // Procesar respuestas
  for (const res of responses) {
    const key = res.teamName.trim().toLowerCase();
    let current = teamsMap.get(key);

    if (!current) {
      // Si el equipo no estaba en el catálogo, parsear miembros del reporte
      const fallbackMembers = res.teamMembersRaw
        ? res.teamMembersRaw.split(",").map((m) => m.trim()).filter(Boolean)
        : [];
      current = {
        teamName: res.teamName.trim(),
        members: fallbackMembers,
        saved: 0,
        baptisms: 0,
        guests: 0,
        latestReportDate: res.timestamp,
        evidences: [],
      };
      teamsMap.set(key, current);
    }

    current.saved += Number(res.saved) || 0;
    current.baptisms += Number(res.baptisms) || 0;
    current.guests += Number(res.guests) || 0;

    if (!current.latestReportDate || new Date(res.timestamp) > new Date(current.latestReportDate)) {
      current.latestReportDate = res.timestamp;
    }

    if (res.evidenceUrls && res.evidenceUrls.length > 0) {
      for (const rawUrl of res.evidenceUrls) {
        if (rawUrl && rawUrl.startsWith("http")) {
          const driveFileId = parseGoogleDriveFileId(rawUrl) || undefined;
          const thumbnailUrl = getDirectImageUrl(rawUrl);
          const url = getDriveViewerUrl(rawUrl);

          current.evidences.push({
            url,
            thumbnailUrl,
            driveFileId,
            timestamp: res.timestamp,
            reportedBy: res.email || "Voluntario",
            teamName: current.teamName,
          });
        }
      }
    }
  }

  // 3. Totales Globales
  let totalSaved = 0;
  let totalBaptisms = 0;
  let totalGuests = 0;

  for (const t of teamsMap.values()) {
    totalSaved += t.saved;
    totalBaptisms += t.baptisms;
    totalGuests += t.guests;
  }

  // 4. Calcular puntajes y porcentajes por equipo
  const teamsList: TeamMetrics[] = [];

  for (const t of teamsMap.values()) {
    const totalScore =
      t.saved * SCORE_WEIGHTS.SAVED +
      t.baptisms * SCORE_WEIGHTS.BAPTISMS +
      t.guests * SCORE_WEIGHTS.GUESTS;

    const savedPercentage =
      totalSaved > 0 ? Number(((t.saved / totalSaved) * 100).toFixed(1)) : 0;

    teamsList.push({
      rank: 0, // se asigna abajo
      teamName: t.teamName,
      members: t.members,
      saved: t.saved,
      baptisms: t.baptisms,
      guests: t.guests,
      totalScore,
      savedPercentage,
      evidenceCount: t.evidences.length,
      latestReportDate: t.latestReportDate,
      evidences: t.evidences,
    });
  }

  // Ordenar descendentemente por Puntaje Total, luego por Salvos y Bautizos
  teamsList.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    if (b.saved !== a.saved) return b.saved - a.saved;
    return b.baptisms - a.baptisms;
  });

  // Asignar rango ordinal (1, 2, 3...)
  teamsList.forEach((team, index) => {
    team.rank = index + 1;
  });

  const top3 = teamsList.slice(0, 3);
  const leaderTeam = teamsList.length > 0 ? teamsList[0] : null;

  const targetSaved = Math.max(DEFAULT_CAMPAIGN_GOAL_SAVED, totalSaved);
  const savedProgressPct =
    targetSaved > 0
      ? Math.min(100, Number(((totalSaved / targetSaved) * 100).toFixed(1)))
      : 0;

  const kpis: GlobalKPIs = {
    totalSaved,
    totalBaptisms,
    totalGuests,
    totalReports: responses.length,
    activeTeamsCount: teamsList.filter((t) => t.saved > 0 || t.guests > 0).length,
    targetSaved,
    savedProgressPct,
    leaderTeam,
  };

  return {
    kpis,
    teams: teamsList,
    top3,
    lastUpdated: new Date().toISOString(),
    dataSource,
    syncStatusMessage,
  };
}
