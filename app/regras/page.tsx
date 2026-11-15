export const metadata = {
  title: 'Regras do portal | Aliança Saqueadores',
  description: 'Como funcionam o progresso, os glifos e o atlas no portal da Aliança Saqueadores.',
};

const h2 = 'mt-10 mb-3 font-display text-3xl font-black leading-none text-gold';
const p = 'mb-3 text-mute leading-relaxed';
const li = 'mb-2 text-mute leading-relaxed';

export default function RegrasPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-black leading-[0.95] text-gold">
        Regras do portal
      </h1>

      <h2 className={h2}>Entrar</h2>
      <p className={p}>
        O acesso é pela conta do Discord. No primeiro acesso você escolhe o nome de viajante e a plataforma. Use um nome
        que os outros possam reconhecer e que não ofenda ninguém.
      </p>

      <h2 className={h2}>Progresso e glifos</h2>
      <ul className="list-disc pl-6">
        <li className={li}>O progresso tem três etapas: base na Terra, estação conquistada e glifos desbloqueados.</li>
        <li className={li}>Quem marca as etapas é a liderança, depois de conferir. Você acompanha tudo no seu painel.</li>
        <li className={li}>
          Ao cumprir as etapas, peça a um líder, no nosso Discord, para liberar os seus glifos.
        </li>
      </ul>

      <h2 className={h2}>Atlas</h2>
      <ul className="list-disc pl-6">
        <li className={li}>Registre planetas que você realmente encontrou, com glifos corretos e a galáxia certa.</li>
        <li className={li}>Cada planeta entra uma vez só. Se já estiver no atlas, o portal avisa.</li>
        <li className={li}>
          Use apenas imagens suas ou que você tenha o direito de usar. Não publique conteúdo ofensivo, sexual ou violento.
        </li>
        <li className={li}>
          Você pode apagar as suas descobertas a qualquer momento. A liderança pode remover o que desrespeitar estas regras.
        </li>
      </ul>

      <h2 className={h2}>Convivência</h2>
      <p className={p}>
        Trate os outros viajantes com respeito. A liderança pode restringir o acesso de quem desrespeitar as regras ou
        prejudicar a comunidade.
      </p>
    </article>
  );
}
