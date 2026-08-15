import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { Category, Project, Lesson } from "../../../lib/types";

type Props = { params: Promise<{ slug: string }> };

async function getCategory(slug: string) {
  return apiFetch<{
    category: Category;
    children: Category[];
    projects: Project[];
    lessons: Lesson[];
  }>(`/categories/${slug}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategory(slug);
  if (!data) return { title: "Categoria" };

  return {
    title: data.category.name,
    description: data.category.description ?? `Conteúdos de ${data.category.name} — Neural Capital.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCategory(slug);
  if (!data) notFound();

  const { category, children, projects, lessons } = data;

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Início</Link>
            <i>/</i>
            {category.parent_id ? (
              <>
                <Link href={`/categoria/${category.slug}`}>{category.name}</Link>
              </>
            ) : (
              <span>{category.name}</span>
            )}
          </nav>
          <h1>
            {category.name}
          </h1>
          {category.description && <p className="page-lead">{category.description}</p>}
          <div className="page-toolbar">
            <span className="tag"><i />{projects.length} {projects.length === 1 ? "projeto" : "projetos"}</span>
            <span className="tag"><i />{lessons.length} {lessons.length === 1 ? "aula" : "aulas"}</span>
          </div>
        </div>
      </section>

      {children.length > 0 && (
        <section className="content-section">
          <div className="shell">
            <div className="section-head">
              <h2>Subcategorias</h2>
            </div>
            <div className="category-grid">
              {children.map((c) => (
                <Link key={c.id} href={`/categoria/${c.slug}`} className="category-card">
                  <h3>{c.name}</h3>
                  {c.description && <p>{c.description}</p>}
                  <span className="count">EXPLORAR →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="content-section">
          <div className="shell">
            <div className="section-head">
              <h2>Projetos</h2>
            </div>
            <div className="category-grid">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={p.slug ? `/projeto/${p.slug}` : `/#${p.market === "forex" ? "forex" : "criptoativos"}`}
                  className="category-card"
                >
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="count">{p.index} · {p.cta || "Conhecer"} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {lessons.length > 0 && (
        <section className="content-section">
          <div className="shell">
            <div className="section-head">
              <h2>Aulas</h2>
            </div>
            <div className="lesson-grid">
              {lessons.map((l) => (
                <Link key={l.id} href={`/aula/${l.slug}`} className="lesson-card">
                  <span className="lesson-type">{l.video_url ? "VÍDEO" : "AULA"}</span>
                  <h3>{l.title}</h3>
                  {l.summary && <p>{l.summary}</p>}
                  <span className="lesson-cta">
                    Assistir <span className="arrow">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {children.length === 0 && projects.length === 0 && lessons.length === 0 && (
        <section className="content-section">
          <div className="shell">
            <div className="empty">Conteúdo em breve.</div>
          </div>
        </section>
      )}
    </main>
  );
}
