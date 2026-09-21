export function MiningWheelLoader({ size = 52, className = '' }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Precision Mechanical / Industrial Wheel (Minimalist, No Neon, No AI Slop) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin text-slate-800"
        style={{ animationDuration: '2.2s', animationTimingFunction: 'linear' }}
      >
        {/* Outer Heavy Equipment Tire Tread Lugs (8 clean minimalist lugs) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="46"
            y="2"
            width="8"
            height="9"
            rx="1.5"
            fill="#1e293b"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}

        {/* Outer Tire Body */}
        <circle cx="50" cy="50" r="41" stroke="#1e293b" strokeWidth="6" fill="#0f172a" />
        
        {/* Tire Rim Bead Ring */}
        <circle cx="50" cy="50" r="33" stroke="#334155" strokeWidth="2" fill="#1e293b" />

        {/* Steel Wheel Disc */}
        <circle cx="50" cy="50" r="25" stroke="#475569" strokeWidth="2" fill="#0f172a" />

        {/* 6 Precision Industrial Hub Bolts */}
        {Array.from({ length: 6 }).map((_, i) => {
          const rad = (i * 60 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={50 + 15 * Math.cos(rad)}
              cy={50 + 15 * Math.sin(rad)}
              r="2.2"
              fill="#94a3b8"
            />
          );
        })}

        {/* Center Axle Hub Cap */}
        <circle cx="50" cy="50" r="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="2.5" fill="#94a3b8" />
      </svg>
    </div>
  );
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const pixelMap = {
    sm: 24,
    md: 40,
    lg: 56,
  };
  const px = pixelMap[size] || 40;
  return <MiningWheelLoader size={px} className={className} />;
}

export default function LoadingScreen({ message = 'Memuat data...' }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 select-none">
      <div className="flex flex-col items-center">
        {/* Minimalist Card Container */}
        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-center mb-4">
          <MiningWheelLoader size={38} />
        </div>
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {message}
        </p>
      </div>
    </div>
  );
}

