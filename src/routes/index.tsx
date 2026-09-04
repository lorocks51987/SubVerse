import { Logo } from "@/components/Logo";
import { Ouroboros } from "@/components/Ouroboros";
import DecryptedText from "@/components/reactbits/DecryptedText";
import FoldText from "@/components/reactbits/FoldText";
import { GlitchDecryptText } from "@/components/reactbits/GlitchDecryptText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import TextType from "@/components/reactbits/TextType";
import {
    ClipReveal,
    FadeIn,
    LineReveal
} from "@/components/site/Reveal";
import { activeDrop } from "@/data/drops";
import { AsciiProgress } from "@/components/site/AsciiProgress";
import { SizeGuideModal } from "@/components/site/SizeGuideModal";
import { ProductDropShowcase } from "@/components/site/ProductDropShowcase";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
    motion,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";


export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "SUBVERSE — Para os que não se encaixam" },
            {
                name: "description",
                content:
                    "SubVerse é um universo underground brasileiro de streetwear. Não é sobre o que você veste, é sobre o que você se torna.",
            },
            { property: "og:title", content: "SUBVERSE — Para os que não se encaixam" },
            {
                property: "og:description",
                content:
                    "Marca brasileira de streetwear underground. Ciclo, ruptura e transformação sob o símbolo do Ouroboros.",
            },
        ],
    }),
    component: Home,
});

