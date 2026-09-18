export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-12 h-12 border-2',
  };
  const dotMap = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-1.5 h-1.5',
  };

  const ringSize = sizeMap[size] || sizeMap.md;
  const dotSize = dotMap[size] || dotMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Subtle ambient glow */}
      <div className="absolute -inset-1 rounded-full bg-sky-500/10 blur-sm" />
      {/* Background track */}
      <div className={`rounded-full border-slate-200/90 ${ringSize}`} />
      {/* Active spinning arc */}
      <div className={`absolute rounded-full border-transparent border-t-blue-800 border-r-sky-500 animate-spin ${ringSize}`} />
      {/* Subtle center dot */}
      <div className={`absolute rounded-full bg-blue-700 ${dotSize}`} />
    </div>
  );
}

export default function LoadingScreen({ message = 'Memuat data...' }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 select-none">
      <LoadingSpinner size="lg" />
      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase animate-pulse">
        {message}
      </p>
    </div>
  );
}
