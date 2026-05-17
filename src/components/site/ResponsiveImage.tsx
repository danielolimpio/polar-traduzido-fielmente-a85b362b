import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface PictureSource {
  sources: { avif?: string; webp?: string };
  img: { src: string; w: number; h: number };
}

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  picture: PictureSource;
  alt: string;
  sizes?: string;
  placeholder?: string;
  eager?: boolean;
  wrapperClassName?: string;
}

/**
 * Renders a <picture> with AVIF + WebP responsive sources and a
 * blurred low-quality placeholder that fades out when the full image loads.
 */
export const ResponsiveImage = ({
  picture,
  alt,
  sizes = "100vw",
  placeholder,
  eager = false,
  className,
  wrapperClassName,
  width,
  height,
  ...rest
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { sources, img } = picture;
  const w = width ?? img.w;
  const h = height ?? img.h;

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
      style={
        placeholder
          ? {
              backgroundImage: `url(${placeholder})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <picture>
        {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
        {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
        <img
          src={img.src}
          alt={alt}
          width={w}
          height={h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          {...rest}
        />
      </picture>
    </span>
  );
};
