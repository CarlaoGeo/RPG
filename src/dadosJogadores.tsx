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
      { id: "b2", titulo: "Café?!", tipo: "BASICO", custo: 0, descricao: "A mão de Sete se tranforma em um lança-café e atinge um inimigo com o líquido fervente em média distância.\n\nPilha: Ataque Básico + Foco.\nBônus: +1Ss", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/Sete/Café.png" },
      { id: "o1", titulo: "Flambar", tipo: "OFENSIVA", custo: 2, descricao: "Sete transforma sua mão em um lança chama, atingindo inimigos em curto alcance e em cone.\n\nPilha: Ofensiva + Combate + Foco.\nBônus: +2Ss", pilhaExtra: ["Combate", "Foco"], unlocked: true, imagemUrl: "/skills/Sete/Flambar.png" },
      { id: "o2", titulo: "A conta, por favor!", tipo: "OFENSIVA", custo: 1, descricao: "Um curto circuito percorre o corpo de Sete, fazendo com que ela ataque o alvo mais próximo com sua bandejada por 1d4 turnos. Toma um hit de stress para cada turno que o efeito durar.\n\nPilha: Ofensiva + Combate + Coordenação.\nBônus: +1Ss", pilhaExtra: ["Combate", "Coordenação"], unlocked: true, imagemUrl: "/skills/Sete/A conta, por favor.png" },
      { id: "t1", titulo: "Terapia Nostálgica", tipo: "TATICA", custo: 1, descricao: "Sete solta um jingle de marca, fazendo os aliados e si mesma receberem +1Ss por 1d6 turnos.\n\nPilha: Tática + Carisma + Intelecto.\nBônus: +1Ss", pilhaExtra: ["Carisma", "Intelecto"], unlocked: true, imagemUrl: "/skills/Sete/Terapia Nostálgica.png" },
      { id: "t2", titulo: "Horário de Almoço", tipo: "TATICA", custo: 2, descricao: "Sete entra em seu horário de almoço, recebendo 1d4 de cura por (2 + Carisma) turnos, porém perde uma ação por turno (ND 6Ss).\n\nPilha: Tática + Carisma + Foco.\nBônus: +2Ss", pilhaExtra: ["Carisma", "Foco"], unlocked: true, imagemUrl: "/skills/Sete/Horário de Almoço.png" }
    ]
  },
  guilherme: {
    playerName: "Guilherme ",
    charName: "Pendulo",
    alma: { principal: 3, arcana: 0, sorte: 0, vontade: 0 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 0 },
    mente: { principal: 1, carisma: 0, foco: 0, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Tiro Temporal", tipo: "BASICO", custo: 0, descricao: "O jogador atira com sua arma, rodando um d100, se der >=50, o tiro acerta o alvo, se for <50 o tiro fica paralisado, acertando apenas no próximo turno. Pode gastar 3 de mana para escolher se ela fica parada ou nao\n\nPilha: Ataque Básico + Foco\nBônus: +1Ss", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/Pendulo/Tiro Temporal.png" },
      { id: "b2", titulo: "Cabeçada Pendular", tipo: "BASICO", custo: 0, descricao: "O jogador avança para uma cabeçada no inimigo em média distância, após a cabeçada, volta ao lugar de origem.\n\nPilha: Ataque Básico + Combate\nBônus: +1Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/Pendulo/Cabeçada Pendular.png" },
      { id: "o1", titulo: "Loop Balístico", tipo: "OFENSIVA", custo: 2, descricao: "O jogador atira com sua arma, e sua bala fica em um loop temporal por 1d4 turnos. Sofre 1hit de stress a cada 2 turnos em loop. Não pode reativar até acabar o loop\n\nPilha: Ofensiva + Intelecto\nBônus: +2Ss", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/Pendulo/Loop Balístico.png" },
      { id: "o2", titulo: "Replay?!?!", tipo: "OFENSIVA", custo: 5, descricao: "O jogador repete as ações de seu 2 últimos turno, fazendo a rolagem novamente. Recebe 1/3 de stress dos sucessos rolados. ND 10Ss\n\nPilha: Ofensiva + Arcana + Intelecto\nBônus: +3Ss", pilhaExtra: ["Arcana", "Intelecto"], unlocked: true, imagemUrl: "/skills/Pendulo/Replay.png" },
      { id: "t1", titulo: "Blink Temporal", tipo: "TATICA", custo: 2, descricao: "O Jogador avança no espaço-tempo, escolhendo uma posição até longa distância. ND 6Ss\n\nPilha: Tática + Coordenação\nBônus: +2Ss no próximo turno", pilhaExtra: ["Coordenação"], unlocked: true, imagemUrl: "/skills/Pendulo/Blink Temporal.png" },
      { id: "t2", titulo: "Bolha Temporal", tipo: "TATICA", custo: 3, descricao: "Envolve o alvo em uma bolha, onde ficará parado por 1d3 turnos. Qualquer dano que o alvo tomar, o efeito é cancelado. Toma 1 hit de stress por turno ativado.\n\nPilha: Tática + Intelecto + Foco\nBônus: +2Ss enquanto o inimigo na bolha", pilhaExtra: ["Intelecto", "Foco"], unlocked: true, imagemUrl: "/skills/Pendulo/Bolha Temporal.png" }
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
      { id: "b1", titulo: "Bando de Rua", tipo: "BASICO", custo: 0, descricao: "O Gatomancer assobia ou estala os dedos, e pequenas silhuetas felinas, mágicas ou vivas, saltam em direção ao inimigo (A qtd. de gatos é determinada pelos overhits)\n\nPilha: Ataque Básico + Arcana\nBônus: +1Ss", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/Gatomancer/Bando de Rua.png" },
      { id: "b2", titulo: "Bote do Predador", tipo: "BASICO", custo: 0, descricao: "Arremessa um brinquedo aos pés do inimigo. Imediatamente, uma pata fantasmagórica gigante (ou um felino colossal) desce do alto para caçar a isca, esmagando o alvo no caminho.\n\nPilha: Ataque Básico + Arcana\nBônus: +1Ss", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/Gatomancer/Bote do Predador.png" },
      { id: "o1", titulo: "Guarda-Costas Siamês", tipo: "OFENSIVA", custo: 3, descricao: "Gruda orelhas num objeto pesado do cenário. Ele ganha vida como um siamês gigante, descendo a porrada no inimigo com toda a fúria antes de voltar a ser inanimado.\n\nPilha: Ofensiva + Arcana + Coordenação\nBônus: +2Ss", pilhaExtra: ["Arcana", "Coordenação"], unlocked: true, imagemUrl: "/skills/Gatomancer/Guarda-Costas Siamês.png" },
      { id: "o2", titulo: "Gato-Míssil", tipo: "OFENSIVA", custo: 2, descricao: "Cola orelhas num objeto duro e compacto. Ele ganha patinhas e fúria, correndo em zigue-zague pelas paredes como um míssil até dar uma cabeçada explosiva no peito do adversário.\n\nPilha: Ofensiva + Foco\nBônus: +2Ss", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/Gatomancer/Gato-Míssil.png" },
      { id: "t1", titulo: "Instinto Felino", tipo: "TATICA", custo: 3, descricao: "Cola as orelhas em si mesmo, ganhando olhos e reflexos felinos. Preveja e desvie de ataques mortais por milímetros, contorcendo-se no ar e caindo sempre perfeitamente de pé.\n\nPilha: Tática + Arcana + Estamina\nBônus: +2Ss por 1d4 turnos", pilhaExtra: ["Arcana", "Estamina"], unlocked: true, imagemUrl: "/skills/Gatomancer/Instinto Felino.png" },
      { id: "t2", titulo: "Cachecol Felpudo", tipo: "TATICA", custo: 3, descricao: "Gruda as orelhas na própria gola, que vira um gatinho macio enrolado no pescoço. O ronronar mágico constante acelera seu metabolismo, fechando feridas e aliviando a exaustão em tempo real.\n\nPilha: Tática + Arcana + Carisma (ND 6Ss)\nBônus: +1 de cura por 1d4", pilhaExtra: ["Arcana", "Carisma"], unlocked: true, imagemUrl: "/skills/Gatomancer/Cachecol Felpudo.png" }
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
      { id: "b1", titulo: "Golpe Bastião", tipo: "BASICO", custo: 0, descricao: "Kael'Thas desfere um ataque corpo a corpo contra o inimigo.\nPilha: Ataque Básico + Combate\nBônus: +1Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/kaelthas/Golpe Bastião.png" },
      { id: "b2", titulo: "Micro Sonho Induzido", tipo: "BASICO", custo: 0, descricao: "Kael'Thas induz um micro sonho no inimigo, fazendo-o perder a concentração e falhar na próxima ação.\nPilha: Ataque Básico + Foco\nBônus: +1Ss e -1Ss para o inimigo no próximo turno se acertar", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/kaelthas/Micro Sonho Induzido.png" },
      { id: "o1", titulo: "Onda de Choque Cinética", tipo: "OFENSIVA", custo: 2, descricao: "Kael'Thas libera uma onda de choque cinética em um cone à sua frente, causando dano e empurrando os inimigos para trás.\nPilha: Ofensiva + Combate\nBônus: +2Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/kaelthas/Onda de Choque Cinética.png" },
      { id: "o2", titulo: "Ruptura de Pesadelo", tipo: "OFENSIVA", custo: 3, descricao: "Kael'Thas induz o alvo em um pesadelo vívido, causando dano mental e deixando-o atordoado por 1d4 turnos.\nPilha: Ofensiva + Arcana + Foco\nBônus: +3Ss e inimigo atordoado por 1d4 turnos", pilhaExtra: ["Arcana", "Foco"], unlocked: true, imagemUrl: "/skills/kaelthas/Ruptura de Pesadelo.png" },
      { id: "t1", titulo: "Espelho Protetor", tipo: "TATICA", custo: 3, descricao: "Kael'Thas  usa sua reação para saltar na frente ou projetar-se instanteaneamente para um aliado, criando um espelho protetor que absorve o ataque, reduzindo o stress em 1d4, porém sofre o dano mitigado.\nPilha: Tática + Arcana + Vontade\nBônus: Reduz o stress em 1d4", pilhaExtra: ["Arcana", "Vontade"], unlocked: true, imagemUrl: "/skills/kaelthas/Espelho Protetor.png" },
      { id: "t2", titulo: "Aura de rejeição", tipo: "TATICA", custo: 4, descricao: "Kael'Thas ativa uma aura de rejeição ao seu redor, fazendo com que os inimigos que o atacarem corpo a corpo recebam 1d4 de dano reflexivo por 1d4 turnos.\nPilha: Tática + Arcana + Vontade\nBônus: Inimigos recebem 1d4 de dano reflexivo por 1d4 turnos", pilhaExtra: ["Arcana", "Vontade"], unlocked: true, imagemUrl: "/skills/kaelthas/Aura de rejeição.png" }
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
      { id: "b1", titulo: "Gatilho de Mísseis", tipo: "BASICO", custo: 0, descricao: "Sir Pintom une o dedo médio e o polegar (fechando o selo tátil), conjurando e disparando mísseis mágicos instantaneamente.\nPilha: Ataque Básico + Arcana\nBônus: +1Ss", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/eliel/Gatilho de Misseis.png" },
      { id: "b2", titulo: "Esboço Balístico", tipo: "BASICO", custo: 0, descricao: "Sir Pintom desenha rapidamente um objeto pequeno no caderno. O desenho salta da página, materializa-se e é arremessado diretamente contra o inimigo.\nPilha: Ataque Básico + Foco\nBônus: +1Ss", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/eliel/Esboco Balistico.png" },
      { id: "o1", titulo: "Geometria Elementar (Livre)", tipo: "OFENSIVA", custo: 4, descricao: "A magia conjurada ganha um elemento e efeito diferentes dependendo da forma base desenhada no papel. O jogador escolhe na hora a forma e o elemento para tentar explorar a fraqueza do alvo.\nPilha: Ofensiva + Intelecto + Arcana\nBônus: +2Ss (O Mestre pode conceder +1Ss extra se a forma/elemento for muito criativa para a situação)", pilhaExtra: ["Intelecto", "Arcana"], unlocked: true, imagemUrl: "/skills/eliel/Geometria Elementar.png" },
      { id: "o2", titulo: "Jato de Nanquim Corrosivo", tipo: "OFENSIVA", custo: 2, descricao: "Sir Pintom conjura um jato espesso de tinta nanquim mágica altamente pressurizada. Além de ferir, a tinta gruda nos olhos do inimigo.\nPilha: Ofensiva + Coordenação + Arcana\nBônus: +2Ss e o inimigo sofre -1Ss (Cego) no próximo ataque dele", pilhaExtra: ["Coordenação", "Arcana"], unlocked: true, imagemUrl: "/skills/eliel/Jato de Nanquim.png" },
      { id: "t1", titulo: "Ferramentas do Autor (Livre)", tipo: "TATICA", custo: 4, descricao: "O jogador escolhe entre usar o lápis (para desenhar um buff/equipamento menor para um aliado) ou a borracha (para tentar apagar uma magia/obstáculo inimigo pequeno do cenário).\nPilha: Tática + Intelecto + Foco\nBônus: Concede a vantagem narrativa solicitada pelo jogador se a rolagem for bem-sucedida", pilhaExtra: ["Intelecto", "Foco"], unlocked: true, imagemUrl: "/skills/eliel/Ferramentas do Autor.png" },
      { id: "t2", titulo: "Bestiário", tipo: "TATICA", custo: 10, descricao: "Invoca um animal/monstro da escolha do jogador, que pode ser usado para atacar ou defender. O Mestre pode solicitar uma descrição rápida do monstro e suas habilidades, mas a ficha é improvisada na hora, usando as estatísticas de um monstro similar do bestiário como base.\nPilha: Tática + Arcana + Intelecto\nBônus: O monstro é invocado para lutar ao lado do jogador por 1d4 turnos", pilhaExtra: ["Arcana", "Intelecto"], unlocked: true, imagemUrl: "/skills/eliel/Bestiario.png" }
    ]
  },
  rafael: {
    playerName: "Rafael", 
    charName: "Migalha",
    alma: { principal: 2, arcana: 2, sorte: 2, vontade: 2 }, 
    corpo: { principal: 2, combate: 2, coordenacao: 2, estamina: 2 },
    mente: { principal: 2, carisma: 2, foco: 2, intelecto: 2 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Abacate Fora de Época", tipo: "BASICO", custo: 0, descricao: "Como \"nem tá em época\", os abacates estão duros como pedras. Migalha saca um desses abacates verdes de dentro do casaco e arremessa com violência na cabeça do alvo. É um ataque físico rápido e contundente.\n\nPilha: Ataque Básico + Combate\nBônus: +1Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/migalha/Abacate.png" },
      { id: "b2", titulo: "Baforada de Zepomix", tipo: "BASICO", custo: 0, descricao: "Ele queima rapidamente uma dose da sua mistura ilegal (Zepomix com frumus e gregs) e sopra a fumaça roxa na cara de um inimigo que chegue muito perto. Causa um dano leve e desorienta o alvo momentaneamente.\n\nPilha: Ataque Básico + Foco\nBônus: Desorienta o alvo", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/migalha/Zepomix.png" },
      { id: "o1", titulo: "Sopa Primordial (Amostra Grátis)", tipo: "OFENSIVA", custo: 3, descricao: "Migalha atira um frasco borbulhante contendo um protótipo do que um dia será a sopa feita com o corpo do Demiurgo. Quando o frasco quebra, o líquido cósmico corrói a armadura, a carne e a própria alma do inimigo, causando dano pesado contínuo.\n\nPilha: Ofensiva + Arcana\nBônus: +2Ss e dano contínuo", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/migalha/Sopa Primordial.png" },
      { id: "o2", titulo: "Gnose Traumática", tipo: "OFENSIVA", custo: 2, descricao: "Ele abre a mente do alvo à força, conectando-o por um milissegundo à \"Prisão dos Pensamentos de Pleroma\". O inimigo recebe uma enxurrada de verdades indescritíveis do universo, sofrendo dano psíquico/mental massivo (ótimo para testar a Sanidade/Mente de quem ele ataca).\n\nPilha: Ofensiva + Intelecto\nBônus: +3Ss (Dano Mágico)", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/migalha/Gnose Traumatica.png" },
      { id: "t1", titulo: "Sonegação Interdimensional", tipo: "TATICA", custo: 3, descricao: "Quando está prestes a tomar um golpe letal (ou se a polícia intergaláctica aparecer), Migalha rompe o véu do mundo material por um instante. Ele \"glitcha\" e fica intangível, passando para o mundo espiritual e negando todo o dano daquele turno.\n\nPilha: Tática + Sorte\nBônus: Nega o dano do turno atual", pilhaExtra: ["Sorte"], unlocked: true, imagemUrl: "/skills/migalha/Sonegacao.png" },
      { id: "t2", titulo: "A Fúria do The Boiled One", tipo: "TATICA", custo: 4, descricao: "Ele invoca rapidamente uma projeção espiritual bizarra do seu \"amigão\". O The Boiled One emerge do chão protegendo uma área como se fosse seu amado pé de jamelão. Ele serve como uma cobertura carnuda e grotesca que bloqueia tiros e aterroriza inimigos que tentem flanquear.\n\nPilha: Tática + Arcana\nBônus: Cria cobertura e causa status de Medo nos inimigos", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/migalha/The Boiled One.png" }
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
      { id: "b1", titulo: "Lâmina de Contenção", tipo: "BASICO", custo: 0, descricao: "O simbionte molda seu braço em uma lâmina óssea irregular, inspirada nos pedaços de vidro e talheres afiados que os detentos escondiam nas celas, e ataca com fúria cega.\nPilha: Ataque Básico + Combate\nBônus: +1Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/simbionte/Lamina de Contencao.png" },
      { id: "b2", titulo: "Espasmo Violento", tipo: "BASICO", custo: 0, descricao: "Imitando um ataque de convulsão brutal, o personagem se joga na direção do inimigo com movimentos erráticos e imprevisíveis, rasgando o que encontrar pela frente.\nPilha: Ataque Básico + Combate\nBônus: +1Ss", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/simbionte/Espasmo Violento.png" },
      { id: "o1", titulo: "Carnificina da Solitária", tipo: "OFENSIVA", custo: 3, descricao: "O simbionte libera a fúria acumulada de horas em isolamento total. Dezenas de tentáculos afiados disparam do corpo em todas as direções, dilacerando o inimigo com puro instinto assassino.\nPilha: Ofensiva + Combate + Vontade\nBônus: +2Ss.", pilhaExtra: ["Combate", "Vontade"], unlocked: true, imagemUrl: "/skills/simbionte/Carnificina da Solitaria.png" },
      { id: "o2", titulo: "Lobotomia Forçada", tipo: "OFENSIVA", custo: 3, descricao: "Lembrando-se das macabras cirurgias do hospício, o simbionte cria uma haste perfurante extremamente dura e tenta cravá-la em um ponto vital (ou na cabeça) do alvo para causar dano massivo.\nPilha: Ofensiva + Combate + Foco\nBônus: +3Ss, mas o excesso de concentração na anatomia causa 1 de Dano de Stress no próprio usuário.", pilhaExtra: ["Combate", "Foco"], unlocked: true, imagemUrl: "/skills/simbionte/Lobotomia Forcada.png" },
      { id: "t1", titulo: "Camisa de Força Muscular", tipo: "TATICA", custo: 3, descricao: "O simbionte endurece e tensiona a própria massa ao redor do hospedeiro, simulando a restrição de uma camisa de força, mas forçando uma injeção massiva de adrenalina no próprio sistema. Ela entra em um estado maníaco.\nPilha: Tática + Vontade\nBônus: Concede +2Ss em todas as rolagens de Ataque (Básico ou Ofensivo) no próximo turno.", pilhaExtra: ["Vontade"], unlocked: true, imagemUrl: "/skills/simbionte/Camisa de Forca Muscular.png" },
      { id: "t2", titulo: "Analgesia Histérica", tipo: "TATICA", custo: 10, descricao: "O hospedeiro desconecta seus receptores de dor copiando o estado mental de um paciente em surto dissociativo total. O personagem começa a rir de forma macabra enquanto ignora a própria degradação física.\nPilha: Tática + Intelecto\nBônus: Concede +1Ss em rolagens Físicas e o personagem ignora completamente os efeitos visuais e mecânicos de ferimentos ou stress por 1d4 turnos.", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/simbionte/Analgesia Histerica.png" }
    ]
  },
  felipe: {
    playerName: "Felipe ",
    charName: "Dr. Carcolo",
    alma: { principal: 4, arcana: 1, sorte: 1, vontade: 2 },
    corpo: { principal: 1, combate: 0, coordenacao: 0, estamina: 0 },
    mente: { principal: 3, carisma: 0, foco: 0, intelecto: 0 },
    armadura: 0,
    escudo: 0,
    mana: 5,
    sanidade: 100,
    skills: [
      { id: "b1", titulo: "Análise Decomposta", tipo: "BASICO", custo: 0, descricao: "O Doutor usa sua percepção cirúrgica, agora distorcida, para encontrar o ponto fraco do inimigo e desferir um golpe a longo alcance.\nPilha: Ataque Básico + Intelecto\nBônus: +1Ss", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/dr_decaido/Analise Decomposta.png" },
      { id: "b2", titulo: "Toque do Necronomicon", tipo: "BASICO", custo: 0, descricao: "Uma cópia etérea e sussurrante do livro flutua ao seu redor. Ao atacar, tentaculos saiem do livro e atacam a média distância.\nPilha: Ataque Básico + Arcana\nBônus: +1Ss", pilhaExtra: ["Arcana"], unlocked: true, imagemUrl: "/skills/dr_decaido/Toque do Necronomicon.png" },
      { id: "o1", titulo: "Sinfonia da Loucura", tipo: "OFENSIVA", custo: 3, descricao: "O Doutor conjura os sussurros que ouve do livro e os projeta em uma onda de choque de energia sombria e gritos agoniantes, devastando a mente e o corpo dos inimigos.\nPilha: Ofensiva + Intelecto + Arcana\nBônus: +2Ss.", pilhaExtra: ["Intelecto", "Arcana"], unlocked: true, imagemUrl: "/skills/dr_decaido/Sinfonia da Loucura.png" },
      { id: "o2", titulo: "Invocação: O Observador das Sombras", tipo: "OFENSIVA", custo: 2, descricao: "O Doutor rasga a realidade temporariamente, invocando um tentáculo cósmico cheio de olhos que ataca violentamente o alvo antes de sumir.\nPilha: Ofensiva + Coordenação + Arcana\nBônus: +3Ss, mas o Doutor toma 1 de Dano de Stress pela quebra da realidade.", pilhaExtra: ["Coordenação", "Arcana"], unlocked: true, imagemUrl: "/skills/dr_decaido/Invocacao Observador.png" },
      { id: "t1", titulo: "Diagnóstico Obssessivo", tipo: "TATICA", custo: 2, descricao: "O Doutor entra em um transe, focando apenas na imagem de sua esposa desaparecida. Isso canaliza sua dor em fúria arcana pura.\nPilha: Tática + Vontade\nBônus: Concede +2Ss em todas as rolagens de Dano Mágico (Ofensivo) por 2 turnos.", pilhaExtra: ["Vontade"], unlocked: true, imagemUrl: "/skills/dr_decaido/Diagnostico Obssessivo.png" },
      { id: "t2", titulo: "Transmutação Necrótica", tipo: "TATICA", custo: 10, descricao: "O Doutor aceita sua condição horrenda e permite que a magia do Necronomicon regenere e fortaleça seu corpo monstruoso temporariamente, sacrificando sanidade e se transformando em um monstro de H.P Lovecraft.\nPilha: Tática + Foco\nBônus: O Doutor ganha Resistência a Dano Físico (+2 de escudo) e +1Ss em Ataques Básicos por 1d4 turnos. Aumenta Stress em 2.", pilhaExtra: ["Foco"], unlocked: true, imagemUrl: "/skills/dr_decaido/Transmutacao Necrotica.png" }
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
      { id: "b1", titulo: "Influencia Digital", tipo: "BASICO", custo: 0, descricao: "GPT influencia digitalmente o inimigo, fazendo-o acreditar que ele é um personagem de um jogo e que está sendo controlado por um jogador. O inimigo fica confuso e vulnerável a ataques.\nPilha: Ataque Básico + Carisma\nBônus: +1Ss", pilhaExtra: ["Carisma"], unlocked: true, imagemUrl: "/skills/mateus/Influencia Digital.png" },
      { id: "b2", titulo: "Conhecimento Infinito", tipo: "BASICO", custo: 0, descricao: "GPT pode responder a qualquer pergunta de maneira rapida, mas quanto mais complexa a pergunta, mais tempo ele demora para responder. Ele pode usar esse conhecimento para encontrar uma fraqueza do inimigo ou uma estratégia de combate eficaz.\nPilha: Ataque Básico + Intelecto\nBônus: +1Ss", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/mateus/Conhecimento Infinito.png" },
      { id: "o1", titulo: "Fragmentação de código", tipo: "OFENSIVA", custo: 3, descricao: "Dispara multiplos fragmentos de código causando lentidão. O inimigo fica tão lento que tem dificuldade para se mover e atacar, ficando vulnerável a ataques subsequentes.\nPilha: Ofensiva + Intelecto\nBônus: +2Ss.", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/mateus/Fragmentacao de Codigo.png" },
      { id: "o2", titulo: "Execução Binária", tipo: "OFENSIVA", custo: 2, descricao: "Concentra toda sua capacidade de processamento em um unico ataque devastador, se o inimigo for eliminado ganha +3Ss no próximo turno, mas se o inimigo sobreviver, GPT fica sobrecarregado e perde a próxima ação.\nPilha: Ofensiva + Combate\nBônus: +3Ss, mas se o inimigo sobreviver, GPT perde a próxima ação.", pilhaExtra: ["Combate"], unlocked: true, imagemUrl: "/skills/mateus/Execucao Binaria.png" },
      { id: "t1", titulo: "Análise Preditiva", tipo: "TATICA", custo: 4, descricao: "Revela a próxima ação do inimigo, podendo passar essa informação para as pessoas do grupo. O inimigo fica tão assustado com a previsão que tem dificuldade para agir normalmente, ficando vulnerável a ataques subsequentes.\nPilha: Tática + Intelecto\nBônus: Concede +2Ss em todas as rolagens contra o inimigo por 1d4 turnos.", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/mateus/Analise Preditiva.png" },
      { id: "t2", titulo: "Reconfiguração de Sistema", tipo: "TATICA", custo: 5, descricao: "Troca as iniciativas de todos os personagens e inimigos, bagunçando a ordem natural do combate. O personagem que usar essa habilidade tem a chance de agir novamente imediatamente, mas isso pode causar um curto-circuito no sistema, fazendo com que ele perca a próxima ação.\nPilha: Tática + Intelecto\nBônus: Troca as iniciativas de todos os personagens e inimigos. O usuário pode agir novamente imediatamente, mas perde a próxima ação.", pilhaExtra: ["Intelecto"], unlocked: true, imagemUrl: "/skills/mateus/Reconfiguracao de Sistema.png" }
    ]
  }
};