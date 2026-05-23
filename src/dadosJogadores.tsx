// src/dadosJogadores.tsx

export interface SkillData {
  id: string;
  titulo: string;
  tipo: string;
  custo: number;
  descricao: string;
  unlocked: boolean;
  imagemUrl?: string;
  pilhaExtra?: string[];
  requisito?: string;
}

export interface CharacterSheet {
  charName: string;
  playerName: string;
  alma: { principal: number; arcana: number; sorte: number; vontade: number };
  corpo: { principal: number; combate: number; coordenacao: number; estamina: number };
  mente: { principal: number; carisma: number; foco: number; intelecto: number };
  armadura: number;
  escudo: number;
  mana: number;
  sanidade: number;
  skills: SkillData[];
}

export const FICHAS_BASE: Record<string, CharacterSheet> = {
  jorel: {
    playerName: "Jorel",
    charName: "Ebony Sparda",
    alma: { principal: 3, arcana: 1, sorte: 1, vontade: 1 },
    corpo: { principal: 100, combate: 29, coordenacao: 40, estamina: 28 },
    mente: { principal: 1, carisma: 0, foco: 1, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 10,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Nome do Ataque Básico", tipo: "BASICO", custo: 0, descricao: "Descrição do seu ataque básico.", unlocked: true },
      { id: "o1", titulo: "Nome da Skill Ofensiva", tipo: "OFENSIVA", custo: 2, descricao: "Descrição da skill ofensiva.", unlocked: true },
      { id: "t1", titulo: "Nome da Skill Tática", tipo: "TATICA", custo: 1, descricao: "Descrição da skill tática.", unlocked: true }
    ]
  },
  lara: {
    playerName: "Lara",
    charName: "Sete",
    alma: { principal: 2, arcana: 0, sorte: 1, vontade: 1 },
    corpo: { principal: 3, combate: 2, coordenacao: 0, estamina: 1 },
    mente: { principal: 3, carisma: 1, foco: 1, intelecto: 1 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Bandejada", tipo: "BASICO", custo: 0, descricao: "Sete desfere um ataque com sua bandejada.\n\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Sete/Bandejada.png" },
      { id: "b2", titulo: "Café?!", tipo: "BASICO", custo: 0, descricao: "A mão de Sete se tranforma em um lança-café e atinge um inimigo com o líquido fervente em média distância.\n\nPilha: Ataque Básico + Foco.\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Sete/Café.png" },
      { id: "o1", titulo: "Flambar", tipo: "OFENSIVA", custo: 2, descricao: "Sete transforma sua mão em um lança chama, atingindo inimigos em curto alcance e em cone.\n\nPilha: Ofensiva + Combate + Foco.\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Sete/Flambar.png" },
      { id: "o2", titulo: "A conta, por favor!", tipo: "OFENSIVA", custo: 1, descricao: "Um curto circuito percorre o corpo de Sete, fazendo com que ela ataque o alvo mais próximo com sua bandejada por 1d4 turnos. Toma um hit de stress para cada turno que o efeito durar.\n\nPilha: Ofensiva + Combate + Coordenação.\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Sete/A conta, por favor.png" },
      { id: "t1", titulo: "Terapia Nostálgica", tipo: "TATICA", custo: 1, descricao: "Sete solta um jingle de marca, fazendo os aliados e si mesma receberem +1Ss por 1d6 turnos.\n\nPilha: Tática + Carisma + Intelecto.\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Sete/Terapia Nostálgica.png" },
      { id: "t2", titulo: "Horário de Almoço", tipo: "TATICA", custo: 2, descricao: "Sete entra em seu horário de almoço, recebendo 1d4 de cura por (2 + Carisma) turnos, porém perde uma ação por turno (ND 6Ss).\n\nPilha: Tática + Carisma + Foco.\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Sete/Horário de Almoço.png" }
    ]
  },
  guilherme: {
    playerName: "Guilherme",
    charName: "Pendulo",
    alma: { principal: 3, arcana: 0, sorte: 0, vontade: 0 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 0 },
    mente: { principal: 1, carisma: 0, foco: 0, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Tiro Temporal", tipo: "BASICO", custo: 0, descricao: "O jogador atira com sua arma, rodando um d100... \nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Pendulo/Tiro Temporal.png" },
      { id: "b2", titulo: "Cabeçada Pendular", tipo: "BASICO", custo: 0, descricao: "O jogador avança para uma cabeçada no inimigo...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/Pendulo/Cabeçada Pendular.png" },
      { id: "o1", titulo: "Loop Balístico", tipo: "OFENSIVA", custo: 2, descricao: "O jogador atira com sua arma, e sua bala fica em um loop temporal por 1d4 turnos...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Pendulo/Loop Balístico.png" },
      { id: "o2", titulo: "Replay?!?!", tipo: "OFENSIVA", custo: 5, descricao: "O jogador repete as ações de seu 2 últimos turno...\nBônus: +3Ss", unlocked: true, imagemUrl: "/skills/Pendulo/Replay.png" },
      { id: "t1", titulo: "Blink Temporal", tipo: "TATICA", custo: 2, descricao: "O Jogador avança no espaço-tempo, escolhendo uma posição...\nBônus: +2Ss no próximo turno", unlocked: true, imagemUrl: "/skills/Pendulo/Blink Temporal.png" },
      { id: "t2", titulo: "Bolha Temporal", tipo: "TATICA", custo: 3, descricao: "Envolve o alvo em uma bolha, onde ficará parado por 1d3 turnos...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Pendulo/Bolha Temporal.png" }
    ]
  },
  gabriel: {
    playerName: "Gabriel",
    charName: "Gatomancer",
    alma: { principal: 4, arcana: 3, sorte: 0, vontade: 0 },
    corpo: { principal: 2, combate: 0, coordenacao: 1, estamina: 1 },
    mente: { principal: 2, carisma: 0, foco: 1, intelecto: 1 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Bando de Rua", tipo: "BASICO", custo: 0, descricao: "Pequenas silhuetas felinas saltam em direção ao inimigo.\nPilha: Ataque Básico + Arcana", unlocked: true, imagemUrl: "/skills/Gatomancer/Bando de Rua.png" },
      { id: "b2", titulo: "Bote do Predador", tipo: "BASICO", custo: 0, descricao: "Arremessa um brinquedo... \nPilha: Ataque Básico + Arcana", unlocked: true, imagemUrl: "/skills/Gatomancer/Bote do Predador.png" },
      { id: "o1", titulo: "Guarda-Costas Siamês", tipo: "OFENSIVA", custo: 3, descricao: "Gruda orelhas num objeto pesado do cenário...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Gatomancer/Guarda-Costas Siamês.png" },
      { id: "o2", titulo: "Gato-Míssil", tipo: "OFENSIVA", custo: 2, descricao: "Cola orelhas num objeto duro e compacto...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/Gatomancer/Gato-Míssil.png" },
      { id: "t1", titulo: "Instinto Felino", tipo: "TATICA", custo: 3, descricao: "Cola as orelhas em si mesmo, ganhando olhos e reflexos felinos...\nBônus: +2Ss por 1d4 turnos", unlocked: true, imagemUrl: "/skills/Gatomancer/Instinto Felino.png" },
      { id: "t2", titulo: "Cachecol Felpudo", tipo: "TATICA", custo: 3, descricao: "Gruda as orelhas na própria gola...\nBônus: +1 de cura por 1d4", unlocked: true, imagemUrl: "/skills/Gatomancer/Cachecol Felpudo.png" }
    ]
  },
  leonardo: {
    playerName: "Leonardo",
    charName: "Kael'Thas",
    alma: { principal: 3, arcana: 2, sorte: 1, vontade: 0 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 1 },
    mente: { principal: 4, carisma: 0, foco: 2, intelecto: 2 },
    armadura: 0,
    escudo: 3,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Golpe Bastião", tipo: "BASICO", custo: 0, descricao: "Kael'Thas desfere um ataque corpo a corpo contra o inimigo.\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/kaelthas/Golpe Bastião.png" },
      { id: "b2", titulo: "Micro Sonho Induzido", tipo: "BASICO", custo: 0, descricao: "Kael'Thas induz um micro sonho no inimigo...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/kaelthas/Micro Sonho Induzido.png" },
      { id: "o1", titulo: "Onda de Choque Cinética", tipo: "OFENSIVA", custo: 2, descricao: "Kael'Thas libera uma onda de choque cinética...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/kaelthas/Onda de Choque Cinética.png" },
      { id: "o2", titulo: "Ruptura de Pesadelo", tipo: "OFENSIVA", custo: 3, descricao: "Kael'Thas induz o alvo em um pesadelo vívido...\nBônus: +3Ss", unlocked: true, imagemUrl: "/skills/kaelthas/Ruptura de Pesadelo.png" },
      { id: "t1", titulo: "Espelho Protetor", tipo: "TATICA", custo: 3, descricao: "Cria um espelho protetor que absorve o ataque...\nBônus: Reduz o stress em 1d4", unlocked: true, imagemUrl: "/skills/kaelthas/Espelho Protetor.png" },
      { id: "t2", titulo: "Aura de rejeição", tipo: "TATICA", custo: 4, descricao: "Kael'Thas ativa uma aura de rejeição ao seu redor...\nBônus: Inimigos recebem 1d4 de dano reflexivo", unlocked: true, imagemUrl: "/skills/kaelthas/Aura de rejeição.png" }
    ]
  },
  eliel: {
    playerName: "Eliel",
    charName: "Sir Pintom",
    alma: { principal: 4, arcana: 3, sorte: 1, vontade: 0 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 1 },
    mente: { principal: 3, carisma: 0, foco: 1, intelecto: 2 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Gatilho de Mísseis", tipo: "BASICO", custo: 0, descricao: "Sir Pintom dispara mísseis mágicos instantaneamente.\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/eliel/Gatilho de Misseis.png" },
      { id: "b2", titulo: "Esboço Balístico", tipo: "BASICO", custo: 0, descricao: "Sir Pintom desenha rapidamente um objeto pequeno no caderno...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/eliel/Esboco Balistico.png" },
      { id: "o1", titulo: "Geometria Elementar", tipo: "OFENSIVA", custo: 4, descricao: "A magia conjurada ganha um elemento e efeito diferentes...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/eliel/Geometria Elementar.png" },
      { id: "o2", titulo: "Jato de Nanquim", tipo: "OFENSIVA", custo: 2, descricao: "Conjura um jato espesso de tinta nanquim mágica...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/eliel/Jato de Nanquim.png" },
      { id: "t1", titulo: "Ferramentas do Autor", tipo: "TATICA", custo: 4, descricao: "O jogador escolhe entre usar o lápis ou a borracha...\nBônus: Vantagem narrativa", unlocked: true, imagemUrl: "/skills/eliel/Ferramentas do Autor.png" },
      { id: "t2", titulo: "Bestiário", tipo: "TATICA", custo: 10, descricao: "Invoca um animal/monstro da escolha do jogador...\nBônus: Aliado por 1d4 turnos", unlocked: true, imagemUrl: "/skills/eliel/Bestiario.png" }
    ]
  },
  rafael: {
    playerName: "Rafael",
    charName: "Gato De Schrodinger",
    alma: { principal: 2, arcana: 0, sorte: 2, vontade: 0 },
    corpo: { principal: 2, combate: 0, coordenacao: 0, estamina: 2 },
    mente: { principal: 4, carisma: 0, foco: 0, intelecto: 4 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Soco de Schrödinger", tipo: "BASICO", custo: 0, descricao: "Você dá um soco no oponente, porém há 50% de chance de acertar...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/rafa/Soco de Schrodinger.png" },
      { id: "b2", titulo: "Esse objeto está me irritando!", tipo: "BASICO", custo: 0, descricao: "Você pega um objeto aleatório do chão...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/rafa/Objeto Irritante.png" },
      { id: "o1", titulo: "Colapso", tipo: "OFENSIVA", custo: 3, descricao: "Você se divide em dois, criando uma cópia viva e morta...\nBônus: +2Ss", unlocked: true, imagemUrl: "/skills/rafa/Colapso.png" },
      { id: "o2", titulo: "Motim dos Escombros", tipo: "OFENSIVA", custo: 2, descricao: "Você convence os objetos ao seu redor a atacar os inimigos...\nBônus: Variável", unlocked: true, imagemUrl: "/skills/rafa/Motim dos Escombros.png" },
      { id: "t1", titulo: "Superposição", tipo: "TATICA", custo: 2, descricao: "Quando ativada, você entra em um estado de superposição...\nBônus: Anulação de dano", unlocked: true, imagemUrl: "/skills/rafa/Superposicao.png" },
      { id: "t2", titulo: "Conselho Tinteiro", tipo: "TATICA", custo: 1, descricao: "Você pega a sua caneta e pergunta algo a ela...\nBônus: Concede +1Ss por 1d4 turnos.", unlocked: true, imagemUrl: "/skills/rafa/Conselho Tinteiro.png" }
    ]
  },
  bianca: {
    playerName: "Bianca",
    charName: "Simbionte",
    alma: { principal: 1, arcana: 0, sorte: 1, vontade: 0 },
    corpo: { principal: 4, combate: 2, coordenacao: 1, estamina: 1 },
    mente: { principal: 3, carisma: 0, foco: 2, intelecto: 1 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Lâmina de Contenção", tipo: "BASICO", custo: 0, descricao: "O simbionte molda seu braço em uma lâmina óssea irregular...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/simbionte/Lamina de Contencao.png" },
      { id: "b2", titulo: "Espasmo Violento", tipo: "BASICO", custo: 0, descricao: "Imitando um ataque de convulsão brutal...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/simbionte/Espasmo Violento.png" },
      { id: "o1", titulo: "Carnificina da Solitária", tipo: "OFENSIVA", custo: 3, descricao: "Dezenas de tentáculos afiados disparam do corpo em todas as direções...\nBônus: +2Ss.", unlocked: true, imagemUrl: "/skills/simbionte/Carnificina da Solitaria.png" },
      { id: "o2", titulo: "Lobotomia Forçada", tipo: "OFENSIVA", custo: 2, descricao: "O simbionte cria uma haste perfurante extremamente dura...\nBônus: +3Ss", unlocked: true, imagemUrl: "/skills/simbionte/Lobotomia Forcada.png" },
      { id: "t1", titulo: "Camisa de Força Muscular", tipo: "TATICA", custo: 2, descricao: "O simbionte endurece e tensiona a própria massa...\nBônus: +2Ss no próximo turno.", unlocked: true, imagemUrl: "/skills/simbionte/Camisa de Forca Muscular.png" },
      { id: "t2", titulo: "Analgesia Histérica", tipo: "TATICA", custo: 10, descricao: "O hospedeiro desconecta seus receptores de dor...\nBônus: +1Ss físico", unlocked: true, imagemUrl: "/skills/simbionte/Analgesia Histerica.png" }
    ]
  },
  felipe: {
    playerName: "Felipe",
    charName: "Dr. Carcolo",
    alma: { principal: 4, arcana: 1, sorte: 1, vontade: 2 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 0 },
    mente: { principal: 3, carisma: 0, foco: 0, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Análise Decomposta", tipo: "BASICO", custo: 0, descricao: "O Doutor usa sua percepção cirúrgica para encontrar o ponto fraco...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/dr_decaido/Analise Decomposta.png" },
      { id: "b2", titulo: "Toque do Necronomicon", tipo: "BASICO", custo: 0, descricao: "Uma cópia etérea e sussurrante do livro flutua...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/dr_decaido/Toque do Necronomicon.png" },
      { id: "o1", titulo: "Sinfonia da Loucura", tipo: "OFENSIVA", custo: 3, descricao: "O Doutor conjura os sussurros e os projeta em uma onda...\nBônus: +2Ss.", unlocked: true, imagemUrl: "/skills/dr_decaido/Sinfonia da Loucura.png" },
      { id: "o2", titulo: "Invocação: O Observador", tipo: "OFENSIVA", custo: 2, descricao: "O Doutor rasga a realidade temporariamente...\nBônus: +3Ss", unlocked: true, imagemUrl: "/skills/dr_decaido/Invocacao Observador.png" },
      { id: "t1", titulo: "Diagnóstico Obssessivo", tipo: "TATICA", custo: 2, descricao: "O Doutor entra em um transe...\nBônus: +2Ss Mágico", unlocked: true, imagemUrl: "/skills/dr_decaido/Diagnostico Obssessivo.png" },
      { id: "t2", titulo: "Transmutação Necrótica", tipo: "TATICA", custo: 10, descricao: "O Doutor aceita sua condição horrenda...\nBônus: +2 escudo, +1Ss Básico", unlocked: true, imagemUrl: "/skills/dr_decaido/Transmutacao Necrotica.png" }
    ]
  },
  mateus: {
    playerName: "Mateus",
    charName: "ChatGPTelson",
    alma: { principal: 2, arcana: 1, sorte: 1, vontade: 0 },
    corpo: { principal: 2, combate: 0, coordenacao: 1, estamina: 0 },
    mente: { principal: 5, carisma: 0, foco: 2, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Influencia Digital", tipo: "BASICO", custo: 0, descricao: "GPT influencia digitalmente o inimigo...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/mateus/Influencia Digital.png" },
      { id: "b2", titulo: "Conhecimento Infinito", tipo: "BASICO", custo: 0, descricao: "GPT pode responder a qualquer pergunta de maneira rapida...\nBônus: +1Ss", unlocked: true, imagemUrl: "/skills/mateus/Conhecimento Infinito.png" },
      { id: "o1", titulo: "Fragmentação de código", tipo: "OFENSIVA", custo: 3, descricao: "Dispara multiplos fragmentos de código causando lentidão...\nBônus: +2Ss.", unlocked: true, imagemUrl: "/skills/mateus/Fragmentacao de Codigo.png" },
      { id: "o2", titulo: "Execução Binária", tipo: "OFENSIVA", custo: 2, descricao: "Concentra toda sua capacidade de processamento...\nBônus: +3Ss", unlocked: true, imagemUrl: "/skills/mateus/Execucao Binaria.png" },
      { id: "t1", titulo: "Análise Preditiva", tipo: "TATICA", custo: 4, descricao: "Revela a próxima ação do inimigo...\nBônus: +2Ss contra o inimigo", unlocked: true, imagemUrl: "/skills/mateus/Analise Preditiva.png" },
      { id: "t2", titulo: "Reconfiguração de Sistema", tipo: "TATICA", custo: 5, descricao: "Troca as iniciativas de todos os personagens e inimigos...\nBônus: Age novamente", unlocked: true, imagemUrl: "/skills/mateus/Reconfiguracao de Sistema.png" }
    ]
  }
};
