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
          <Image src="static/juke.png" size="large" />
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
          SOMENTE pode ser chamado nesta sala.
          <br />
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
          do YouTube.
          <br />
          <span style={{ color: 'grey' }}>
            "!play (insira o link da sua música aqui)"
          </span>{' '}
          Toca a música ao qual pertence o link do YouTube.
          <br />
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
