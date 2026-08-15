import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { Project } from "../../../lib/types";

type Props = { params: Promise<{ slug: string }> };

async function getProject(slug: string) {
  return apiFetch<{ project: Project }>(`/projects/${slug}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return { title: "Projeto" };

  return {
    title: data.project.title,
    description: data.project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  const { project } = data;
  const media = project.media ?? [];
  const lessons = project.lessons ?? [];
  const images = media.filter((m) => m.type === "image");
  const pdfs = media.filter((m) => m.type === "pdf");
  const links = media.filter((m) => m.type === "link" || m.type === "video");

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Início</Link>
            <i>/</i>
            {project.category ? (
              <>
                <Link href={`/categoria/${project.category.slug}`}>{project.category.name}</Link>
                <i>/</i>
              </>
            ) : null}
            <span>{project.title}</span>
          </nav>
          <h1>{project.title}</h1>
          <p className="page-lead">{project.description}</p>
          <div className="page-toolbar">
            {project.market && (
              <span className="tag"><i />{project.market === "forex" ? "Forex" : "Criptoativos"}</span>
            )}
            {project.external_url && (
              <a
                className="button button-small"
                href={project.external_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar projeto <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="shell article">
        <div>
          {images.length > 0 && (
            <section className="content-section" style={{ paddingTop: 0 }}>
              <div className="section-head">
                <h2>Galeria</h2>
              </div>
              <div className="category-grid">
                {images.map((m) => (
                  <a
                    key={m.id}
                    className="category-card"
                    href={m.file_url ?? m.external_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m.file_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.file_url} alt={m.title ?? project.title} style={{ width: "100%", borderRadius: 4 }} />
                    ) : (
                      <h3>{m.title ?? "Imagem"}</h3>
                    )}
                  </a>
                ))}
              </div>
            </section>
          )}

          {lessons.length > 0 && (
            <section className="content-section">
              <div className="section-head">
                <h2>Aulas relacionadas</h2>
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
            </section>
          )}
        </div>

        <aside className="article-side">
          {pdfs.length > 0 && (
            <div className="side-panel">
              <h4>Downloads</h4>
              <div className="media-list">
                {pdfs.map((m) => (
                  <a
                    key={m.id}
                    className="media-item"
                    href={m.file_url ?? m.external_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="media-badge">PDF</span>
                    <span>
                      <span className="media-name">{m.title ?? "Arquivo"}</span>
                    </span>
                    <span className="media-dl">BAIXAR</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {links.length > 0 && (
            <div className="side-panel">
              <h4>Links</h4>
              <div className="media-list">
                {links.map((m) => (
                  <a
                    key={m.id}
                    className="media-item"
                    href={m.external_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="media-badge">{m.type === "video" ? "VÍDEO" : "LINK"}</span>
                    <span className="media-name">{m.title ?? m.external_url}</span>
                    <span className="media-dl">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
