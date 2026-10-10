import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number): string {
  if (isNaN(val)) return "0";
  return new Intl.NumberFormat("es-ES").format(val);
}

export function formatPercentage(val: number, decimals: number = 1): string {
  if (isNaN(val)) return "0%";
  return `${val.toFixed(decimals)}%`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function parseGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  // Match https://drive.google.com/open?id=ID or ?id=ID
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch) return idParamMatch[1];

  // Match https://drive.google.com/file/d/ID/view or /d/ID
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch) return fileDMatch[1];

  return null;
}

export function getDirectImageUrl(url: string): string {
  const driveId = parseGoogleDriveFileId(url);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
  }
  return url;
}

export function getDriveViewerUrl(url: string): string {
  const driveId = parseGoogleDriveFileId(url);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/view`;
  }
  return url;
}

export const CHART_COLORS = [
  "#6366f1", // indigo
  "#ec4899", // pink
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f43f5e", // rose
  "#3b82f6", // blue
  "#14b8a6", // teal
  "#84cc16", // lime
];

