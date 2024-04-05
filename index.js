
//array
let participantes = [
  {
    nome: 'Pedro Beltrão',
    email: 'pedroantoniooou@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: 'Mayk Brito',
    email: 'Maykeb@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 24, 21, 2)
  },
  // Adicione aqui os demais participantes...
  {
    nome: 'Fernando Alvaro',
    email: 'feralv@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 14, 30),
    dataCheckIn: new Date(2024, 3, 2, 9, 45)
  },
  {
    nome: 'Bianca Silva',
    email: 'biasilv@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 15, 45),
    dataCheckIn: null
  },
  {
    nome: 'Lucca Guimarães',
    email: 'lucceta@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 16, 0),
    dataCheckIn: new Date(2024, 3, 2, 11, 30)
  },
  {
    nome: 'Ana Beatriz',
    email: 'anabea@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 17, 15),
    dataCheckIn: null
  },
  {
    nome: 'Alice Melo',
    email: 'aliceem@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 17, 30),
    dataCheckIn: null
  },
  {
    nome: 'Vittor Lucas',
    email: 'vitor54@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 18, 45),
    dataCheckIn: new Date(2024, 3, 2, 14, 30)
  },
  {
    nome: 'André Torres',
    email: 'andrt@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 19, 0),
    dataCheckIn: new Date(2024, 3, 2, 15, 45)
  },
  {
    nome: 'Sonia Silva',
    email: 'soniaasilv@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 20, 15),
    dataCheckIn: new Date(2024, 3, 2, 16, 0)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = 
    `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar Check-In
      </button>
    `
  }

  return `
      <tr>
        <td>
          <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
          ${participante.email}
          </small>
        </td>
        <td>
        ${dataInscricao}
        </td>
        <td>
        ${dataCheckIn}
        </td>
      </tr>
      `
}
  
const atualizarLista = (participantes) => {
  let output =""
  //estrutura de loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
    //faca alguma coisa
  }
  
  //substituir informacao do HTML
  document.querySelector('tbody')
  .innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante ja existe
  const participanteExiste =participantes.find(
    (p) => p.email == participante.email)

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer um check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false){
    return 
  }
  
  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email)
  
  //atualizar o Check-In do participante
  participante.dataCheckIn = new Date()
  
  //atualizar a lista de participantes 
  atualizarLista(participantes)
}