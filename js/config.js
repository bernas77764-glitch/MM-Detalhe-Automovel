/* =====================================================================
   MM Detalhe Automóvel — DADOS DO NEGÓCIO
   ---------------------------------------------------------------------
   Edite APENAS este ficheiro para atualizar contactos, horário, redes
   sociais e avaliações. O resto do site lê daqui automaticamente.
   ===================================================================== */

window.MM_CONFIG = {
  nome: "MM Detalhe Automóvel",

  // Telefone tal como quer que apareça no site e o número em formato
  // internacional (sem espaços nem "+") para o WhatsApp.
  telefone: "932 739 365",
  whatsapp: "351932739365",

  email: "mmdetalhe@gmail.com",

  // Morada completa (aparece nos contactos e no rodapé)
  morada: "Estrada de Polima, R. Outeirinhos 171, 2785-545 São Domingos de Rana",

  // Horário de funcionamento (uma linha por dia / grupo de dias)
  horario: [
    "Segunda a Sexta: 09:30 – 18:00",
    "Sábado: 09:30 – 13:30",
    "Domingo: encerrado",
  ],

  // Ligação da ficha no Google Maps (a que partilhou: maps.app.goo.gl/...)
  googleMapsUrl: "https://maps.app.goo.gl/c5Fsvf2EuE97XDqh8",

  // Ligação direta para "Escrever avaliação" no Google.
  // Se não tiver, deixe igual à googleMapsUrl.
  googleReviewUrl: "https://maps.app.goo.gl/c5Fsvf2EuE97XDqh8",

  // URL de incorporação do mapa: no Google Maps → Partilhar → Incorporar
  // um mapa → copiar apenas o valor de src="..." do iframe.
  // Deixe vazio ("") para mostrar apenas o botão "Abrir no Google Maps".
  mapEmbedUrl: "https://www.google.com/maps?q=MM+Detalhe+Autom%C3%B3vel,+Estrada+de+Polima,+R.+Outeirinhos+171,+2785-545+S%C3%A3o+Domingos+de+Rana&output=embed",

  // Tabela de preços (secção "Preços"). Deixe a lista vazia para esconder.
  precos: [
    { nome: "Proteção Nano Ceramic", preco: "290 €", desc: "Revestimento cerâmico de longa duração com brilho e efeito hidrofóbico." },
    { nome: "Polimento comercial", preco: "100 €", desc: "Polimento de uma etapa para devolver brilho e remover riscos ligeiros." },
    { nome: "Limpeza de alcatifa", preco: "49 €", desc: "Limpeza profunda da alcatifa com extração a húmido." },
  ],
  precosNota: "Preços indicativos. O valor final depende do tamanho e do estado da viatura — peça o seu orçamento sem compromisso.",

  // Redes sociais (deixe "" para esconder o ícone)
  instagram: "https://www.instagram.com/mmdetalheautomovel.pt",
  facebook: "",

  // Avaliações apresentadas no site (copiadas da ficha Google).
  // "traducao" é opcional: aparece por baixo do texto original.
  avaliacoes: [
    {
      nome: "Victor Arefiev",
      texto: "Atendimento espetacular e com muita atenção ao detalhe! A equipa é extremamente simpática e demonstrou um profissionalismo irrepreensível. Para além da qualidade do serviço, praticam preços muito competitivos. Recomendo vivamente!",
      estrelas: 5,
    },
    {
      nome: "Jamie Dixon",
      texto: "INCREDIBLE!!! 5 stars! Best car detail experience I've had in Portugal! Highly recommend!!!",
      traducao: "Incrível! 5 estrelas! A melhor experiência de detalhe automóvel que tive em Portugal. Recomendo muito!",
      estrelas: 5,
    },
    {
      nome: "Paulo Neto",
      texto: "Bruno is super friendly and my car is looking brand new, it doesn't even look that I own a dog that is always trashing my car with fur! Super recommend it.",
      traducao: "O Bruno é super simpático e o meu carro parece novo. Nem parece que tenho um cão que está sempre a encher o carro de pelos! Recomendo muito.",
      estrelas: 5,
    },
    {
      nome: "Hyuntae Kim",
      texto: "It was very friendly and professional. My car has turned a new car. I will visit there again.",
      traducao: "Atendimento muito simpático e profissional. O meu carro ficou como novo. Vou voltar.",
      estrelas: 5,
    },
  ],
};
