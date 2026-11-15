import { Suspense } from 'react';
import { supabase } from '../lib/supabase';
import AtlasGallery, { type Discovery } from './gallery';

export const metadata = {
  title: 'Atlas | Aliança Saqueadores',
  description:
    'Planetas descobertos pelos viajantes da aliança, com glifos de portal para copiar.',
};

async function AtlasData() {
  const { data, error } = await supabase
    .from('atlas_discoveries')
    .select('id, title, description, image_url, author, type, glyphs, galaxy, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <p className="text-mute">
        Não foi possível carregar o atlas agora. Tente de novo em instantes.
      </p>
    );
  }

  return <AtlasGallery items={(data ?? []) as Discovery[]} />;
}

export default function AtlasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.95] text-gold">
        Atlas de planetas
      </h1>
      <p className="mt-4 mb-10 max-w-[36em] text-lg text-mute">
        Descobertas dos viajantes da aliança. Copie os glifos e vá até o planeta.
      </p>

      <Suspense fallback={<p className="text-mute">Carregando descobertas...</p>}>
        <AtlasData />
      </Suspense>
    </div>
  );
}
