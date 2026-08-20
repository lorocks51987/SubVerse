import {
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

export interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 2,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom 60%",
  wordAnimationEnd = "bottom 50%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: "100% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 90%",
            end: rotationEnd,
            scrub: 1,
          },
        }
      );

      const wordElements = el.querySelectorAll(".word");
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity, willChange: "opacity, filter" },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 85%",
              end: wordAnimationEnd,
              scrub: 1,
            },
          }
        );

        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top 85%",
                end: wordAnimationEnd,
                scrub: 1,
              },
            }
          );
        }
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  );
}
