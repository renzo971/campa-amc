import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fetchReportData } from "@/lib/sheets";

export async function POST() {
  try {
    revalidatePath("/");
    const freshData = await fetchReportData();
    return NextResponse.json({
      success: true,
      message: "Datos sincronizados correctamente",
      data: freshData,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Error al sincronizar";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fetchReportData();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Error al obtener datos";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
