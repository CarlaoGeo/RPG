// Tipagem das propriedades que o hexágono vai receber
interface HexProps {
  label: string;
  value: string;
}

export default function HexAttribute({ label, value }: HexProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="hex-attr-outer">
        <div className="hex-attr-mid">
          <div className="text-xl font-bold flex items-center justify-center title-font pt-1">
            {value}
          </div>
        </div>
      </div>
      <span className="label-text text-gray-800">{label}</span>
    </div>
  );
}