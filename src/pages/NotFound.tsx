import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/components/site/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Sinaliza ao Google que esta é uma página 404 (soft 404 prevention)
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }

    return () => {
      const r = document.querySelector('meta[name="robots"]');
      if (r) r.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    };
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="Página não encontrada (404) | Polar Tensor"
        description="A página que você procura não existe ou foi movida. Volte para a página inicial da Polar Tensor."
        canonical="https://polartensor.trade/"
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Voltar para o início
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
