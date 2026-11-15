import Image from 'next/image';

const DISCORD = 'https://discord.gg/XTRw3hRfe';

const primary =
  'inline-block rounded bg-gold px-6 py-3 font-semibold text-background hover:bg-gold-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft';
const ghost =
  'inline-block rounded border border-line px-6 py-3 font-semibold hover:border-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-soft';

const missions = [
  {
    name: 'Recrutar um viajante',
    how: 'Traga alguém novo e ajude a pessoa a entrar na aliança.',
  },
  {
    name: 'Base na Terra',
    how: 'Construa uma base na Terra e envie as coordenadas para validação.',
  },
  {
    name: 'Conquistar uma estação',
    how: 'Assuma uma estação espacial e comprove com captura de tela.',
  },
];

const steps = [
  { title: 'Entre no Discord', text: 'É lá que a aliança conversa e combina as missões.' },
  { title: 'Crie sua conta no portal', text: 'Cadastre-se com e-mail e senha e informe seu nome de viajante.' },
  { title: 'Escolha uma missão', text: 'Pegue a primeira e comece a acumular glifos.' },
];

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <h1 className="font-display text-[clamp(4rem,11vw,8.4rem)] font-black leading-[0.9] text-gold">
              Aliança Saqueadores
            </h1>
            <p className="mt-6 mb-8 max-w-[30em] text-lg text-mute">
              Uma aliança brasileira de No Man&apos;s Sky. Missões em grupo pagas
              em glifos e um atlas de planetas feito pelos próprios viajantes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className={primary}>
                Entrar no Discord
              </a>
              <a href="#missoes" className={ghost}>
                Ver as missões
              </a>
            </div>
          </div>
          <Image
            src="/logo.png"
            alt="Emblema da Aliança Saqueadores"
            width={470}
            height={470}
            priority
            className="emblem-land order-first mx-auto w-full max-w-[300px] drop-shadow-[0_0_60px_rgba(240,185,43,0.25)] md:order-none md:max-w-[470px]"
          />
        </section>
      </div>

      <section id="missoes" className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-5xl font-black leading-none text-gold">
            Missões que rendem glifos
          </h2>
          <p className="mt-4 mb-10 max-w-[36em] text-mute">
            Cada missão concluída é validada pelos líderes e vira recompensa no seu perfil.
          </p>
          <div>
            {missions.map((m) => (
              <div
                key={m.name}
                className="grid gap-1 border-t border-line py-6 md:grid-cols-[2fr_3fr_auto] md:gap-8"
              >
                <h3 className="font-display text-3xl font-black">{m.name}</h3>
                <p className="text-mute">{m.how}</p>
                <p className="font-semibold text-gold">Recompensa em glifos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atlas" className="border-t border-line py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl font-black leading-none text-gold">
              Atlas de planetas
            </h2>
            <p className="mt-4 mb-8 max-w-[36em] text-mute">
              A busca começa em Eissentam. Cada descoberta fica salva com glifos, tipo e quem achou.
            </p>
            <ul>
              <li className="border-t border-line py-4">
                <b className="block font-display text-2xl font-black">Gigantes paradisíacos</b>
                <span className="text-mute">Planetas enormes, verdes e calmos para bases grandes.</span>
              </li>
              <li className="border-t border-line py-4">
                <b className="block font-display text-2xl font-black">Gigantes oceânicos</b>
                <span className="text-mute">Mundos de água com espaço para cidades flutuantes.</span>
              </li>
            </ul>
          </div>
          <div className="self-start rounded-md border border-dashed border-line bg-panel p-8">
            <h3 className="mb-2 font-display text-3xl font-black">Nenhuma descoberta ainda</h3>
            <p className="mb-5 text-mute">
              O atlas está vazio. Achou um planeta bom? Mande no Discord e ele entra primeiro.
            </p>
            <a href={DISCORD} target="_blank" rel="noopener noreferrer" className={primary}>
              Mandar no Discord
            </a>
          </div>
        </div>
      </section>

      <section id="entrar" className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-5xl font-black leading-none text-gold">Como entrar</h2>
          <p className="mt-4 mb-10 text-mute">Leva uns cinco minutos.</p>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-[3px] border-gold pt-4">
                <span className="font-display text-5xl font-black text-gold">{i + 1}</span>
                <b className="mt-1 mb-1.5 block text-lg">{s.title}</b>
                <span className="text-mute">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
