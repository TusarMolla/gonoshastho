"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
  | "primary" // Green background with white text
  | "secondary" // Green outline with green text
  | "outline" // Light outline with dark text
  | "ghost" // No background or border
  | "white"; // White background with green text

export type ButtonSize =
  | "sm" // Small
  | "md" // Medium (default)
  | "lg"; // Large

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  href: string;
}

const getBaseStyles = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth: boolean = false
): string => {
  // Common styles for all buttons
  const baseStyles = `
    group relative overflow-hidden font-semibold rounded-lg transition-all duration-500 
    inline-flex items-center justify-center ${fullWidth ? "w-full" : ""}
  `;

  // Size-specific styles
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  // Variant-specific styles
  const variantStyles = {
    primary: "bg-green-600 text-white shadow-md hover:shadow-lg",
    secondary:
      "border-2 border-green-600 text-green-600 hover:text-white shadow-sm hover:shadow-md",
    outline:
      "border border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-green-600",
    white:
      "bg-white text-green-600 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200",
  };

  return twMerge(baseStyles, sizeStyles[size], variantStyles[variant]);
};

const getContentStyles = (
  variant: ButtonVariant = "primary",
  iconPosition: "left" | "right" = "right"
): string => {
  const contentStyles = `
    relative z-10 transition-all duration-500 
    flex items-center justify-center gap-2 w-full h-full
  `;

  // Additional variant-specific content styles
  const variantContentStyles = {
    primary: "",
    secondary: "group-hover:text-white",
    outline: "",
    ghost: "",
    white: "",
  };

  // Adjust icon order
  const iconPositionStyles =
    iconPosition === "left" ? "flex-row" : "flex-row-reverse";

  return twMerge(
    contentStyles,
    variantContentStyles[variant],
    iconPositionStyles
  );
};

const getOverlayStyles = (variant: ButtonVariant = "primary"): string => {
  const baseOverlayStyles =
    "absolute inset-0 scale-x-0 origin-left transform transition-transform duration-500 group-hover:scale-x-100";

  const variantOverlayStyles = {
    primary: "bg-green-700",
    secondary: "bg-green-600",
    outline: "bg-green-50",
    ghost: "bg-gray-100",
    white: "bg-green-50",
  };

  return twMerge(baseOverlayStyles, variantOverlayStyles[variant]);
};

// The Button component (for regular button elements)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const buttonInternalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = ref || buttonInternalRef;

    useEffect(() => {
      const button = buttonInternalRef.current;
      if (!button) return;

      // Hover animation
      const handleMouseEnter = () => {
        gsap.to(button, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power1.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power1.out",
        });
      };

      // Click animation with ripple effect
      const handleMouseDown = (e: MouseEvent) => {
        gsap.to(button, {
          scale: 0.98,
          duration: 0.1,
          ease: "power1.in",
        });

        createRipple(e, button);
      };

      const handleMouseUp = () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.1,
          ease: "elastic.out(1, 0.5)",
        });
      };

      // Ripple effect function
      const createRipple = (e: MouseEvent, element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("div");
        ripple.className = "btn-ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        element.appendChild(ripple);

        // Animate ripple
        ripple.classList.add("animate-ripple");

        // Clean up the ripple
        setTimeout(() => {
          if (ripple.parentNode === element) {
            element.removeChild(ripple);
          }
        }, 700);
      };

      // Add event listeners
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("mousedown", handleMouseDown as EventListener);
      button.addEventListener("mouseup", handleMouseUp);

      // Cleanup
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener(
          "mousedown",
          handleMouseDown as EventListener
        );
        button.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);

    return (
      <button
        ref={buttonInternalRef}
        className={twMerge(getBaseStyles(variant, size, fullWidth), className)}
        {...props}
      >
        <span className={getContentStyles(variant, iconPosition)}>
          {iconPosition === "left" &&
            (icon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-0 translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ))}
          <span>{children}</span>
          {iconPosition === "right" &&
            (icon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ))}
        </span>
        <div className={getOverlayStyles(variant)}></div>
      </button>
    );
  }
);

Button.displayName = "Button";

// The LinkButton component (for Link elements)
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      className = "",
      href,
      ...props
    },
    ref
  ) => {
    const linkInternalRef = useRef<HTMLAnchorElement>(null);
    const linkRef = ref || linkInternalRef;

    useEffect(() => {
      const link = linkInternalRef.current;
      if (!link) return;

      const handleMouseEnter = () => {
        gsap.to(link, { y: -5, scale: 1.02, duration: 0.3, ease: "power1.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(link, { y: 0, scale: 1, duration: 0.3, ease: "power1.out" });
      };
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    // Detect external link
    const isExternal =
      href && (href.startsWith("http://") || href.startsWith("https://"));

    const commonProps = {
      ref: linkInternalRef,
      className: twMerge(getBaseStyles(variant, size, fullWidth), className),
      ...props,
    };

    if (isExternal) {
      // 🔗 External link: use <a>
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
          {children}
        </a>
      );
    }

    // 🏠 Internal link: use Next.js <Link>
    return (
      <Link href={href || "#"} {...commonProps}>
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";
