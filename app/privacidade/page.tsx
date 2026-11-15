export const metadata = {
  title: 'Política de Privacidade | Aliança Saqueadores',
  description: 'Quais dados o portal da Aliança Saqueadores guarda, para quê, e como pedir a exclusão.',
};

const h2 = 'mt-10 mb-3 font-display text-3xl font-black leading-none text-gold';
const p = 'mb-3 text-mute leading-relaxed';
const li = 'mb-2 text-mute leading-relaxed';

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-[clamp(3rem,8vw,5rem)] font-black leading-[0.95] text-gold">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-sm text-mute">Atualizada em 15 de novembro de 2026.</p>

      <h2 className={h2}>Quem somos</h2>
      <p className={p}>
        O portal da Aliança Saqueadores é um projeto de fãs de No Man&apos;s Sky, mantido pela
        liderança da aliança e sem vínculo com a Hello Games. Este texto explica, em linguagem
        simples, como tratamos os seus dados, de acordo com a Lei Geral de Proteção de Dados
        (Lei nº 13.709/2018).
      </p>

      <h2 className={h2}>Que dados guardamos</h2>
      <ul className="list-disc pl-6">
        <li className={li}>
          <b className="text-foreground">Ao entrar com o Discord:</b> o identificador da sua conta, o nome de usuário,
          a foto de perfil e o e-mail, que o Discord nos envia com a sua autorização. Não temos acesso às suas
          mensagens nem aos seus servidores.
        </li>
        <li className={li}>
          <b className="text-foreground">No seu perfil:</b> o nome de viajante e a plataforma que você informa, o seu
          progresso na aliança (marcado pela liderança) e se você é da liderança.
        </li>
        <li className={li}>
          <b className="text-foreground">No atlas:</b> título, tipo, galáxia, glifos, descrição e link de imagem das
          descobertas que você registra, a data e o seu nome de viajante como autor.
        </li>
        <li className={li}>
          <b className="text-foreground">Sessão:</b> cookies estritamente necessários para manter você conectado. Não usamos
          cookies de publicidade nem de rastreamento.
        </li>
        <li className={li}>
          <b className="text-foreground">Registros técnicos:</b> a hospedagem registra dados de acesso, como endereço IP e
          navegador, por segurança e funcionamento do serviço.
        </li>
      </ul>

      <h2 className={h2}>Para que usamos</h2>
      <p className={p}>
        Para identificar você no portal, mostrar o seu progresso, publicar as suas descobertas no atlas e permitir que
        a liderança modere o conteúdo. Não vendemos os seus dados e não os usamos para publicidade.
      </p>
      <p className={p}>
        A base legal é o seu consentimento, dado ao entrar com o Discord, e a execução das funcionalidades do portal que
        você mesmo utiliza.
      </p>

      <h2 className={h2}>O que é público</h2>
      <p className={p}>
        O atlas é público: qualquer pessoa vê o conteúdo das descobertas e o nome de viajante de quem as registrou. Os
        perfis e o progresso aparecem só para membros conectados. O seu e-mail não aparece no site: fica no serviço de
        autenticação e é acessível apenas a quem administra o projeto.
      </p>

      <h2 className={h2}>Com quem os dados passam</h2>
      <ul className="list-disc pl-6">
        <li className={li}>Discord, que faz o login.</li>
        <li className={li}>Supabase, que guarda o banco de dados e a autenticação, em servidores nos Estados Unidos.</li>
        <li className={li}>Vercel, que hospeda o site.</li>
      </ul>
      <p className={p}>
        Como esses serviços ficam fora do Brasil, os seus dados podem ser transferidos para outros países. Escolhemos
        serviços que adotam medidas de segurança reconhecidas.
      </p>

      <h2 className={h2}>Por quanto tempo</h2>
      <p className={p}>
        Enquanto a sua conta existir. Se você pedir a exclusão, apagamos a sua conta e o seu perfil. As descobertas que
        você registrou são apagadas ou ficam sem o seu nome, como você preferir.
      </p>

      <h2 className={h2}>Os seus direitos</h2>
      <p className={p}>
        Você pode pedir a confirmação de que tratamos os seus dados, o acesso a eles, a correção, a anonimização ou a
        eliminação, a portabilidade e informações sobre com quem compartilhamos. Também pode retirar o consentimento a
        qualquer momento. Para isso, fale com um líder da aliança no nosso Discord. Respondemos assim que possível.
      </p>

      <h2 className={h2}>Segurança</h2>
      <p className={p}>
        O acesso aos dados é protegido por regras no banco de dados e pelo login do Discord. Nenhum sistema é totalmente
        livre de riscos, e por isso guardamos só o necessário.
      </p>

      <h2 className={h2}>Menores de idade</h2>
      <p className={p}>
        O portal não é voltado a crianças. Se você tem menos de 18 anos, use-o com o conhecimento de um responsável.
      </p>

      <h2 className={h2}>Mudanças</h2>
      <p className={p}>
        Se este texto mudar de forma relevante, atualizamos a data no topo e avisamos pelo Discord.
      </p>
    </article>
  );
}
