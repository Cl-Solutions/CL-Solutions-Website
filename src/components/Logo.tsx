interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="CL-Solutions Logo"
        className="h-20 w-auto flex-shrink-0"
      />
      <span className="font-syne font-bold text-xl text-white tracking-tight">
        CL-Solutions
      </span>
    </div>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="6" fill="#111111" />
      <path
        d="M10 10H15V25C15 27.7614 17.2386 30 20 30H10V10Z"
        fill="#00D4FF"
      />
      <path
        d="M20 10H30V15H25V30H20V10Z"
        fill="white"
      />
    </svg>
  );
}
