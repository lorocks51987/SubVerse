import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span className="tech text-muted-foreground">ERRO 404</span>
        <h1 className="display-lg mt-4 text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          A coordenada que você procurou não existe ou foi arquivada.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="tech border border-foreground px-6 py-3 text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            RETORNAR À BASE →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <span className="tech text-muted-foreground">FALHA NO CICLO</span>
        <h1 className="display-lg mt-4 text-foreground">500</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Ocorreu uma instabilidade no carregamento do conteúdo. Recarregue ou retorne ao início.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="tech border border-foreground bg-foreground px-6 py-3 text-background transition-colors hover:bg-foreground/85"
          >
            TENTAR NOVAMENTE
          </button>
          <Link
            to="/"
            className="tech border border-border px-6 py-3 text-foreground transition-colors hover:border-foreground"
          >
            INÍCIO
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "SUBVERSE — Para os que não se encaixam" },
      {
        name: "description",
        content:
          "SubVerse é um universo brasileiro de streetwear underground. Ciclo, ruptura e transformação sob o símbolo do Ouroboros. Não é sobre o que você veste, é sobre o que você se torna.",
      },
      { name: "author", content: "SUBVERSE" },
      { property: "og:title", content: "SUBVERSE — Para os que não se encaixam" },
      {
        property: "og:description",
        content: "Marca brasileira de streetwear underground. Ciclo, ruptura e transformação sob o símbolo do Ouroboros.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SUBVERSE" },
      { property: "og:image", content: "/ouroboros-official.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SUBVERSE — Para os que não se encaixam" },
      {
        name: "twitter:description",
        content: "Marca brasileira de streetwear underground. Não é sobre o que você veste, é sobre o que você se torna.",
      },
      { name: "twitter:image", content: "/ouroboros-official.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/ouroboros.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/ouroboros.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <div className="grain" aria-hidden="true" />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  return null;
}

function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <motion.div
      key={currentPath}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1"
    >
      {children}
    </motion.div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground selection:bg-foreground selection:text-background">
        <Nav />
        <main className="flex-1 flex flex-col">
          <PageTransitionWrapper>
            <Outlet />
          </PageTransitionWrapper>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
