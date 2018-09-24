import { Image, Button, Form, Checkbox } from 'semantic-ui-react'

class ManualTheStrip extends React.Component {
  componentDidMount() {
    document.title = 'Vault 130 - The Strip'
  }

  render() {
    const { next } = this.props

    return (
      <div style={{ paddingBottom: '20px' }}>
        <center>
          <Image src="static/the_strip.png" size="large" />
        </center>
        <p>
          O servidor do Vault 130 também conta com uma sessão de entreternimento
          para os usuários que se chama "The Strip". <br />Nele, há três sessões
          com salas diferentes (representada pelo nome dos estabelecimentos que
          existem em New Vegas Strip) para você aproveitar. <br />Você garante
          acesso à essas salas com as tags "credit checks", e escolhendo a sala,
          ganha automaticamente a tag para ter acesso à ela. <br />Também pode
          escolher entre quantas quiser. Se escolher as três, ganhará uma tag
          única, indicando que está fazendo parte de todas. Escolhendo uma ou
          duas, ganhará somente as tags das salas escolhidas. <br />E bem, caso
          não queira participar de nenhuma, não tem problema nenhum! Basta
          ignorar o resto dessa página.
        </p>
        <br />
        <br />
        <center>
          <Image src="static/tops.png" size="large" />
        </center>
        <p>You dig us, baby! We're The Tops!</p>
        <p>
          Esta é a sala de música do servidor. Você terá acesso ao bot de música
          onde poderá tocar a música que quiser, junto com o resto dos usuários.
        </p>
        <h1>
          <center>[Regras da Sala de Música]</center>
        </h1>
        <p>
          -A sala de música atual é o canal de voz The Aces Theatre. O bot
          SOMENTE pode ser chamado nesta sala.<br />
          <br />
          -Se o bot for visto em qualquer outro lugar com usuário(s) dentro,
          este(s) serão alertados e se continuarem assim, perderão karma até sua
          eventual remoção do servidor.
          <br />
          <br />
          -Na sala cabe-se até 10 pessoas mais o bot. Caso a sala esteja cheia,
          espere sua vez.
          <br />
          <br />
          -Se houver trollagem, como músicas puladas não-desejadamente por outro
          usuário ou baderna total, a(s) pessoa(s) trollando receberão tag de
          Troll, serão expulsas de todas as salas do Strip e perderão karma, até
          sua eventual remoção do servidor..
          <br />
          <br />
          -Caso aja consenso entre os demais ouvintes, a música pode ser pulada.
          <br />
          <br />
          Em qualquer quebra dessas regras, o usuário perderá karma e será
          banido da Strip.
        </p>
        <h1>
          <center>[Comandos do bot de música]</center>
        </h1>
        <p>
          <span style={{ color: 'grey' }}>
            "!play (insira o nome da sua música aqui)"
          </span>{' '}
          Toca a primeira música que está em primeiro lugar no campo de pesquisa
          do YouTube.<br />
          <span style={{ color: 'grey' }}>
            "!play (insira o link da sua música aqui)"
          </span>{' '}
          Toca a música ao qual pertence o link do YouTube.<br />
          <span style={{ color: 'grey' }}>
            "!search (insira o nome da sua música aqui)"
          </span>{' '}
          Mostra uma lista com as 10 primeiras músicas disponíveis no campo de
          pesquisa do YouTube. Após a lista aparecer, escreva no chat um número
          da lista, que a música tocará logo em seguida." <br />
          <span style={{ color: 'grey' }}>"!skip"</span> Pula a música atual.
          Lembrando que o bot faz playlist das músicas, então podem fazer
          comandos atrás de comandos para música que ela tocará todas em
          excessão. <br />
          <br />
          Comando para ver os comandos e regras do bot:
          <span style={{ color: 'grey' }}>!tops</span>
        </p>
        <br />
        <br />
        <center>
          <Image src="static/ultra_luxe.png" size="large" />
        </center>
        <p>
          Living life with a lap of luxury!<br />
          <br />
          Gosta de apostar? Então, meu caro usuário, o Ultra-Luxe é para você!
          Esta sala contem salas de texto onde o bot é o cashier, e você pode
          apostar seus caps em diversos jogos, guardar seu dinheiro no banco,
          transferir dinhero para outros usuários, receber renda diária, e
          ganhar muitas coisas, como lootcrates, XP e é claro, caps. Há até
          mesmo uma loteria onde você ganhar bolões de caps!
        </p>
        <h1>
          <center>[Regras da sala de apostas]</center>
        </h1>
        <p>
          Basicamente falando, o bot tem suas próprias regras, então vamos
          tomá-las como nossas. As regras são: <br />
          -Contas e bancos alternativos não serão tolerados <br />
          -O uso de outros bots e macros de teclado não são permitidos <br />
          -É proibido spammar comandos do bot. Espere de 3 a 5 segundos para
          usá-los novamente. Em qualquer quebra dessas regras, o usuário perderá
          karma e será banido da Strip.<br />
        </p>
        <h1>
          <center>[Comandos do bot de apostas]</center>
        </h1>
        <p>
          <span style={{ color: 'grey' }}>"cs/bal"</span> Cheque o seu dinheiro
          e XP, assim como o dos outros usuários<br />
          <span style={{ color: 'grey' }}>"cs/dice"</span> Role um dado<br />
          <span style={{ color: 'grey' }}>"cs/flip"</span> Jogue uma moeda pro
          alto e veja se cai em cara ou coroa<br />
          <span style={{ color: 'grey' }}>"cs/lottery"</span> Teste sua sorte na
          loteria<br />
          <span style={{ color: 'grey' }}>"cs/rules"</span> As regras do bot (em
          inglês).<br />
          <span style={{ color: 'grey' }}>"cs/slot"</span> Utilize o
          caça-níqueis<br />
          <span style={{ color: 'grey' }}>"cs/top"</span> Veja quem está no topo
          no rank do bot<br />
          <span style={{ color: 'grey' }}>"cs/wheel"</span> Utilize o jogo da
          roleta e veja se cai no número e na cor que escolheu<br />
          <span style={{ color: 'grey' }}>"cs/bank"</span> Guarde até metade do
          seu dinheiro com esse comando<br />
          <span style={{ color: 'grey' }}>"cs/crate"</span> Use esse comando
          para abrir ou vender suas lootcrates<br />
          <span style={{ color: 'grey' }}>"cs/income"</span> Receba sua renda<br />
          <span style={{ color: 'grey' }}>"cs/store"</span> Consiga mais
          dinheiro e renda<br />
          <span style={{ color: 'grey' }}>"cs/transfer"</span> Transfira
          dinheiro para outros usuários<br />
          Comando para ver comandos e regras do bot:{' '}
          <span style={{ color: 'grey' }}>"!luxe"</span>
        </p>
        <br />
        <br />
        <center>
          <Image src="static/gomorrah.png" size="large" />
        </center>
        <p>Gomorrah. It'll be our secret.</p>
        <p>
          A sala NSFW do servidor. Há algo mais a acrescentar?<br />
          Conteúdos pornográficos são para serem postados a vontade nesta sala.
        </p>
        <h1>
          <center>[Regras da sala NSFW]</center>
        </h1>
        <p>
          -Poderá participar da sala somente quem for maior de 14.<br />
          -É permitido somente conteúdo pornográfico. Gore e outros, vão para o
          #shitpost.<br />
          -É permitido somente conteúdo pornográfico NESTA sala.<br />
        </p>
        <p>
          Em qualquer quebra dessas regras, o usuário perderá karma e será
          banido da Strip.
        </p>
        <p>
          Comando para ver as regras do bot:{' '}
          <span style={{ color: 'grey' }}>!gom</span>
        </p>
        <p>
          Agora que já conheceu as salas de entreternimento do servidor, qual
          delas escolherá? Lembrando que, você pode escolher mais de uma. <br />Você
          poderá escolher em quais salas participará no painel do G.O.A.T.
        </p>
        <Image src="static/goatstrip.png" size="medium" />
        <br />
        <Button
          color="green"
          onClick={next}
          className="loginBtn"
          inverted
          size="medium"
          fluid
        >
          Prosseguir para o G.O.A.T.
        </Button>
        <style>{`.ui.checkbox label, .ui.checkbox + label {
          color: '#1bff80 !important'`}</style>
      </div>
    )
  }
}

export default ManualTheStrip
