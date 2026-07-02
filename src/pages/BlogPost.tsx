import { Link, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrentLang, useLocalizedPath } from "@/lib/routes";
import { SITE_URL } from "@/lib/constants";
import { getPostBySlug, getPostTranslation } from "@/lib/blog-posts";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { t, i18n } = useTranslation();
  const lang = useCurrentLang();
  const blogPath = useLocalizedPath("blog");

  const post = getPostBySlug(slug);
  if (!post) return <Navigate to={blogPath} replace />;

  const tr = getPostTranslation(post, lang);
  if (!tr) return <Navigate to={blogPath} replace />;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(i18n.language || lang, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const canonical = `${SITE_URL}${blogPath}/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: tr.title,
    description: tr.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    image: post.cover ? [post.cover] : undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    publisher: {
      "@type": "Organization",
      name: "Polar Tensor",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={`${tr.title} | Polar Tensor`}
        description={tr.excerpt}
        canonical={canonical}
        image={post.cover}
        jsonLd={jsonLd}
      />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute left-1/2 top-0 -z-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative py-14 md:py-16">
          <Link
            to={blogPath}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t("blog.backToBlog")}
          </Link>
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-[10px] uppercase tracking-wide text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight md:text-5xl">
            {tr.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            {post.readingMinutes && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingMinutes} min
              </span>
            )}
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {post.cover && (
        <div className="container -mt-2 md:-mt-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/60">
            <img
              src={post.cover}
              alt={tr.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      )}

      <article className="py-14 md:py-20">
        <div className="container">
          <Card className="mx-auto max-w-3xl bg-gradient-card p-8 md:p-12">
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: tr.content }}
            />
          </Card>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
};

export default BlogPost;
