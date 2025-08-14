import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const buttonVariants = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  outline:
    "border border-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  link: "text-blue-500 hover:underline bg-transparent p-0 h-auto",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  variant = "default",
  size = "md",
  href,
  external = false,
  disabled = false,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = buttonVariants[variant];
  const sizeClasses = variant === "link" ? "" : buttonSizes[size];

  const combinedClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  // If href is provided, render as Link or anchor
  if (href) {
    if (external) {
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
