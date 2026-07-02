"use client";

import { LinkButton } from "@/app/components/ui/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const rafRef = useRef<number | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const trustPointsRef = useRef<HTMLDivElement>(null);
  const bgPatternRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const secondaryButtonRef = useRef<HTMLAnchorElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mouseTrailRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Reset animation and visibility when component mounts or route changes
  useEffect(() => {
    // Reset animation timeline
    if (tl.current) {
      tl.current.kill();
      tl.current = null;
    }

    // Initial states
    setIsVisible(true);
    setContentReady(false);

    // Register GSAP plugins
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Small delay before starting animations to ensure smooth transitions
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 100);

      return () => clearTimeout(timer);
    }

    // Force cleanup ScrollTrigger on unmount
    return () => {
      if (tl.current) {
        tl.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  // Handle mouse movement with direct DOM manipulation instead of React state
  useEffect(() => {
    const updateMouseTrail = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      lastMousePos.current = { x: clientX, y: clientY };

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        if (!mouseTrailRef.current) return;

        // Update parallax elements based on mouse position
        if (heroRef.current) {
          const moveElements =
            heroRef.current.querySelectorAll(".parallax-element");
          moveElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            const depth = parseFloat(htmlEl.dataset.depth || "0.1");
            const moveX =
              (lastMousePos.current.x / window.innerWidth - 0.5) * depth * 100;
            const moveY =
              (lastMousePos.current.y / window.innerHeight - 0.5) * depth * 100;

            gsap.to(htmlEl, {
              x: moveX,
              y: moveY,
              duration: 0.8,
              ease: "power1.out",
              overwrite: "auto",
            });
          });
        }

        // Create a trail element for the current mouse position
        const trailElement = document.createElement("div");
        trailElement.className =
          "absolute rounded-full pointer-events-none z-50 opacity-30";
        trailElement.style.left = `${lastMousePos.current.x}px`;
        trailElement.style.top = `${lastMousePos.current.y}px`;
        trailElement.style.width = "12px";
        trailElement.style.height = "12px";
        trailElement.style.background =
          "radial-gradient(circle, rgba(34, 197, 94, 0.6), transparent 70%)";
        trailElement.style.transition =
          "transform 0.5s ease-out, opacity 0.5s ease-out";

        mouseTrailRef.current.appendChild(trailElement);

        // Animate and remove the trail elements
        gsap.to(trailElement, {
          width: "3px",
          height: "3px",
          opacity: 0,
          duration: 1,
          onComplete: () => {
            if (
              mouseTrailRef.current &&
              mouseTrailRef.current.contains(trailElement)
            ) {
              mouseTrailRef.current.removeChild(trailElement);
            }
          },
        });

        // Limit the number of trail elements
        if (mouseTrailRef.current.children.length > 10) {
          if (mouseTrailRef.current.firstChild) {
            mouseTrailRef.current.removeChild(mouseTrailRef.current.firstChild);
          }
        }
      });
    };

    window.addEventListener("mousemove", updateMouseTrail);

    return () => {
      window.removeEventListener("mousemove", updateMouseTrail);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Generate and animate particles
  useEffect(() => {
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        const sparklesParent = particlesRef.current;
        if (!sparklesParent) return;

        if (sparklesParent.children.length > 30) {
          for (let i = 0; i < 3; i++) {
            if (sparklesParent.lastChild) {
              sparklesParent.removeChild(sparklesParent.lastChild);
            }
          }
        }

        for (let i = 0; i < 3; i++) {
          const particle = document.createElement("div");
          const size = Math.random() * 4 + 2;
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;

          gsap.set(particle, {
            x: xPos + "%",
            y: yPos + "%",
            width: size,
            height: size,
            backgroundColor: `rgba(120, 255, 220, ${
              Math.random() * 0.5 + 0.5
            })`,
            borderRadius: "50%",
            position: "absolute",
          });

          sparklesParent.appendChild(particle);

          gsap.to(particle, {
            duration: Math.random() * 2 + 1,
            opacity: 0,
            y: yPos - 20 + "%",
            x: xPos + (Math.random() * 10 - 5) + "%",
            scale: 0,
            onComplete: function () {
              if (particle.parentNode === sparklesParent) {
                sparklesParent.removeChild(particle);
              }
            },
          });
        }
      },
    });
  }, []);

  // Setup animations
  useEffect(() => {
    if (heroRef.current && !tl.current && isVisible && contentReady) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          end: "bottom top",
        },
        delay: 0.2,
      });

      // Animate container
      tl.current.fromTo(
        heroRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, ease: "power2.out" }
      );

      // Animate circular elements with staggered timing
      const circles = heroRef.current.querySelectorAll(".circle-element");
      tl.current.fromTo(
        circles,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5"
      );

      // Text reveal animation with character staggering
      const headingElement = textRef.current?.querySelector("h1");
      if (headingElement) {
        // First, a quick glitch reveal
        tl.current.fromTo(
          headingElement,
          {
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=1.8"
        );

        // Add a color shifting glow effect
        tl.current.add(() => {
          // Initial glitch effect
          gsap
            .timeline({ repeat: 3, repeatDelay: 0.2 })
            .to(headingElement, {
              x: 3,
              textShadow:
                "3px 0 0 rgba(255,0,0,0.5), -3px 0 0 rgba(0,255,255,0.5)",
              skewX: 5,
              duration: 0.1,
            })
            .to(headingElement, {
              x: -3,
              textShadow:
                "-3px 0 0 rgba(0,255,255,0.5), 3px 0 0 rgba(255,0,0,0.5)",
              skewX: -5,
              duration: 0.1,
            })
            .to(headingElement, {
              x: 0,
              textShadow: "0 0 0 rgba(0,0,0,0)",
              skewX: 0,
              duration: 0.3,
              onComplete: () => {
                // Long-term ambient animation
                gsap.to(headingElement, {
                  textShadow:
                    "0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4)",
                  duration: 3,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              },
            });
        });
      }

      // Paragraph text animation
      const paragraph = textRef.current?.querySelector("p");
      if (paragraph) {
        tl.current.fromTo(
          paragraph,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=1"
        );
      }

      // Button animation for LinkButtons
      const links = textRef.current?.querySelectorAll("a");
      if (links && links.length > 0) {
        tl.current.fromTo(
          links,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (tl.current) {
        tl.current.kill();
      }

      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isVisible, contentReady]);

  // Setup animations for the heading text
  useEffect(() => {
    const headingElement = textRef.current?.querySelector("h1");
    if (!headingElement || !isVisible || !contentReady) return;

    // Create a reveal animation instead of word-by-word animation
    const content = headingElement.textContent || "";
    if (!content) return;

    // Create a mask overlay for the reveal animation
    const headingContainer = headingElement.parentElement;
    if (!headingContainer) return;

    // Reset any previous animations
    headingElement.style.opacity = "1";

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      delay: 0.3,
    });

    // Main text reveal animation
    tl.fromTo(
      headingElement,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        opacity: 0.3,
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
      }
    );

    // Create multiple reveal lines that sweep across the text for a more dynamic effect
    for (let i = 0; i < 3; i++) {
      const revealLine = document.createElement("div");
      revealLine.className =
        "absolute inset-0 bg-gradient-to-r from-transparent via-green-200/30 to-transparent";
      revealLine.style.transform = "translateX(-100%)";
      revealLine.style.zIndex = "10";
      revealLine.style.opacity = (3 - i) * 0.2 + "";
      headingContainer.appendChild(revealLine);

      tl.to(
        revealLine,
        {
          x: "100%",
          duration: 0.8 - i * 0.15,
          ease: "power2.inOut",
          onComplete: () => {
            if (revealLine.parentNode) {
              revealLine.parentNode.removeChild(revealLine);
            }
          },
        },
        i * 0.1
      );
    }

    // Add a subtle highlight after reveal
    tl.to(
      headingElement,
      {
        textShadow: "0 0 20px rgba(22, 163, 74, 0.4)",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      },
      "-=0.3"
    );

    // Add a subtle hover effect for the heading
    headingElement.addEventListener("mouseenter", () => {
      gsap.to(headingElement, {
        letterSpacing: "1px",
        textShadow: "0 0 15px rgba(22, 163, 74, 0.3)",
        duration: 0.4,
      });
    });

    headingElement.addEventListener("mouseleave", () => {
      gsap.to(headingElement, {
        letterSpacing: "normal",
        textShadow: "none",
        duration: 0.4,
      });
    });

    return () => {
      headingElement.removeEventListener("mouseenter", () => {});
      headingElement.removeEventListener("mouseleave", () => {});

      // Ensure all reveal lines are removed
      const revealLines = headingContainer.querySelectorAll(
        'div[style*="translateX"]'
      );
      revealLines.forEach(line => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      });
    };
  }, [isVisible, contentReady]);

  // Add effect to animate the trust points
  useEffect(() => {
    const trustPoints = textRef.current?.querySelectorAll(".trust-point");
    if (!trustPoints || trustPoints.length === 0 || !isVisible || !contentReady)
      return;

    // Create staggered entrance animation
    gsap.fromTo(
      trustPoints,
      {
        y: 20,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 1, // Start after main animations
      }
    );

    // Add hover animations
    trustPoints.forEach(point => {
      point.addEventListener("mouseenter", () => {
        gsap.to(point, {
          y: -5,
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
        });

        const icon = point.querySelector(".icon-container");
        if (icon) {
          gsap.to(icon, {
            rotate: "15deg",
            scale: 1.2,
            backgroundColor: "#dcfce7",
            duration: 0.4,
          });
        }
      });

      point.addEventListener("mouseleave", () => {
        gsap.to(point, {
          y: 0,
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          duration: 0.3,
        });

        const icon = point.querySelector(".icon-container");
        if (icon) {
          gsap.to(icon, {
            rotate: "0deg",
            scale: 1,
            backgroundColor: "#dcfce7",
            duration: 0.3,
          });
        }
      });
    });

    return () => {
      trustPoints.forEach(point => {
        point.removeEventListener("mouseenter", () => {});
        point.removeEventListener("mouseleave", () => {});
      });
    };
  }, [isVisible, contentReady]);

  return (
    <div
      ref={heroRef}
      className={`relative min-h-screen w-full flex items-center justify-between px-6 transition-opacity duration-700 bg-gradient-to-br from-green-50 to-white ${
        contentReady ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      <div
        className="absolute top-1/4 right-1/3 w-[15rem] h-[15rem] rounded-full bg-green-300/10 blur-3xl parallax-element"
        data-depth="0.2"
      ></div>
      <div
        className="absolute bottom-1/3 -left-10 w-[20rem] h-[20rem] rounded-full bg-green-400/10 blur-3xl parallax-element"
        data-depth="0.3"
      ></div>

      {/* Floating Decorative Elements */}
      <div
        className="absolute top-[10%] right-[5%] w-16 h-16 bg-gradient-to-r from-green-300/20 to-green-400/20 rounded-full animate-float parallax-element"
        data-depth="0.4"
      ></div>
      <div
        className="absolute bottom-[15%] left-[7%] w-10 h-10 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-full animate-float delay-500 parallax-element"
        data-depth="0.3"
      ></div>
      <div
        className="absolute top-[30%] left-[15%] w-8 h-8 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full animate-float delay-300 parallax-element"
        data-depth="0.5"
      ></div>

      {/* Geometric accents */}
      <div
        className="absolute bottom-[25%] right-[10%] w-20 h-20 border-2 border-green-400/20 rounded-lg rotate-12 animate-float parallax-element"
        data-depth="0.2"
      ></div>
      <div
        className="absolute top-[20%] left-[5%] w-12 h-12 border border-green-500/20 rounded-lg rotate-45 animate-float delay-300 parallax-element"
        data-depth="0.4"
      ></div>

      {/* Circular 3D elements */}
      <div
        className="absolute top-[20%] right-[15%] w-[8rem] h-[8rem] circle-element parallax-element"
        data-depth="0.5"
      >
        <div className="absolute inset-0 rounded-full border-2 border-green-300/50 animate-[spin_15s_linear_infinite]"></div>
        <div className="absolute inset-2 rounded-full border border-green-200/40 animate-[spin_10s_linear_infinite_reverse]"></div>
        <div className="absolute inset-4 rounded-full border border-green-400/30 animate-[spin_20s_linear_infinite]"></div>
      </div>

      {/* <div
        className="absolute bottom-[20%] left-[10%] w-[12rem] h-[12rem] circle-element parallax-element"
        data-depth="0.4"
      >
        <div className="absolute inset-0 rounded-full border-2 border-green-300/50 animate-[spin_18s_linear_infinite_reverse]"></div>
        <div className="absolute inset-3 rounded-full border border-green-200/40 animate-[spin_12s_linear_infinite]"></div>
        <div className="absolute inset-6 rounded-full border border-green-400/30 animate-[spin_24s_linear_infinite_reverse]"></div>
      </div> */}

      {/* Scan lines */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>

      {/* Mouse trail container */}
      <div
        ref={mouseTrailRef}
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      ></div>

      {/* Animation particles container */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      ></div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center z-10 py-10">
        <div ref={textRef} className="text-center md:text-left">
          <div className="relative mb-6 overflow-hidden">
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-green-100/50 blur-lg"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 transition-all duration-300 relative z-0">
              গণস্বাস্থ্য হোমিও
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            “ক্যান্সারের বিরুদ্ধে আমাদের দীর্ঘমেয়াদি লড়াইয়ে, হোমিওপ্যাথিই
            নিরাপদ ও মানবিক সমাধান — কারণ আমরা শুধু রোগ সারাই না, আমরা ফিরিয়ে
            আনি হারিয়ে যাওয়া আশাও।”
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <LinkButton href="/appointment" variant="primary" size="md">
              Book Appointment
            </LinkButton>
            <LinkButton href="/services" variant="secondary" size="md">
              Explore Services
            </LinkButton>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="trust-point flex items-center space-x-3 bg-white bg-opacity-50 p-3 rounded-lg shadow-sm transition-all cursor-pointer">
              <div className="icon-container bg-green-100 p-2 rounded-full transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">অভিজ্ঞ চিকিৎসক</span>
            </div>
            <div className="trust-point flex items-center space-x-3 bg-white bg-opacity-50 p-3 rounded-lg shadow-sm transition-all cursor-pointer">
              <div className="icon-container bg-green-100 p-2 rounded-full transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">বিশুদ্ধ ঔষধ</span>
            </div>
            <div className="trust-point flex items-center space-x-3 bg-white bg-opacity-50 p-3 rounded-lg shadow-sm transition-all cursor-pointer">
              <div className="icon-container bg-green-100 p-2 rounded-full transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">২৪/৭ সেবা</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 parallax-element" data-depth="0.1">
          <div className="relative w-full aspect-[4/3]">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 rounded-xl shadow-xl overflow-hidden border border-green-100/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-4/5 w-4/5 rounded-full bg-gradient-to-br from-green-400/80 to-green-600/80 flex items-center justify-center">
                  <div className="absolute h-[110%] w-[110%] border-2 border-white/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                  <div className="absolute h-[120%] w-[120%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto mb-4 text-white/80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      গণস্বাস্থ্য হোমিও
                    </h3>
                    <p className="text-white/80">
                      প্রাকৃতিক চিকিৎসা আপনার সেবায়
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech-inspired overlays */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-green-400/30 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-green-400/30 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-green-400/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
