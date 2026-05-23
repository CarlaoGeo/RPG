import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HexNode from './components/HexNode';
import ChamferBox from './components/ChamferBox';
import SkillCard from './components/SkillCard';




// IMPORTAMOS TUDO DO DADOS JOGADORES (Dados e Tipos)
import { FICHAS_BASE, CharacterSheet, SkillData } from './dadosJogadores';

// --- FUNÇÃO AUXILIAR PARA LOCALSTORAGE ---
function getStored<T>(key: string, defaultValue: T): T {
  try { 
    const item = localStorage.getItem(key); 
    return item ? JSON.parse(item) : defaultValue; 
  } catch { 
    return defaultValue; 
  }
}

// --- FUNÇÃO PARA VERIFICAR REQUISITOS DA CARTA ---
const verificarRequisito = (skill: SkillData, estadoAtual: {
  mana: number;
  sanidade: number;
  stressAtual: number;
  alma: any;
  corpo: any;
  mente: any;
}): boolean => {
  if (!skill.requisito) return true;
  
  const requisitos = skill.requisito.split('&&').map(r => r.trim());
  
  for (const req of requisitos) {
    const [tipo, valor] = req.split('>=');
    if (!valor) return false;
    
    const valorNum = parseInt(valor);
    
    switch(tipo) {
      case 'mana': if (estadoAtual.mana < valorNum) return false; break;
      case 'sanidade': if (estadoAtual.sanidade < valorNum) return false; break;
      case 'stress': if (estadoAtual.stressAtual < valorNum) return false; break;
      case 'nivelAlma': if (estadoAtual.alma.principal < valorNum) return false; break;
      case 'nivelCorpo': if (estadoAtual.corpo.principal < valorNum) return false; break;
      case 'nivelMente': if (estadoAtual.mente.principal < valorNum) return false; break;
      default: return false;
    }
  }
  return true;
};

