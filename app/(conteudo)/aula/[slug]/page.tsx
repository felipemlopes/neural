import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { Lesson } from "../../../lib/types";

type Props = { params: Promise<{ slug: string }> };

async function getLesson(slug: string) {
  return apiFetch<{ lesson: Lesson }>(`/lessons/${slug}`);
}

function embedUrl(url: string): string | null {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getLesson(slug);
  if (!data) return { title: "Aula" };

  return {
    title: data.lesson.title,
    description: data.lesson.summary ?? undefined,
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const data = await getLesson(slug);
  if (!data) notFound();

  const { lesson } = data;
  const media = lesson.media ?? [];
  const pdfs = media.filter((m) => m.type === "pdf");
  const links = media.filter((m) => m.type === "link");
  const embed = lesson.video_url ? embedUrl(lesson.video_url) : null;

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">Início</Link>
            <i>/</i>
            {lesson.category ? (
              <Link href={`/categoria/${lesson.category.slug}`}>{lesson.category.name}</Link>
            ) : null}
            <i>/</i>
            <span>{lesson.title}</span>
          </nav>
          <h1>{lesson.title}</h1>
          {lesson.summary && <p className="page-lead">{lesson.summary}</p>}
        </div>
      </section>

      <div className="shell article">
        <div>
          {embed && (
            <div className="video-embed" style={{ marginBottom: 30 }}>
              <iframe
                src={embed}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {lesson.body && (
            <div className="article-body">
              {lesson.body.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>

        <aside className="article-side">
          {pdfs.length > 0 && (
            <div className="side-panel">
              <h4>Materiais</h4>
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
                    <span className="media-name">{m.title ?? "Arquivo"}</span>
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
                    <span className="media-badge">LINK</span>
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
