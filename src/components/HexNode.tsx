interface HexNodeProps {
  label: string;
  value: number;
  onChange?: (val: number) => void;
  isMain?: boolean;
}

export default function HexNode({ label, value, onChange, isMain = false }: HexNodeProps) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <span className="label-text text-[10px] uppercase mb-1">{label}</span>
      
      <div className={`hex-outer ${isMain ? 'hex-main' : ''}`}>
        <div className="hex-inner">
          <input
            type="number"
            className={`hex-input ${!onChange ? 'text-purple-700' : 'text-black'}`}
            value={value || 0}
            onChange={(e) => onChange && onChange(parseInt(e.target.value) || 0)}
            readOnly={!onChange}
          />
        </div>
      </div>
    </div>
  );
}