'use client';

import { useState } from 'react';

export type Discovery = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  author: string | null;
  type: string | null;
  glyphs: string | null;
  galaxy: string | null;
  created_at: string;
};

const filters = ['Todos', 'Gigante paradisíaco', 'Gigante oceânico', 'Outro'];

function groupGlyphs(g: string) {
  return g.toUpperCase().replace(/(.{4})/g, '$1 ').trim();
}

export default function AtlasGallery({ items }: { items: Discovery[] }) {
  const [filter, setFilter] = useState('Todos');
  const [copied, setCopied] = useState<string | null>(null);

  const shown = filter === 'Todos' ? items : items.filter((i) => i.type === filter);

  async function copy(item: Discovery) {
    if (!item.glyphs) return;
    try {
      await navigator.clipboard.writeText(item.glyphs.toUpperCase());
      setCopied(item.id);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Sem permissão de área de transferência: o texto segue visível para copiar à mão.
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line bg-panel p-8">
        <h2 className="mb-2 font-display text-3xl font-black">Nenhuma descoberta ainda</h2>
        <p className="text-mute">
          O atlas está vazio. Os membros registram os planetas pelo painel da aliança.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded px-4 py-2 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft ${
              filter === f ? 'bg-gold text-background' : 'border border-line text-mute hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-mute">Nenhuma descoberta desse tipo ainda.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <article key={d.id} className="flex flex-col overflow-hidden rounded-md border border-line bg-panel">
              {d.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={d.image_url}
                  alt={d.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
                {d.type && <p className="text-sm font-semibold text-gold">{d.type}</p>}
                <h2 className="font-display text-3xl font-black leading-none">{d.title}</h2>
                <p className="mt-1 text-sm text-mute">
                  {[d.galaxy, d.author ? `por ${d.author}` : null].filter(Boolean).join(' · ')}
                </p>
                {d.description && <p className="mt-3 text-mute">{d.description}</p>}
                {d.glyphs && (
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <code className="font-mono text-lg tracking-wider">{groupGlyphs(d.glyphs)}</code>
                    <button
                      onClick={() => copy(d)}
                      className="rounded border border-line px-3 py-1.5 text-sm font-semibold hover:border-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft"
                    >
                      {copied === d.id ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                )}
                <p className="mt-3 text-xs text-mute">
                  {new Date(d.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
