import { Link } from "react-router-dom";
import logo from "@/assets/logo-polar-tensor.webp";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    className={`flex items-center gap-2.5 ${className}`}
    aria-label="Polar Tensor — Página inicial"
    title="Polar Tensor"
  >
    <img
      src={logo}
      alt="Logotipo Polar Tensor"
      width={40}
      height={28}
      className="h-7 w-auto md:h-8"
      loading="eager"
      decoding="async"
    />
    <span className="font-display text-lg font-semibold tracking-tight">
      Polar <span className="text-primary">Tensor</span>
    </span>
  </Link>
);
