import { RawFormResponse, RawTeamCatalogItem } from "@/types/campaign";

export const MOCK_TEAM_CATALOG: RawTeamCatalogItem[] = [
  {
    timestamp: "2026-09-01 09:00:00",
    teamName: "Leones de Judá",
    member1: "Carlos Méndez",
    member2: "Mateo Silva",
  },
  {
    timestamp: "2026-09-01 09:10:00",
    teamName: "Águilas Reales",
    member1: "Daniela Morales",
    member2: "Sofía Castro",
  },
  {
    timestamp: "2026-09-01 09:15:00",
    teamName: "Guerreros de Fe",
    member1: "Andrés Ramírez",
    member2: "Lucas Benítez",
  },
  {
    timestamp: "2026-09-01 09:20:00",
    teamName: "Antorchas Vivas",
    member1: "Camila Ortiz",
    member2: "Valentina Ríos",
  },
  {
    timestamp: "2026-09-01 09:25:00",
    teamName: "Pescadores de Hombres",
    member1: "Gabriel Flores",
    member2: "Esteban Vega",
  },
  {
    timestamp: "2026-09-01 09:30:00",
    teamName: "Vencedores",
    member1: "Martín Rivas",
    member2: "Joaquín Navarro",
  },
  {
    timestamp: "2026-09-01 09:35:00",
    teamName: "Roca Firme",
    member1: "Paula Domínguez",
    member2: "Elena Guzmán",
  },
  {
    timestamp: "2026-09-01 09:40:00",
    teamName: "Luz y Sal",
    member1: "Nicolás Pardo",
    member2: "Facundo Soria",
  },
];

export const MOCK_FORM_RESPONSES: RawFormResponse[] = [
  {
    timestamp: "2026-10-02 18:30:15",
    email: "carlos.m@example.com",
    teamName: "Leones de Judá",
    saved: 14,
    baptisms: 4,
    guests: 28,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Carlos Méndez, Mateo Silva",
  },
  {
    timestamp: "2026-10-03 20:10:00",
    email: "daniela.m@example.com",
    teamName: "Águilas Reales",
    saved: 11,
    baptisms: 3,
    guests: 22,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Daniela Morales, Sofía Castro",
  },
  {
    timestamp: "2026-10-04 19:45:22",
    email: "andres.r@example.com",
    teamName: "Guerreros de Fe",
    saved: 9,
    baptisms: 2,
    guests: 18,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Andrés Ramírez, Lucas Benítez",
  },
  {
    timestamp: "2026-10-05 21:05:10",
    email: "camila.o@example.com",
    teamName: "Antorchas Vivas",
    saved: 8,
    baptisms: 2,
    guests: 15,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Camila Ortiz, Valentina Ríos",
  },
  {
    timestamp: "2026-10-06 17:15:40",
    email: "carlos.m@example.com",
    teamName: "Leones de Judá",
    saved: 12,
    baptisms: 5,
    guests: 25,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Carlos Méndez, Mateo Silva",
  },
  {
    timestamp: "2026-10-06 18:50:30",
    email: "gabriel.f@example.com",
    teamName: "Pescadores de Hombres",
    saved: 7,
    baptisms: 1,
    guests: 14,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Gabriel Flores, Esteban Vega",
  },
  {
    timestamp: "2026-10-07 19:20:00",
    email: "martin.r@example.com",
    teamName: "Vencedores",
    saved: 6,
    baptisms: 2,
    guests: 12,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Martín Rivas, Joaquín Navarro",
  },
  {
    timestamp: "2026-10-07 20:45:10",
    email: "daniela.m@example.com",
    teamName: "Águilas Reales",
    saved: 8,
    baptisms: 2,
    guests: 16,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Daniela Morales, Sofía Castro",
  },
  {
    timestamp: "2026-10-08 16:30:00",
    email: "paula.d@example.com",
    teamName: "Roca Firme",
    saved: 5,
    baptisms: 1,
    guests: 10,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Paula Domínguez, Elena Guzmán",
  },
  {
    timestamp: "2026-10-08 19:00:00",
    email: "nicolas.p@example.com",
    teamName: "Luz y Sal",
    saved: 4,
    baptisms: 1,
    guests: 9,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Nicolás Pardo, Facundo Soria",
  },
  {
    timestamp: "2026-10-09 18:40:00",
    email: "andres.r@example.com",
    teamName: "Guerreros de Fe",
    saved: 7,
    baptisms: 3,
    guests: 15,
    evidenceUrls: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    ],
    teamMembersRaw: "Andrés Ramírez, Lucas Benítez",
  },
];
