import React from 'react';

interface ChamferBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function ChamferBox({ children, className = "" }: ChamferBoxProps) {
  return (
    <div className={`chamfer-outer ${className}`}>
      <div className="chamfer-inner">
        {children}
      </div>
    </div>
  );
}