function Home() {
    const shouldReduceMotion = useReducedMotion();
    const entryRef = useRef<HTMLElement>(null);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const { scrollYProgress } = useScroll({
        target: entryRef,
        offset: ["start start", "end end"],
    });

    // ─── HERO SCROLL & MOTION (DURAÇÃO ESTENDIDA E SUAVE) ───────────────────────
    // Fase 1 (0 → 0.65): Ouroboros escala e gira suavemente, texto 100% visível e legível
    // Fase 2 (0.65 → 1.0): Dissolução gradual e elegante ao aproximar da próxima seção
    const ringScale = useTransform(
        scrollYProgress,
        [0, 0.65, 1],
        shouldReduceMotion ? [1, 1, 1] : [1, 1.25, 1.38]
    );
    const ringRotate = useTransform(
        scrollYProgress,
        [0, 1],
        [0, shouldReduceMotion ? 0 : 60]
    );
    const ringOpacity = useTransform(
        scrollYProgress,
        [0, 0.65, 1],
        [0.75, 0.55, 0]
    );

    const titleY = useTransform(
        scrollYProgress,
        [0, 0.65, 1],
        shouldReduceMotion ? [0, 0, 0] : [0, 0, -28]
    );
    const titleOpacity = useTransform(
        scrollYProgress,
        [0, 0.6, 1],
        [1, 1, 0]
    );

    // Mouse tracking sutil para desktop
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [line1Done, setLine1Done] = useState(false);
    const mouseSpringX = useSpring(mousePos.x, { stiffness: 35, damping: 28 });
    const mouseSpringY = useSpring(mousePos.y, { stiffness: 35, damping: 28 });

    useEffect(() => {
        if (typeof window === "undefined" || shouldReduceMotion) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 12;
            const y = (e.clientY / innerHeight - 0.5) * 12;
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [shouldReduceMotion]);

    // Axioma: revelação gradual via scroll
    const axiomRef = useRef<HTMLDivElement>(null);
    const isAxiomInView = useInView(axiomRef, { once: true, amount: 0.15 });
    const { scrollYProgress: axiomProgress } = useScroll({
        target: axiomRef,
        offset: ["start 80%", "end 40%"],
    });
    // Peças do Drop 001
    const pieces = activeDrop.pieces ?? [];


    return (
        <div className="concrete-surface">
            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 01 — HERO (TRACK DE SCROLL ESTENDIDO PARA ANIMAÇÃO MAIS LONGA)         */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section
                ref={entryRef}
                className="relative h-[200vh]"
            >
                <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
                    {/* OUROBOROS — Protagonista visual do Hero */}
                    <motion.div
                        style={{
                            scale: ringScale,
                            opacity: ringOpacity,
                            rotate: ringRotate,
                            x: shouldReduceMotion ? 0 : mouseSpringX,
                            y: shouldReduceMotion ? 0 : mouseSpringY,
                        }}
                        className="pointer-events-none absolute top-1/2 left-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                    >
                        <Ouroboros
                            variant="intact"
                            className="h-full w-full text-foreground"
                            strokeWidth={0.75}
                        />
                    </motion.div>

                    {/* TÍTULO & MANIFESTO CURTO — CLEAN & DIRETO */}
                    <motion.div
                        style={{
                            y: titleY,
                            opacity: titleOpacity,
                        }}
                        className="relative z-10 text-center flex flex-col items-center will-change-transform"
                    >
                        <motion.h1
                            className="display-xl text-foreground select-none font-bold tracking-tight"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <GlitchDecryptText
                                text="SUBVERSE"
                                className="display-xl text-foreground select-none font-bold tracking-tight"
                                speed={65}
                                duration={2200}
                                stagger={200}
                                autoStart={true}
                                triggerOnHover={false}
                                loop={false}
                            />
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-6 inline-flex items-center px-4 py-1.5 bg-neutral-950/85 backdrop-blur-md border border-border/60"
                        >
                            <p className="tech text-foreground tracking-[0.22em] uppercase text-xs sm:text-sm md:text-base font-bold font-mono">
                                Para os que não se encaixam.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* INDICADOR DE SCROLL */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.9 }}
                        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none pb-[env(safe-area-inset-bottom)]"
                    >
                        <div className="h-5 w-px bg-gradient-to-b from-foreground/60 to-transparent animate-pulse" />
                    </motion.div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 02 — BLOCO DE IDENTIFICAÇÃO (MOLDE, RUPTURA & AXIOMA)                  */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="relative px-5 py-28 md:px-8 md:py-44">
                <div className="mx-auto max-w-[1600px] space-y-36 md:space-y-56">
                    {/* Frase 01: O Molde */}
                    <div className="max-w-4xl pb-16 sm:pb-28 md:pb-44 lg:pb-52">
                        <LineReveal delay={0.1} className="mb-6 w-16" />
                        <p className="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]">
                            <TextType
                                text="Você foi ensinado a caber."
                                typingSpeed={40}
                                startOnVisible={true}
                                resetOnLeave={true}
                                loop={false}
                                showCursor={true}
                                cursorCharacter="_"
                                cursorClassName="text-foreground/70 font-light"
                                className="inline"
                            />
                        </p>
                    </div>

                    {/* Frase 02: A Ruptura — ScrollReveal com Respiro Estendido */}
                    <div className="flex justify-end pt-8 md:pt-16">
                        <div className="max-w-4xl text-right">
                            <LineReveal delay={0.1} fromRight className="mb-6 w-16 ml-auto" />
                            <ScrollReveal
                                baseOpacity={0.06}
                                baseRotation={1.5}
                                blurStrength={4}
                                enableBlur={true}
                                containerClassName="text-right"
                                textClassName="display-lg text-foreground font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.88]"
                            >
                                Mas nem todo mundo foi feito para caber.
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* BLOCO INDISPENSÁVEL: AXIOMA CENTRAL (LIMPO & EDITORIAL) */}
                    <div
                        ref={axiomRef}
                        className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 border-t border-border/40"
                    >
                        <FadeIn delay={0} className="h-20 w-20 md:h-28 md:w-28 shrink-0">
                            <Ouroboros variant="intact" className="h-full w-full text-foreground/80" />
                        </FadeIn>
                        <div className="space-y-5 flex-1">
                            <h2 className="display-lg font-display text-3xl sm:text-5xl md:text-6xl leading-[0.98]">
                                <DecryptedText
                                    text="Não é sobre o que você veste."
                                    animateOn="controlled"
                                    isTriggered={isAxiomInView}
                                    revealDirection="start"
                                    sequential
                                    speed={50}
                                    maxIterations={12}
                                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                                    className="text-foreground"
                                    encryptedClassName="text-muted-foreground/60"
                                    parentClassName="block w-full"
                                    onComplete={() => setLine1Done(true)}
                                />
                                <span className="block mt-2">
                                    <DecryptedText
                                        text="É sobre o que você se torna."
                                        animateOn="controlled"
                                        isTriggered={isAxiomInView}
                                        delay={350}
                                        revealDirection="start"
                                        sequential
                                        speed={50}
                                        maxIterations={12}
                                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                                        className="text-muted-foreground"
                                        encryptedClassName="text-muted-foreground/40"
                                        parentClassName="block w-full"
                                    />
                                </span>
                            </h2>
                            <div className="pt-2">
                                <Link
                                    to="/manifesto"
                                    className="tech link-underline inline-block text-xs font-bold text-foreground transition-transform duration-300 hover:translate-x-1"
                                >
                                    LER O MANIFESTO COMPLETO →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 03 & 04 — DROP 001 — MOLDADOS & VITRINE PROTAGONISTA DE PRODUTOS       */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="border-t border-border/40 px-5 py-24 md:px-8 md:py-36">
                <div className="mx-auto max-w-[1600px]">
                    {/* CABEÇALHO DO DROP */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-8">
                        <div>
                            <span className="tech text-muted-foreground text-xs font-mono block">
                                CAPÍTULO I — MOLDADOS
                            </span>
                            <h2 className="display-xl mt-2 text-foreground">
                                <FoldText
                                    text="Moldados"
                                    splitBy="char"
                                    hinge="top"
                                    trigger="scroll"
                                    duration={0.7}
                                    stagger={0.045}
                                    perspective={800}
                                    creaseShading={0.5}
                                    className="display-xl text-foreground"
                                />
                            </h2>
                            <p className="font-display text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2">
                                "Subversivos não nascem prontos. São moldados."
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                            <Link
                                to="/drops/$slug"
                                params={{ slug: "001" }}
                                className="tech link-underline text-foreground font-bold hover:text-muted-foreground transition-colors"
                            >
                                VER NARRATIVA DO DROP →
                            </Link>
                        </div>
                    </div>

                    {/* ── CARROSSEL & VITRINE DE PRODUTOS (FOCO TOTAL NA PEÇA) ─────────────── */}
                    <div className="mt-10 md:mt-14">
                        <ProductDropShowcase
                            pieces={pieces}
                            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                            dropName="DROP 001 — MOLDADOS"
                        />
                    </div>
                </div>
            </section>


            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 05 — ESCASSEZ (LIMPO & SEM MOLDURAS PESADAS)                           */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="border-t border-border/40 px-5 py-24 md:px-8 md:py-36 bg-neutral-950">
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid gap-12 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <span className="tech text-muted-foreground text-xs font-mono block">
                                REGRA DO CICLO
                            </span>
                            <h3 className="display-lg text-foreground text-3xl sm:text-5xl md:text-6xl leading-[0.92]">
                                <TextType
                                    text="Edição estrita. Feita para quem não espera uma segunda chance."
                                    typingSpeed={38}
                                    startOnVisible={true}
                                    resetOnLeave={true}
                                    loop={false}
                                    showCursor={true}
                                    cursorCharacter="_"
                                    cursorClassName="text-foreground/70 font-light"
                                    className="inline"
                                />
                            </h3>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[54ch]">
                                Tiragem estritamente limitada por peça. Sem reposição. Quando a tiragem for encerrada, este capítulo será arquivado definitivamente.
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            <AsciiProgress />
                        </div>

                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 06 — FILOSOFIA → PRODUTO                                               */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28">
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid gap-8 md:grid-cols-12 items-center">
                        <div className="md:col-span-8 space-y-3">
                            <span className="tech text-muted-foreground text-xs font-mono block">
                                MATÉRIA & PROPÓSITO
                            </span>
                            <h3 className="display-lg text-foreground text-3xl sm:text-5xl leading-[0.95]">
                                <FoldText
                                    text="Essa filosofia virou uma peça."
                                    splitBy="word"
                                    hinge="top"
                                    trigger="scroll"
                                    duration={0.65}
                                    stagger={0.06}
                                    perspective={800}
                                    creaseShading={0.4}
                                    className="display-lg text-foreground"
                                />
                            </h3>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[56ch]">
                                A roupa é a materialização daquilo que a SubVerse acredita. Matéria pesada e modelagem
                                estruturada feitas para carregar a identidade de quem recusa o molde.
                            </p>
                        </div>

                        <div className="md:col-span-4 md:text-right">
                            <Link
                                to="/drops/$slug"
                                params={{ slug: "001" }}
                                className="tech link-underline inline-block text-xs font-bold tracking-wider hover:text-foreground transition-colors"
                            >
                                VER DETALHES DO CAPÍTULO I →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 07 — "VOCÊ RECONHECE OS SEUS"                                          */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="border-t border-border/40 px-5 py-24 md:px-8 md:py-36">
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid gap-12 md:grid-cols-12 items-center">
                        {/* Texto de reconhecimento */}
                        <div className="md:col-span-6 space-y-5">
                            <ClipReveal>
                                <span className="tech text-muted-foreground text-xs font-mono block">
                                    CÓDIGO DE RECONHECIMENTO
                                </span>
                                <h2 className="display-lg text-foreground text-4xl sm:text-6xl md:text-7xl mt-2">
                                    Você reconhece os seus.
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[48ch] mt-4">
                                    Pessoas que compartilham a mesma inquietação reconhecem umas às outras. O símbolo
                                    na etiqueta, a textura da matéria pesada e a recusa do padrão são a nossa linguagem comum.
                                </p>
                            </ClipReveal>
                        </div>

                        {/* Quadro Visual: LOGO SUBVERSE | OUROBOROS */}
                        <div className="md:col-span-6 flex items-center justify-center">
                            <div className="flex items-center justify-center gap-8 sm:gap-14 p-6 sm:p-10">
                                <motion.div
                                    initial={shouldReduceMotion ? {} : { x: -20, opacity: 0 }}
                                    whileInView={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-8% 0px" }}
                                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Logo className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 shrink-0 transition-transform duration-700 hover:scale-105" />
                                </motion.div>
                                <div className="h-16 sm:h-20 w-px bg-border/40 shrink-0" />
                                <motion.div
                                    initial={shouldReduceMotion ? {} : { x: 20, opacity: 0 }}
                                    whileInView={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-8% 0px" }}
                                    transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Ouroboros className="spin-slower h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 shrink-0 text-foreground/85" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────────────────────────────────────────────────────── */}
            {/* 08 — UNIVERSO (PORTAL DE APROFUNDAMENTO EDITORIAL)                     */}
            {/* ────────────────────────────────────────────────────────────────────── */}
            <section className="border-t border-border/40 px-5 py-20 md:px-8 md:py-28 bg-neutral-950">
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border/40">
                        <div>
                            <span className="tech text-muted-foreground text-xs font-mono block">
                                ARQUIVO & MANIFESTO
                            </span>
                            <h3 className="display-lg text-foreground text-3xl sm:text-5xl mt-2">
                                Quer entender o universo?
                            </h3>
                        </div>
                        <Link
                            to="/universe"
                            className="tech link-underline text-xs font-bold tracking-wider text-foreground"
                        >
                            EXPLORAR O SUBVERSE COMPLETO →
                        </Link>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3 mt-12">
                        <Link
                            to="/universe"
                            className="group flex flex-col justify-between min-h-[140px] transition-transform duration-300 hover:translate-x-1"
                        >
                            <div>
                                <span className="tech text-muted-foreground text-[0.65rem] font-mono block">01 — PILARES</span>
                                <h4 className="font-display text-2xl uppercase text-foreground mt-2">
                                    O Universo
                                </h4>
                                <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                                    Subverso, Subversão e Ouroboros. A trindade conceitual da marca.
                                </p>
                            </div>
                            <span className="tech text-xs font-bold text-foreground mt-4 block">ACESSAR →</span>
                        </Link>

                        <Link
                            to="/manifesto"
                            className="group flex flex-col justify-between min-h-[140px] transition-transform duration-300 hover:translate-x-1"
                        >
                            <div>
                                <span className="tech text-muted-foreground text-[0.65rem] font-mono block">02 — POSTULADO</span>
                                <h4 className="font-display text-2xl uppercase text-foreground mt-2">
                                    O Manifesto
                                </h4>
                                <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                                    "Não é sobre o que você veste. É sobre o que você se torna." O documento.
                                </p>
                            </div>
                            <span className="tech text-xs font-bold text-foreground mt-4 block">LER TEXTO →</span>
                        </Link>

                        <Link
                            to="/archive"
                            className="group flex flex-col justify-between min-h-[140px] transition-transform duration-300 hover:translate-x-1"
                        >
                            <div>
                                <span className="tech text-muted-foreground text-[0.65rem] font-mono block">03 — REGISTROS</span>
                                <h4 className="font-display text-2xl uppercase text-foreground mt-2">
                                    O Arquivo
                                </h4>
                                <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                                    Capítulos encerrados, peças históricas e tiragens extintas.
                                </p>
                            </div>
                            <span className="tech text-xs font-bold text-foreground mt-4 block">CONSULTAR →</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modal de Tabela de Medidas */}
            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
        </div>
    );
}
