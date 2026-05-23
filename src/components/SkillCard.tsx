interface SkillCardProps {
  titulo: string;
  tipo: string;
  custo: number | string;
  descricao: string;
  isUnlocked: boolean;
  dicePool?: number; // <-- Nova propriedade para os dados
  imagemUrl?: string;
}

export default function SkillCard({ titulo, tipo, custo, descricao, isUnlocked, dicePool, imagemUrl }: SkillCardProps) {
  if (!isUnlocked) {
    return (
      <div className="mtg-card mtg-locked flex items-center justify-center min-h-75">
        <span className="text-white title-font text-2xl tracking-widest text-center">
          SINAL<br/>BLOQUEADO
        </span>
      </div>
    );
  }

  return (
    <div className="mtg-card min-h-75">
      <div className="mtg-inner">
        {/* Cabeçalho */}
        <div className="mtg-header">
          <span className="mtg-title">{titulo}</span>
          <div className="mtg-cost" title="Custo de Especial">{custo}</div>
        </div>

        {/* Arte */}
        <div className="w-full aspect-video bg-black flex items-center justify-center border-y-2 border-black overflow-hidden">
          {imagemUrl ? (
             <img 
               src={imagemUrl} 
               alt={titulo} 
               // Usamos object-cover aqui. Como o container agora tem o formato 
               // da imagem, ele vai preencher tudo sem cortar quase nada e sem bordas.
               className="w-full h-full object-cover" 
             />
          ) : (
             <span className="text-white text-xs">[ SINAL VISUAL PERDIDO ]</span>
          )}
        </div>

        {/* Linha de Tipo com a Pilha de Dados */}
        <div className="mtg-type-line flex justify-between items-center">
          <span>{tipo}</span>
          {dicePool !== undefined && (
            <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] tracking-wider">
              {dicePool}d6
            </span>
          )}
        </div>

        {/* Caixa de Texto */}
        <div className="mtg-text-box">
          <p className="whitespace-pre-wrap">{descricao}</p>
        </div>
      </div>
    </div>
  );
}