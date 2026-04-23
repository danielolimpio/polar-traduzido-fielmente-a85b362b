import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Polar Tensor — Início">
    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
      <span className="font-display text-lg font-bold text-primary-foreground">PT</span>
    </div>
    <span className="font-display text-lg font-semibold tracking-tight">
      Polar <span className="text-primary">Tensor</span>
    </span>
  </Link>
);
