import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, CalendarDays, Clock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { Seo } from "@/components/site/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buildPath,
  useCurrentLang,
  ROUTE_SLUGS,
  useLocalizedPath,
} from "@/lib/routes";
import { SITE_URL, SIGNUP_URL } from "@/lib/constants";
import {
  getPostsSorted,
  getPostTranslation,
  type BlogPost,
} from "@/lib/blog-posts";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const lang = useCurrentLang();
  const blogBase = useLocalizedPath("blog");
  const posts = getPostsSorted();
  const localeCode = i18n.language || lang;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(localeCode, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const postPath = (post: BlogPost) => `${blogBase}/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Polar Tensor Blog",
    url: `${SITE_URL}${blogBase}`,
    inLanguage: lang,
    publisher: {
      "@type": "Organization",
      name: "Polar Tensor",
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
    },
    blogPost: posts.map((p) => {
      const tr = getPostTranslation(p, lang);
      return {
        "@type": "BlogPosting",
        headline: tr?.title,
        datePublished: p.date,
        url: `${SITE_URL}${postPath(p)}`,
      };
    }),
  };

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={t("blog.seoTitle")}
        description={t("blog.seoDesc")}
        routeKey="blog"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <PageHero
        badge={t("blog.heroBadge")}
        title={t("blog.heroTitle")}
        subtitle={t("blog.heroSubtitle")}
        showBack
      />

      <section className="py-16 md:py-20">
        <div className="container">
          {posts.length === 0 ? (
            <Card className="relative mx-auto max-w-3xl overflow-hidden bg-gradient-card p-10 text-center md:p-14">
              <div className="absolute inset-0 bg-gradient-hero opacity-20" />
              <div className="relative">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/30">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h2 className="mx-auto mt-5 max-w-xl font-display text-2xl font-bold md:text-3xl">
                  {t("blog.emptyTitle")}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t("blog.emptyBody")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="hero" size="lg">
                    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                      {t("common.signUpCta")} <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to={buildPath("faq", lang)}>{t("blog.exploreFaq")}</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const tr = getPostTranslation(post, lang);
                if (!tr) return null;
                return (
                  <Link
                    key={post.slug}
                    to={postPath(post)}
                    className="group block h-full"
                  >
                    <Card className="flex h-full flex-col overflow-hidden bg-gradient-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                      {post.cover && (
                        <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                          <img
                            src={post.cover}
                            alt={tr.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(post.date)}
                          </span>
                          {post.readingMinutes && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {post.readingMinutes} min
                            </span>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag) => (
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
                        <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                          {tr.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {tr.excerpt}
                        </p>
                        <div className="mt-auto pt-5">
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                            {t("blog.readMore")}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/30 py-20">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card p-10 text-center md:p-14">
            <div className="absolute inset-0 bg-gradient-hero opacity-30" />
            <div className="relative">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold md:text-4xl">
                {t("blog.ctaTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                {t("blog.ctaSubtitle")}
              </p>
              <Button asChild variant="hero" size="lg" className="mt-8">
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  {t("common.signUpCta")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Blog;
