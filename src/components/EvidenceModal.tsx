"use client";

import { useEffect, useState } from "react";
import { EvidenceItem } from "@/types/campaign";
import { formatDate } from "@/lib/utils";
import {
  X,
  Image as ImageIcon,
  ExternalLink,
  Calendar,
  User,
  AlertCircle,
  FolderOpen,
  Lock,
} from "lucide-react";

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  evidences: EvidenceItem[];
}

export function EvidenceModal({
  isOpen,
  onClose,
  teamName,
  evidences,
}: EvidenceModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleImageError = (url: string) => {
    setFailedImages((prev) => ({ ...prev, [url]: true }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl border-zinc-700/80 shadow-2xl flex flex-col overflow-hidden bg-zinc-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Evidencias Fotográficas
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {teamName}
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                {evidences.length} {evidences.length === 1 ? "foto registrada" : "fotos registradas"} en los reportes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-all cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner de ayuda para permisos de Google Drive */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 text-xs text-amber-200/90 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="leading-snug">
            <strong>Permisos de Google Drive:</strong> Si una foto no carga directamente, podés hacer clic en <strong>&quot;Abrir en Drive&quot;</strong>. Para verlas embebidas sin restricción, asegurate de que la carpeta de fotos en Google Drive tenga permiso <em>&quot;Cualquier persona con el enlace (Lector)&quot;</em>.
          </p>
        </div>

        {/* Cuerpo / Galería */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {evidences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {evidences.map((ev, idx) => {
                const imgKey = ev.thumbnailUrl || ev.url;
                const isFailed = failedImages[imgKey];

                return (
                  <div
                    key={`${ev.url}-${idx}`}
                    className="group rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/60 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video overflow-hidden bg-zinc-950 flex items-center justify-center">
                      {!isFailed ? (
                        <>
                          <img
                            src={ev.thumbnailUrl || ev.url}
                            alt={`Evidencia ${teamName} - ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                            onClick={() => setSelectedImage(ev.thumbnailUrl || ev.url)}
                            onError={() => handleImageError(imgKey)}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                            <a
                              href={ev.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-white flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-sm hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Abrir en Drive <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </>
                      ) : (
                        /* Estado cuando Google Drive bloquea el hotlinking directo por permisos 403 */
                        <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-zinc-900/90 text-zinc-400 space-y-2">
                          <Lock className="w-6 h-6 text-amber-400/80" />
                          <span className="text-[11px] font-medium text-zinc-300">
                            Acceso restringido en Drive
                          </span>
                          <a
                            href={ev.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all"
                          >
                            <span>Ver en Drive</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="p-3 text-[11px] text-zinc-400 space-y-1 bg-zinc-900/40 border-t border-zinc-800/60">
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                        <span>{formatDate(ev.timestamp)}</span>
                      </div>
                      {ev.reportedBy && (
                        <div className="flex items-center gap-1.5 truncate text-zinc-500">
                          <User className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                          <span className="truncate">{ev.reportedBy}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 text-sm">
              No se han adjuntado evidencias fotográficas para este equipo todavía.
            </div>
          )}
        </div>

        {/* Modal de Imagen Ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] p-2 flex flex-col items-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 p-2 text-white hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                referrerPolicy="no-referrer"
                alt="Vista ampliada"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-zinc-700 shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
