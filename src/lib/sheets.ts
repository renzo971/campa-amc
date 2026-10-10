import { google } from "googleapis";
import { RawFormResponse, RawTeamCatalogItem, DashboardData } from "@/types/campaign";
import { MOCK_FORM_RESPONSES, MOCK_TEAM_CATALOG } from "@/lib/mock-data";
import { processCampaignData } from "@/lib/calculations";

export async function fetchReportData(): Promise<DashboardData> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  // Si no hay credenciales configuradas, fallback transparente a Mock Data
  if (!sheetId || !clientEmail || !rawPrivateKey) {
    return processCampaignData(
      MOCK_FORM_RESPONSES,
      MOCK_TEAM_CATALOG,
      "mock_data",
      "Modo demostración activo. Configura .env.local para conectar tu Google Sheet en vivo."
    );
  }

  try {
    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 1. Obtener Respuestas de formulario 1
    // Columnas: Marca temporal (A), Email (B), Equipo (C), Salvos (D), Bautizos (E), Invitados (F), Fotos evidencia (G), Integrantes (H)
    const responsesPromise = sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Respuestas de formulario 1'!A2:H",
    });

    // 2. Obtener Catálogo de Equipos
    // Columnas: Marca temporal (A), Nombre del equipo (B), Integrante 1 (C), Integrante 2 (D)
    const catalogPromise = sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Equipos'!A2:D",
    });

    const [responsesRes, catalogRes] = await Promise.all([
      responsesPromise,
      catalogPromise,
    ]);

    const rawRows = responsesRes.data.values || [];
    const catalogRows = catalogRes.data.values || [];

    // Parsear respuestas
    const parsedResponses: RawFormResponse[] = rawRows
      .filter((row) => row && row[2]) // Filtrar filas sin nombre de equipo
      .map((row) => {
        const evidenceRaw = String(row[6] || "").trim();
        // Separar URLs si vienen múltiples separadas por comas, espacios o saltos de línea
        const evidenceUrls = evidenceRaw
          ? evidenceRaw
              .split(/[\n,]+/)
              .map((u) => u.trim())
              .filter((u) => u.startsWith("http"))
          : [];

        return {
          timestamp: String(row[0] || ""),
          email: String(row[1] || ""),
          teamName: String(row[2] || "").trim(),
          saved: parseInt(String(row[3] || "0"), 10) || 0,
          baptisms: parseInt(String(row[4] || "0"), 10) || 0,
          guests: parseInt(String(row[5] || "0"), 10) || 0,
          evidenceUrls,
          teamMembersRaw: String(row[7] || "").trim(),
        };
      });

    // Parsear catálogo
    const parsedCatalog: RawTeamCatalogItem[] = catalogRows
      .filter((row) => row && row[1]) // Filtrar filas sin nombre de equipo
      .map((row) => ({
        timestamp: String(row[0] || ""),
        teamName: String(row[1] || "").trim(),
        member1: String(row[2] || "").trim(),
        member2: String(row[3] || "").trim(),
      }));

    return processCampaignData(
      parsedResponses,
      parsedCatalog,
      "google_sheets",
      "Sincronizado exitosamente con Google Sheets v4"
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error al consultar Google Sheets API:", errorMsg);

    return processCampaignData(
      MOCK_FORM_RESPONSES,
      MOCK_TEAM_CATALOG,
      "mock_data",
      `Fallo de conexión con Google Sheets (${errorMsg}). Mostrando datos de respaldo.`
    );
  }
}
