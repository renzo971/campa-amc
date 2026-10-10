import { fetchReportData } from "@/lib/sheets";
import { DashboardContainer } from "@/components/DashboardContainer";

// Forzar render dinámico para reflejar siempre datos actualizados del Google Sheet
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetchReportData();

  return <DashboardContainer initialData={data} />;
}