// --- TELA DE SELEÇÃO ISOLADA ---
function TelaSelecao() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-green-500">
      <div className="border-2 border-green-500 p-8 max-w-xl w-full bg-gray-900 shadow-[0_0_20px_rgba(0,255,0,0.3)] text-center">
        <h1 className="text-3xl title-font uppercase mb-6 tracking-widest border-b border-green-500 pb-4">Acesso ao Sistema</h1>
        <p className="mb-6 font-mono text-xs text-gray-400">NENHUM PARÂMETRO VÁLIDO ENCONTRADO NA URL. SELECIONE SEU TERMINAL:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(FICHAS_BASE).map((key) => (
            <button 
              key={key}
              onClick={() => navigate(`/${key}`)}
              className="bg-green-600 text-black font-bold title-font text-xl py-2 px-2 uppercase hover:bg-green-400 transition-colors cursor-pointer"
            >
              {FICHAS_BASE[key].playerName} ({FICHAS_BASE[key].charName})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const { playerId } = useParams<{ playerId: string }>();
  const idChave = playerId?.toLowerCase() || '';
  const fichaPadrao = FICHAS_BASE[idChave];

  if (!fichaPadrao) {
    return <TelaSelecao />;
  }

  return <FichaJogador key={idChave} idChave={idChave} fichaPadrao={fichaPadrao} />;
}

// --- FICHA DO JOGADOR ---
function FichaJogador({ idChave, fichaPadrao }: { idChave: string, fichaPadrao: CharacterSheet }) {
  const navigate = useNavigate();

  // --- ESTADOS DO PERSONAGEM ---
  const [charName] = useState<string>(fichaPadrao.charName);
  const [playerName] = useState<string>(fichaPadrao.playerName);
  const [imagemAvatar, setImagemAvatar] = useState<string | null>(() => getStored(`pow_${idChave}_avatar`, null));
  
  const [alma, setAlma] = useState(() => getStored(`pow_${idChave}_alma`, fichaPadrao.alma));
  const [corpo, setCorpo] = useState(() => getStored(`pow_${idChave}_corpo`, fichaPadrao.corpo));
  const [mente, setMente] = useState(() => getStored(`pow_${idChave}_mente`, fichaPadrao.mente));
  
  const [armadura, setArmadura] = useState<number>(() => getStored(`pow_${idChave}_armadura`, fichaPadrao.armadura));
  const [escudo, setEscudo] = useState<number>(() => getStored(`pow_${idChave}_escudo`, fichaPadrao.escudo));
  const [mana, setMana] = useState<number>(() => getStored(`pow_${idChave}_mana`, fichaPadrao.mana));
  const [sanidade, setSanidade] = useState<number>(() => getStored(`pow_${idChave}_sanidade`, fichaPadrao.sanidade));
  const [stressAtual, setStressAtual] = useState<number>(() => getStored(`pow_${idChave}_stress`, 0));
  const [deckHabilidades] = useState<SkillData[]>(fichaPadrao.skills);
  const [modoMestre, setModoMestre] = useState<boolean>(() => getStored(`pow_${idChave}_modo_mestre`, false));

  // Efeitos visuais locais
  const [takingDamage, setTakingDamage] = useState(false);
  const lastStress = useRef(stressAtual);

  // Minijogo Astrolábio
  const [minigameAtivo, setMinigameAtivo] = useState<string | null>(null);
  const [controle1, setControle1] = useState(90);
  const [controle2, setControle2] = useState(180);
  const [controle3, setControle3] = useState(270);
  const [erroAoTentar, setErroAoTentar] = useState(false);
  
  const astrolabioRef = useRef<HTMLDivElement>(null);
  const [draggingRing, setDraggingRing] = useState<number | null>(null);
  const [lastAngle, setLastAngle] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<'FICHA' | 'HABILIDADES' | 'STATUS'>('FICHA');
  const [openDropdown, setOpenDropdown] = useState<'BASICO' | 'OFENSIVA' | 'TATICA' | null>('BASICO');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cartasReveladas, setCartasReveladas] = useState<Record<string, boolean>>(
    () => getStored(`pow_${idChave}_cartas_reveladas`, {})
  );

  // --- SINCRONIZAÇÃO COM LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem(`pow_${idChave}_avatar`, JSON.stringify(imagemAvatar));
    localStorage.setItem(`pow_${idChave}_alma`, JSON.stringify(alma));
    localStorage.setItem(`pow_${idChave}_corpo`, JSON.stringify(corpo));
    localStorage.setItem(`pow_${idChave}_mente`, JSON.stringify(mente));
    localStorage.setItem(`pow_${idChave}_armadura`, JSON.stringify(armadura));
    localStorage.setItem(`pow_${idChave}_escudo`, JSON.stringify(escudo));
    localStorage.setItem(`pow_${idChave}_mana`, JSON.stringify(mana));
    localStorage.setItem(`pow_${idChave}_sanidade`, JSON.stringify(sanidade));
    localStorage.setItem(`pow_${idChave}_modo_mestre`, JSON.stringify(modoMestre));
    
    if (stressAtual > lastStress.current) {
      setTakingDamage(true);
      setTimeout(() => setTakingDamage(false), 500);
      try { if ("vibrate" in navigator) navigator.vibrate([200, 100]); } catch(e) {}
    }
    lastStress.current = stressAtual;
    localStorage.setItem(`pow_${idChave}_stress`, JSON.stringify(stressAtual));
  }, [idChave, imagemAvatar, alma, corpo, mente, armadura, escudo, mana, sanidade, stressAtual, modoMestre]);

  useEffect(() => {
    localStorage.setItem(
      `pow_${idChave}_cartas_reveladas`,
      JSON.stringify(cartasReveladas)
    );
  }, [cartasReveladas, idChave]);
  
  const revelarCarta = (id: string) => {
    setCartasReveladas(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const desbloquearTodasCartas = (tipo: string) => {
    const cartasDoTipo = deckHabilidades.filter(s => s.tipo === tipo);
    const novasReveladas = { ...cartasReveladas };
    cartasDoTipo.forEach(skill => {
      if (!novasReveladas[skill.id]) {
        novasReveladas[skill.id] = true;
      }
    });
    setCartasReveladas(novasReveladas);
  };

  const resetarCartas = () => {
    setCartasReveladas({});
  };

  // --- CÁLCULOS DO SISTEMA ---
  const iniciativaBase = corpo.principal + corpo.coordenacao + alma.vontade;
  const defFisica = 1 + corpo.coordenacao + alma.vontade + armadura + escudo;
  const defMental = 1 + mente.foco + alma.vontade;
  const resFisica = 1 + corpo.estamina;
  const resMental = 1 + mente.foco;
  const stressBase = corpo.estamina + mente.foco;

  const maxBoasCondicoes = stressBase + 5;
  const maxMachucados = stressBase + 3;
  const maxFerimentos = 4;
  const maxCambaleante = 3;
  const maxExaustao = 2;
  const poolBasico = corpo.principal + corpo.combate + alma.sorte;
  const poolOfensiva = corpo.principal + corpo.combate + alma.sorte + alma.arcana;
  const poolTatica = mente.principal + mente.foco + alma.sorte + alma.arcana;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400; 
        let width = img.width; let height = img.height;
        if (width > height && width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } 
        else if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d'); ctx?.drawImage(img, 0, 0, width, height);
        setImagemAvatar(canvas.toDataURL('image/jpeg', 0.7)); 
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubAttrChange = (categoria: 'alma' | 'corpo' | 'mente', campo: string, novoValor: number) => {
    if (novoValor < 0) return;

    if (categoria === 'alma') {
      const key = campo as keyof typeof alma;
      if (key === 'principal') {
        if (novoValor >= alma.arcana + alma.sorte + alma.vontade) setAlma({ ...alma, principal: novoValor });
      } else {
        if (alma.arcana + alma.sorte + alma.vontade - alma[key] + novoValor <= alma.principal) setAlma({ ...alma, [key]: novoValor });
      }
    } else if (categoria === 'corpo') {
      const key = campo as keyof typeof corpo;
      if (key === 'principal') {
        if (novoValor >= corpo.combate + corpo.coordenacao + corpo.estamina) setCorpo({ ...corpo, principal: novoValor });
      } else {
        if (corpo.combate + corpo.coordenacao + corpo.estamina - corpo[key] + novoValor <= corpo.principal) setCorpo({ ...corpo, [key]: novoValor });
      }
    } else if (categoria === 'mente') {
      const key = campo as keyof typeof mente;
      if (key === 'principal') {
        if (novoValor >= mente.carisma + mente.foco + mente.intelecto) setMente({ ...mente, principal: novoValor });
      } else {
        if (mente.carisma + mente.foco + mente.intelecto - mente[key] + novoValor <= mente.principal) setMente({ ...mente, [key]: novoValor });
      }
    }
  };

  const getValorAtributo = (nomeAtributo: string): number => {
    const mapa: Record<string, number> = {
      arcana:      alma.arcana,
      sorte:       alma.sorte,
      vontade:     alma.vontade,
      combate:     corpo.combate,
      coordenacao: corpo.coordenacao,
      coordenação: corpo.coordenacao,
      estamina:    corpo.estamina,
      carisma:     mente.carisma,
      foco:        mente.foco,
      intelecto:   mente.intelecto,
    };
    return mapa[nomeAtributo.toLowerCase()] ?? 0;
  };

  const renderCartas = (tipoAlvo: string, dicePoolAtual: number) => {
    const filtradas = deckHabilidades.filter(s => s.tipo === tipoAlvo);
    if (filtradas.length === 0) {
      return <span className="text-gray-400 font-bold tracking-widest uppercase">Sem habilidades adicionadas</span>;
    }
    
    return filtradas.map(skill => {
      const extraValor = skill.pilhaExtra
        ? skill.pilhaExtra.reduce(
            (total, attr) => total + getValorAtributo(attr),
            0
          )
        : 0;
      const dicePoolFinal = dicePoolAtual + extraValor;
      
      const estaDesbloqueada = cartasReveladas[skill.id] || skill.unlocked;
      
      const requisitoAtendido = verificarRequisito(skill, {
        mana,
        sanidade,
        stressAtual,
        alma,
        corpo,
        mente
      });
      
      const podeDesbloquearAgora = !estaDesbloqueada && requisitoAtendido && modoMestre;
      
      return (
        <div key={skill.id} className="relative">
          {!estaDesbloqueada && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg border-2 border-red-600">
              <span className="text-red-500 font-bold text-xs uppercase mb-2">🔒 BLOQUEADA</span>
              {skill.requisito && (
                <span className="text-yellow-400 text-[10px] font-mono text-center px-2">
                  Requisito: {skill.requisito.replace(/>=/g, ' ≥ ')}
                </span>
              )}
              {podeDesbloquearAgora && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    revelarCarta(skill.id);
                  }}
                  className="mt-2 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-500 transition-colors"
                >
                  DESBLOQUEAR
                </button>
              )}
            </div>
          )}
          
          <div className={!estaDesbloqueada ? 'opacity-50' : ''}>
            <SkillCard
              key={skill.id}
              titulo={skill.titulo}
              tipo={`Skill ${skill.tipo}`}
              custo={skill.custo}
              descricao={skill.descricao}
              dicePool={dicePoolFinal}
              isUnlocked={estaDesbloqueada}
              imagemUrl={skill.imagemUrl}
            />
          </div>
        </div>
      );
    });
  };

  const renderStressHexes = (totalVisual: number, limiteDaCategoria: number, danoAcumuladoAnterior: number) => {
    let hexes = [];
    let countAtivos = 0;
    
    for (let i = 0; i < totalVisual; i++) {
      const isHexagonoAtivo = i < limiteDaCategoria;
      const valorDesteHex = danoAcumuladoAnterior + countAtivos + 1;
      const isDamaged = isHexagonoAtivo && (danoAcumuladoAnterior + countAtivos < stressAtual);
      
      if (isHexagonoAtivo) countAtivos++;

      const handleClick = () => {
        if (!isHexagonoAtivo) return;
        if (stressAtual === valorDesteHex) {
          setStressAtual(valorDesteHex - 1);
        } else {
          setStressAtual(valorDesteHex);
        }
      };

      hexes.push(
        <div 
          key={i} 
          onClick={handleClick}
          className={`hex-small-outer scale-[0.85] -ml-1 transition-transform ${!isHexagonoAtivo ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:scale-95'}`}
        >
          <div 
            className="hex-small-inner transition-colors duration-300" 
            style={{ backgroundColor: isDamaged ? '#dc2626' : '#ffffff' }}
          ></div>
        </div>
      );
    }
    return hexes;
  };

  const renderManaTracker = () => {
    let hexes = [];
    for (let i = 1; i <= 30; i++) {
      const isActive = i <= mana;
      hexes.push(
        <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setMana(i)}>
          <div className={`hex-small-outer mb-1 transition-colors ${isActive ? 'mana-active bg-blue-600' : 'bg-black'}`}>
            <div className={`hex-small-inner relative flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-white text-black'}`}>
              <span className={`relative z-10 title-font font-bold`}>{i}</span>
            </div>
          </div>
          {i === 10 && <span className="text-[9px] font-bold mb-2 label-text text-center leading-tight">ULTIMATE</span>}
          {i === 20 && <span className="text-[9px] font-bold mb-2 label-text text-center leading-tight">MEGA<br/>ULT.</span>}
          {i === 30 && <span className="text-[9px] font-bold label-text text-center leading-tight text-red-600">SUPER HIPER<br/>MEGA ULT.</span>}
        </div>
      );
    }
    return hexes;
  };

  const renderSanidadeTracker = () => {
    let boxes = [];
    for (let i = 1; i <= 100; i++) {
      const isActive = i <= sanidade;
      boxes.push(
        <div key={i} onClick={() => setSanidade(i)} className={`w-6 h-6 md:w-8 md:h-8 border-2 flex items-center justify-center cursor-pointer text-[9px] md:text-[11px] font-bold transition-all ${isActive ? 'bg-purple-700 border-purple-900 text-white' : 'bg-white border-gray-300 text-gray-300 hover:bg-purple-100'}`}>
          {i}
        </div>
      );
    }
    return boxes;
  };

  // --- TELA DO ASTROLÁBIO ---
  if (minigameAtivo === 'astrolabio') {
    const visualExterno = (controle1 * 2 + controle2) % 360;
    const visualMedio = (controle2 * 2 + controle3) % 360;
    const visualInterno = (controle3 * 2 + controle1) % 360;

    const taNoCentro = (graus: number) => graus <= 10 || graus >= 350;
    const isResolvido = taNoCentro(visualExterno) && taNoCentro(visualMedio) && taNoCentro(visualInterno);

    const handlePointerDown = (e: React.PointerEvent, ringId: number) => {
      if (erroAoTentar || !astrolabioRef.current) return;
      const rect = astrolabioRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      setDraggingRing(ringId); setLastAngle(angle);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (draggingRing === null || !astrolabioRef.current) return;
      const rect = astrolabioRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      
      let delta = currentAngle - lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      if (draggingRing === 1) setControle1(prev => (prev + delta / 2 + 360) % 360);
      if (draggingRing === 2) setControle2(prev => (prev + delta / 2 + 360) % 360);
      if (draggingRing === 3) setControle3(prev => (prev + delta / 2 + 360) % 360);

      setLastAngle(currentAngle);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      setDraggingRing(null);
      try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch(err) {}
    };

    const tentarAlinhamento = () => {
      if (isResolvido) {
        alert("Sincronização do Astrolábio Concluída!");
        setMinigameAtivo(null);
        setControle1(90); setControle2(180); setControle3(270);
      } else {
        setErroAoTentar(true);
        try { if ("vibrate" in navigator) navigator.vibrate([100, 50, 100, 50, 300]); } catch(e) {}
        setTimeout(() => setErroAoTentar(false), 800);
      }
    };

    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans border-8 transition-colors duration-200 relative overflow-hidden ${erroAoTentar ? 'bg-red-900 border-red-500' : 'bg-black border-yellow-700'}`}>
        <h1 className="text-3xl text-yellow-500 title-font text-center mb-2 tracking-widest z-10">{erroAoTentar ? 'FALHA DE VALIDAÇÃO!' : 'ASTROLÁBIO DE CARCOSA'}</h1>
        <p className={`${erroAoTentar ? 'text-white' : 'text-green-400'} text-center mb-8 font-mono text-xs z-10 max-w-sm`}>
          GIRA OS ANÉIS PARA ALINHAR AO MARCADOR SUPERIOR VERDE.
        </p>

        <div ref={astrolabioRef} className={`relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-10 transition-transform ${erroAoTentar ? 'scale-95 blur-sm' : 'scale-100'}`}>
          <div className="absolute top-0 w-2 h-8 bg-green-500 z-20 shadow-[0_0_10px_#00ff00]"></div>

          <div onPointerDown={(e) => { e.stopPropagation(); handlePointerDown(e, 1); }} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
            className="absolute w-full h-full border-4 border-dashed border-purple-600 rounded-full cursor-grab active:cursor-grabbing" 
            style={{ transform: `rotate(${visualExterno}deg)`, touchAction: 'none' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"></div>
          </div>
          
          <div onPointerDown={(e) => { e.stopPropagation(); handlePointerDown(e, 2); }} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
            className="absolute w-3/4 h-3/4 border-4 border-double border-gray-400 rounded-full cursor-grab active:cursor-grabbing" 
            style={{ transform: `rotate(${visualMedio}deg)`, touchAction: 'none' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-sm shadow-[0_0_10px_#fff]"></div>
          </div>
          
          <div onPointerDown={(e) => { e.stopPropagation(); handlePointerDown(e, 3); }} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
            className="absolute w-1/2 h-1/2 border-4 border-solid border-yellow-600 rounded-full cursor-grab active:cursor-grabbing" 
            style={{ transform: `rotate(${visualInterno}deg)`, touchAction: 'none' }}>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-yellow-500 shadow-[0_0_10px_#eab308]"></div>
          </div>

          <div className="absolute w-12 h-12 bg-black border-2 border-yellow-700 rounded-full pointer-events-none"></div>
        </div>

        <button onClick={tentarAlinhamento} disabled={erroAoTentar} className="w-full max-w-sm p-4 font-bold font-mono text-lg tracking-widest uppercase bg-green-600 text-black shadow-[0_0_15px_#00ff0055]">
          Validar Frequência
        </button>
      </div>
    );
  }

  // --- INTERFACE PRINCIPAL ---
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center p-2 md:p-8 font-sans relative">
      
      {takingDamage && (
        <div className="fixed inset-0 bg-red-600 opacity-60 pointer-events-none z-50 animate-pulse transition-opacity duration-75 mix-blend-multiply"></div>
      )}

      {/* Cabeçalho de Navegação */}
      <div className="max-w-6xl w-full flex flex-wrap md:flex-nowrap gap-2 md:gap-4 mb-4 relative z-10">
        <button onClick={() => setActiveTab('FICHA')} className={`flex-1 py-2 md:py-3 text-sm md:text-xl title-font uppercase tracking-widest border-4 border-black transition-colors ${activeTab === 'FICHA' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}>Diagnóstico</button>
        <button onClick={() => setActiveTab('HABILIDADES')} className={`flex-1 py-2 md:py-3 text-sm md:text-xl title-font uppercase tracking-widest border-4 border-black transition-colors ${activeTab === 'HABILIDADES' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}>Arsenal</button>
        <button onClick={() => setActiveTab('STATUS')} className={`flex-1 py-2 md:py-3 text-sm md:text-xl title-font uppercase tracking-widest border-4 border-black transition-colors ${activeTab === 'STATUS' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}>Status</button>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-800 text-white font-bold border-4 border-black hover:bg-gray-700 text-xs uppercase font-mono">Trocar Terminal</button>
      </div>

      <div className="flex gap-4 max-w-6xl w-full relative z-10">
        <div className="flex-1 bg-white border-4 md:border-[6px] border-black p-4 md:p-6 shadow-2xl flex flex-col gap-6 w-full overflow-hidden">
          
          {activeTab === 'FICHA' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <ChamferBox className="w-full md:w-48 h-56 cursor-pointer group shrink-0">
                  <div className="w-full h-full flex justify-center items-center bg-gray-100" onClick={() => fileInputRef.current?.click()}>
                    {imagemAvatar ? <img src={imagemAvatar} alt="Avatar" className="w-full h-full object-cover" /> : <span className="label-text text-gray-400 text-center px-4 group-hover:text-black">MUDAR AVATAR</span>}
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  </div>
                </ChamferBox>
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <ChamferBox><div className="flex px-4 py-2 bg-white"><span className="label-text w-24 md:w-28 mr-2">CODENOME</span><input type="text" className="flex-1 outline-none font-bold uppercase min-w-0 text-purple-700" value={charName} readOnly /></div></ChamferBox>
                  <ChamferBox><div className="flex px-4 py-2 bg-white"><span className="label-text w-24 md:w-28 mr-2">OPERADOR</span><input type="text" className="flex-1 outline-none font-bold uppercase min-w-0" value={playerName} readOnly /></div></ChamferBox>
                  <div className="flex gap-4 mt-2">
                    <ChamferBox className="flex-1">
                      <div className="flex px-4 py-2 bg-gray-200 justify-between items-center h-full">
                        <span className="label-text text-xs">INICIATIVA BASE (Corpo + Coord. + Vontade)</span>
                        <span className="font-bold text-3xl title-font text-black">{iniciativaBase}</span>
                      </div>
                    </ChamferBox>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex flex-col gap-6 w-full xl:w-95 overflow-x-auto pb-2">
                  <div className="relative flex items-center gap-2 md:gap-6 min-w-max">
                    <div className="absolute h-1 bg-black top-1/2 left-8 right-12 z-0"></div>
                    <HexNode isMain label="ALMA" value={alma.principal} onChange={(v) => handleSubAttrChange('alma', 'principal', v)} />
                    <HexNode label="ARCANA" value={alma.arcana} onChange={(v) => handleSubAttrChange('alma', 'arcana', v)} />
                    <HexNode label="SORTE" value={alma.sorte} onChange={(v) => handleSubAttrChange('alma', 'sorte', v)} />
                    <HexNode label="VONTADE" value={alma.vontade} onChange={(v) => handleSubAttrChange('alma', 'vontade', v)} />
                  </div>
                  <div className="relative flex items-center gap-2 md:gap-6 min-w-max">
                    <div className="absolute h-1 bg-black top-1/2 left-8 right-12 z-0"></div>
                    <HexNode isMain label="CORPO" value={corpo.principal} onChange={(v) => handleSubAttrChange('corpo', 'principal', v)} />
                    <HexNode label="COMBATE" value={corpo.combate} onChange={(v) => handleSubAttrChange('corpo', 'combate', v)} />
                    <HexNode label="COORD." value={corpo.coordenacao} onChange={(v) => handleSubAttrChange('corpo', 'coordenacao', v)} />
                    <HexNode label="ESTAMINA" value={corpo.estamina} onChange={(v) => handleSubAttrChange('corpo', 'estamina', v)} />
                  </div>
                  <div className="relative flex items-center gap-2 md:gap-6 min-w-max">
                    <div className="absolute h-1 bg-black top-1/2 left-8 right-12 z-0"></div>
                    <HexNode isMain label="MENTE" value={mente.principal} onChange={(v) => handleSubAttrChange('mente', 'principal', v)} />
                    <HexNode label="CARISMA" value={mente.carisma} onChange={(v) => handleSubAttrChange('mente', 'carisma', v)} />
                    <HexNode label="FOCO" value={mente.foco} onChange={(v) => handleSubAttrChange('mente', 'foco', v)} />
                    <HexNode label="INTELECTO" value={mente.intelecto} onChange={(v) => handleSubAttrChange('mente', 'intelecto', v)} />
                  </div>
                </div>

                <ChamferBox className="w-full xl:w-56 shrink-0">
                  <div className="bg-white p-4 flex flex-col items-center h-full">
                    <span className="label-text text-lg mb-2">DEFESA</span>
                    <div className="flex gap-6 mb-6">
                      <HexNode label="FÍSICA" value={defFisica} />
                      <HexNode label="MENTAL" value={defMental} />
                    </div>
                    <span className="label-text text-lg mb-2">RESISTÊNCIA</span>
                    <div className="flex gap-6">
                      <HexNode label="FÍSICA" value={resFisica} />
                      <HexNode label="MENTAL" value={resMental} />
                    </div>
                    <span className="label-text text-lg mb-2">PROTEÇÃO</span>
                    <div className="flex gap-6">
                      <HexNode label="ARMADURA" value={armadura} onChange={setArmadura} />
                      <HexNode label="ESCUDO" value={escudo} onChange={setEscudo} />
                    </div>
                  </div>
                </ChamferBox>

                <ChamferBox className="w-full xl:w-72 shrink-0">
                  <div className="bg-white p-4 flex flex-col items-center h-full">
                    <span className="label-text text-lg mb-3 text-center">CÁLCULOS DE ATAQUE</span>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="bg-gray-200 p-2 rounded-md text-center">
                        <span className="font-bold text-xs uppercase tracking-wider block text-gray-700">Ataque Básico</span>
                        <span className="font-mono text-sm font-bold">{corpo.principal} + {corpo.combate} + {alma.sorte}</span>
                        <span className="text-xs text-gray-600 block mt-1">(Corpo + Combate + Sorte)</span>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-md text-center">
                        <span className="font-bold text-xs uppercase tracking-wider block text-red-700">Skill Ofensiva</span>
                        <span className="font-mono text-sm font-bold">{corpo.principal} + {corpo.combate} + {alma.sorte} + {alma.arcana}</span>
                        <span className="text-xs text-gray-600 block mt-1">(Corpo + Combate + Sorte + Arcana)</span>
                      </div>
                      <div className="bg-gray-200 p-2 rounded-md text-center">
                        <span className="font-bold text-xs uppercase tracking-wider block text-blue-700">Skill Tática</span>
                        <span className="font-mono text-sm font-bold">{mente.principal} + {mente.foco} + {alma.sorte}</span>
                        <span className="text-xs text-gray-600 block mt-1">(Mente + Foco + Sorte)</span>
                      </div>
                    </div>
                  </div>
                </ChamferBox>
              </div>

              <ChamferBox className="w-full">
                <div className="bg-white p-4 md:p-6 flex flex-col items-center">
                  <span className="label-text text-xl mb-6">STRESS</span>

                  <div className="w-full mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-text">EM BOAS CONDIÇÕES</span>
                      <span className="text-xs text-gray-500">Sem penalidade</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderStressHexes(maxBoasCondicoes, maxBoasCondicoes, 0)}
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-text">MACHUCADOS</span>
                      <span className="text-xs text-orange-600">-1 Sucesso</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderStressHexes(maxMachucados, maxMachucados, maxBoasCondicoes)}
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-text text-red-600">FERIMENTOS</span>
                      <span className="text-xs text-red-600">-2 Sucessos</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderStressHexes(maxFerimentos, maxFerimentos, maxBoasCondicoes + maxMachucados)}
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-text text-red-700">CAMBALEANTE</span>
                      <span className="text-xs text-red-700">-3 Sucessos</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderStressHexes(maxCambaleante, maxCambaleante, maxBoasCondicoes + maxMachucados + maxFerimentos)}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-text text-black">EXAUSTÃO</span>
                      <span className="text-xs text-black">-4 Sucessos</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderStressHexes(maxExaustao, maxExaustao, maxBoasCondicoes + maxMachucados + maxFerimentos + maxCambaleante)}
                    </div>
                  </div>
                </div>
              </ChamferBox>
            </div>
          )}

          {activeTab === 'HABILIDADES' && (
            <div className="flex flex-col gap-4">
              {/* Painel do Mestre */}
              <div className="border-2 border-gray-400 p-3 mb-2 bg-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase font-bold text-gray-600">🔧 CONTROLE DO MESTRE</span>
                  <button
                    onClick={() => setModoMestre(!modoMestre)}
                    className={`text-xs px-3 py-1 rounded font-bold ${modoMestre ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'}`}
                  >
                    {modoMestre ? 'SAIR DO MODO MESTRE' : 'ATIVAR MODO MESTRE'}
                  </button>
                </div>
                
                {modoMestre && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => desbloquearTodasCartas('BASICO')}
                      className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-800"
                    >
                      Desbloquear TODAS Básicas
                    </button>
                    <button
                      onClick={() => desbloquearTodasCartas('OFENSIVA')}
                      className="bg-red-800 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
                    >
                      Desbloquear TODAS Ofensivas
                    </button>
                    <button
                      onClick={() => desbloquearTodasCartas('TATICA')}
                      className="bg-blue-800 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Desbloquear TODAS Táticas
                    </button>
                    <button
                      onClick={resetarCartas}
                      className="bg-yellow-600 text-black text-xs px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Resetar TODAS Cartas
                    </button>
                  </div>
                )}
              </div>
              
              {/* Ataques Básicos */}
              <div className="border-4 border-black">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'BASICO' ? null : 'BASICO')} 
                  className="w-full bg-black text-white p-4 text-left title-font text-2xl uppercase tracking-widest flex justify-between items-center"
                >
                  <span>Ataques Básicos</span>
                  <span className="text-sm">
                    {deckHabilidades.filter(s => s.tipo === 'BASICO' && (cartasReveladas[s.id] || s.unlocked)).length}/
                    {deckHabilidades.filter(s => s.tipo === 'BASICO').length} desbloqueadas
                  </span>
                </button>
                {openDropdown === 'BASICO' && ( 
                  <div className="p-6 bg-gray-100 flex flex-wrap gap-6 justify-center">
                    {renderCartas('BASICO', poolBasico)}
                  </div>
                )}
              </div>
              
              {/* Skills Ofensivas */}
              <div className="border-4 border-black">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'OFENSIVA' ? null : 'OFENSIVA')} 
                  className="w-full bg-red-900 text-white p-4 text-left title-font text-2xl uppercase tracking-widest flex justify-between items-center hover:bg-red-800 transition-colors"
                >
                  <span>Skills Ofensivas</span>
                  <span className="text-sm">
                    {deckHabilidades.filter(s => s.tipo === 'OFENSIVA' && (cartasReveladas[s.id] || s.unlocked)).length}/
                    {deckHabilidades.filter(s => s.tipo === 'OFENSIVA').length} desbloqueadas
                  </span>
                </button>
                {openDropdown === 'OFENSIVA' && ( 
                  <div className="p-6 bg-gray-100 flex flex-wrap gap-6 justify-center">
                    {renderCartas('OFENSIVA', poolOfensiva)}
                  </div>
                )}
              </div>
              
              {/* Skills Táticas */}
              <div className="border-4 border-black">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'TATICA' ? null : 'TATICA')} 
                  className="w-full bg-blue-900 text-white p-4 text-left title-font text-2xl uppercase tracking-widest flex justify-between items-center hover:bg-blue-800 transition-colors"
                >
                  <span>Skills Táticas</span>
                  <span className="text-sm">
                    {deckHabilidades.filter(s => s.tipo === 'TATICA' && (cartasReveladas[s.id] || s.unlocked)).length}/
                    {deckHabilidades.filter(s => s.tipo === 'TATICA').length} desbloqueadas
                  </span>
                </button>
                {openDropdown === 'TATICA' && ( 
                  <div className="p-6 bg-gray-100 flex flex-wrap gap-6 justify-center">
                    {renderCartas('TATICA', poolTatica)}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'STATUS' && (
            <div className="flex flex-col gap-8">
              <ChamferBox className="w-full">
                <div className="bg-white p-4 md:p-8 flex flex-col items-center">
                  <div className="text-center bg-blue-600 text-white label-text py-2 px-8 mb-6 rounded-full text-xl">MANA / POWER-UP</div>
                  <div className="flex flex-wrap gap-2 md:gap-4 justify-center max-w-4xl">
                    {renderManaTracker()}
                  </div>
                </div>
              </ChamferBox>
              <ChamferBox className="w-full">
                <div className="bg-white p-4 md:p-8 flex flex-col items-center">
                  <div className="text-center bg-purple-700 text-white label-text py-2 px-8 mb-6 rounded-full text-xl">PONTOS DE SANIDADE</div>
                  <div className="flex flex-wrap gap-1 justify-center max-w-4xl">
                    {renderSanidadeTracker()}
                  </div>
                </div>
              </ChamferBox>
              <ChamferBox className="w-full">
                <div className="bg-white p-4 flex flex-col items-center">
                  <div className="text-center bg-yellow-600 text-black label-text py-2 px-6 mb-4 rounded-full text-md uppercase font-bold">Ações do Mestre</div>
                  <button 
                    onClick={() => setMinigameAtivo('astrolabio')}
                    className="bg-black text-yellow-500 border-2 border-yellow-600 font-mono text-sm py-3 px-6 hover:bg-yellow-950 transition-colors"
                  >
                    Ativar Minijogo: Astrolábio de Carcosa
                  </button>
                </div>
              </ChamferBox>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}