import { Image, Button } from 'semantic-ui-react'

class ManualPipboy extends React.Component {
  componentDidMount() {
    document.title = 'Vault 130 - Pipboy'
  }

  render() {
    const { next } = this.props

    return (
      <div style={{ paddingBottom: '20px' }}>
        <center>
          <Image src="static/pip-boy.png" size="large" />
        </center>
        <p>
          Meus parabéns! Agora que está se identificando, você ganhará acesso a
          um minigame do servidor, que funciona como o pip-boy do próprio jogo!
          Esse minigame consiste em que, cada vez que você usa algum chat de
          texto, você automaticamente ganha XP, e a cada quantidade certa de XP,
          você passa de nível gradativamente!
        </p>
        <p>
          A cada 5 níveis, você ganha uma respectiva tag representando o seu
          nível de participação no servidor.
        </p>
        <center>
          <Image src="static/levelup.png" size="medium" />
        </center>
        <p>
          As tags de níveis disponíveis vão do 0 até o 50 (representado pela tag
          "Nível MAX"), apesar de que você pode upar até 150 níveis por conta do
          bot.
        </p>
        <center>
          <Image src="static/niveis.png" size="large" />
        </center>
        <br />
        <p>
          E todo o seu progresso ficará salvo no leaderboard do servidor, mesmo
          se algum dia você acabar saindo dele.
        </p>
        <center>
          <Image src="static/mee6.png" size="large" />
        </center>
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
          Próximo
        </Button>
      </div>
    )
  }
}

export default ManualPipboy
