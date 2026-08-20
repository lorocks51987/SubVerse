import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GlitchDecryptTextProps {
  text: string;
  className?: string;
  characterClassName?: string;
  glitchClassName?: string;
  autoStart?: boolean;
  triggerOnHover?: boolean;
  loop?: boolean; // Se deve repetir ciclicamente
  pauseDuration?: number; // Tempo em ms que o nome fica estático na tela antes do próximo ciclo (ex: 8000ms)
  speed?: number; // Intervalo de atualização dos glifos em ms (ex: 75ms)
  duration?: number; // Duração total da resolução em ms (ex: 2800ms)
  stagger?: number; // Atraso entre resolução de cada letra em ms (ex: 240ms)
  onComplete?: () => void;
}

const RAW_GLYPHS = [
  "█", "▓", "▒", "░", "■", "▨", "▤",
  "Ø", "‡", "†", "∆", "∇", "∑", "⟠", "☿", "⍟", "⌘", "⌥", "⎔", "⌖", "⊘", "⊕", "⊗",
  "0", "1", "X", "Z", "V", "R", "S", "B", "9", "8", "#", "$", "%", "&", "!", "<", ">", "/"
];

interface CharState {
  target: string;
  current: string;
  resolved: boolean;
  flash: boolean;
  colorGlitch: boolean;
}

export function GlitchDecryptText({
  text = "SUBVERSE",
  className = "",
  characterClassName = "",
  glitchClassName = "",
  autoStart = true,
  triggerOnHover = false,
  loop = false,
  pauseDuration = 8000,
  speed = 65,
  duration = 2200,
  stagger = 200,
  onComplete,
}: GlitchDecryptTextProps) {
  const chars = useMemo(() => text.split(""), [text]);

  const getRandomGlyph = useCallback((): string => {
    return RAW_GLYPHS[Math.floor(Math.random() * RAW_GLYPHS.length)] ?? "X";
  }, []);

  // Inicia já em estado de scramble para o efeito ser visível instantaneamente no primeiro frame
  const [charStates, setCharStates] = useState<CharState[]>(() =>
    chars.map((char) => ({
      target: char,
      current: char === " " ? " " : RAW_GLYPHS[Math.floor(Math.random() * RAW_GLYPHS.length)] ?? "X",
      resolved: char === " ",
      flash: false,
      colorGlitch: Math.random() > 0.5,
    }))
  );

  const isAnimatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const flashTimersRef = useRef<number[]>([]);
  const hasMountedRef = useRef(false);

  // Armazena as configurações atuais em refs para evitar re-criação desnecessária da função
  const configRef = useRef({
    speed,
    duration,
    stagger,
    loop,
    pauseDuration,
    onComplete,
  });

  useEffect(() => {
    configRef.current = {
      speed,
      duration,
      stagger,
      loop,
      pauseDuration,
      onComplete,
    };
  }, [speed, duration, stagger, loop, pauseDuration, onComplete]);

  const startDecryption = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Limpar temporizadores anteriores
    if (timerRef.current) clearInterval(timerRef.current);
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    flashTimersRef.current.forEach((t) => clearTimeout(t));
    flashTimersRef.current = [];

    const startTime = Date.now();
    const currentConfig = configRef.current;

    // Inicializa todos como não resolvidos com glifos aleatórios
    setCharStates(
      chars.map((char) => ({
        target: char,
        current: char === " " ? " " : getRandomGlyph(),
        resolved: char === " ",
        flash: false,
        colorGlitch: Math.random() > 0.6,
      }))
    );

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const { stagger: stag, loop: lp, pauseDuration: pause, onComplete: completeFn } = configRef.current;

      setCharStates((prev) => {
        let allDone = true;

        const next: CharState[] = prev.map((item, idx) => {
          if (item.target === " ") return item;

          // Começa a resolver de imediato letra por letra
          const charResolveTime = 80 + idx * stag;

          if (elapsed >= charResolveTime) {
            if (!item.resolved) {
              // Acabou de resolver -> ativa flash de brilho intenso
              const flashTimer = window.setTimeout(() => {
                setCharStates((currentStates) =>
                  currentStates.map((s, i) =>
                    i === idx ? { ...s, flash: false } : s
                  )
                );
              }, 300);
              flashTimersRef.current.push(flashTimer);

              return {
                ...item,
                current: item.target,
                resolved: true,
                flash: true,
                colorGlitch: false,
              };
            }
            return item;
          }

          allDone = false;
          // Continua embaralhando com glifos de alta energia
          return {
            ...item,
            current: getRandomGlyph(),
            resolved: false,
            flash: false,
            colorGlitch: Math.random() > 0.45,
          };
        });

        if (allDone) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          isAnimatingRef.current = false;
          if (completeFn) completeFn();

          // Se loop estiver ativado explicitamente, agenda o próximo ciclo
          if (lp) {
            loopTimerRef.current = window.setTimeout(() => {
              startDecryption();
            }, pause);
          }
        }

        return next;
      });
    }, currentConfig.speed);
  }, [chars, getRandomGlyph]);

  // Executa IMEDIATAMENTE no mount
  useEffect(() => {
    if (autoStart && !hasMountedRef.current) {
      hasMountedRef.current = true;
      startDecryption();
    }
  }, [autoStart, startDecryption]);

  // Limpeza de intervalos e timeouts ao desmontar o componente
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      flashTimersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center select-none font-display uppercase tracking-tight transition-transform duration-300",
        triggerOnHover ? "cursor-pointer" : "cursor-default",
        className
      )}
      onMouseEnter={triggerOnHover ? startDecryption : undefined}
    >
      {charStates.map((item, index) => {
        if (item.target === " ") {
          return <span key={index} className="inline-block w-[0.28em]">&nbsp;</span>;
        }

        return (
          <span
            key={index}
            className={cn(
              "relative inline-block transition-all duration-150 transform-gpu text-center",
              item.resolved
                ? "text-foreground font-display"
                : cn(
                    "font-mono text-muted-foreground/80 font-bold",
                    item.colorGlitch && "text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.85)]",
                    glitchClassName
                  ),
              item.flash &&
                "text-white scale-105 drop-shadow-[0_0_24px_rgba(255,255,255,1)] brightness-150 z-10",
              characterClassName
            )}
          >
            {item.current}
          </span>
        );
      })}
    </span>
  );
}
