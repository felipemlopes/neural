import { Suspense } from "react";
import HomeClient from "./home-client";

// Busca projetos e links da API Laravel (server-side)
async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects`,
      { next: { revalidate: 60 } } // revalida a cada 60s
    );
    if (!res.ok) throw new Error("Falha ao buscar projetos");
    return res.json();
  } catch {
    return { forex: [], crypto: [] };
  }
}

async function getCommunityLinks() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/community-links`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Falha ao buscar links");
    const data = await res.json();
    return data.links ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [projects, communityLinks] = await Promise.all([
    getProjects(),
    getCommunityLinks(),
  ]);

  return (
    <Suspense>
      <HomeClient
        forexProjects={projects.forex ?? []}
        cryptoProjects={projects.crypto ?? []}
        communityLinks={communityLinks}
      />
    </Suspense>
  );
}
