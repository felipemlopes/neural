"use client";

import type { CSSProperties, ReactNode } from "react";

export const inputStyle: CSSProperties = {
  width: "100%",
  background: "#0f1520",
  border: "1px solid rgba(0,212,232,0.15)",
  borderRadius: 4,
  padding: "9px 12px",
  color: "#e8edf2",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  outline: "none",
};

export function Panel({
  children,
  style,
  title,
}: {
  children: ReactNode;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <div
      style={{
        background: "#0a0e14",
        border: "1px solid rgba(0,212,232,0.12)",
        borderRadius: 6,
        padding: 20,
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 10,
            letterSpacing: 2,
            color: "#3d5060",
            fontFamily: "var(--font-display)",
            marginBottom: 16,
          }}
        >
          {title.toUpperCase()}
        </div>
      )}
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: 2,
            color: "#fff",
          }}
        >
          {title}
        </h1>
        {subtitle && <div style={{ fontSize: 11, color: "#3d5060", marginTop: 4 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 10,
          letterSpacing: 1.5,
          color: "#3d5060",
          fontFamily: "var(--font-display)",
          marginBottom: 6,
        }}
      >
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "ghost" | "danger" | "accent";

export function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
  type = "button",
  style,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    border: "none",
    padding: "9px 18px",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 2,
    cursor: disabled ? "wait" : "pointer",
    borderRadius: 4,
    opacity: disabled ? 0.7 : 1,
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: { background: "#00d4e8", color: "#07090d" },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(0,212,232,0.25)",
      color: "#6b7c8f",
    },
    danger: {
      background: "transparent",
      border: "1px solid rgba(232,64,64,0.35)",
      color: "#e84040",
    },
    accent: {
      background: "rgba(0,212,232,0.12)",
      border: "1px solid #00d4e8",
      color: "#00d4e8",
    },
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...(props.style ?? {}) }} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...inputStyle, minHeight: 80, resize: "vertical", ...(props.style ?? {}) }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...inputStyle, cursor: "pointer", ...(props.style ?? {}) }} />;
}

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: checked ? "#00d4e8" : "#1e2d35",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: checked ? "#07090d" : "#3d5060",
          position: "absolute",
          top: 3,
          left: checked ? 21 : 3,
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

export function Badge({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "var(--font-display)",
        letterSpacing: 1,
        color,
      }}
    >
      {children}
    </span>
  );
}

export function Loading({ label = "CARREGANDO..." }: { label?: string }) {
  return (
    <div
      style={{
        background: "#0a0e14",
        border: "1px solid rgba(0,212,232,0.12)",
        borderRadius: 6,
        padding: 40,
        textAlign: "center",
        fontSize: 12,
        letterSpacing: 2,
        color: "#3d5060",
        fontFamily: "var(--font-display)",
      }}
    >
      {label}
    </div>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      style={{
        background: "rgba(232,64,64,0.08)",
        border: "1px solid rgba(232,64,64,0.3)",
        borderRadius: 4,
        padding: "10px 14px",
        fontSize: 12,
        color: "#e84040",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "transparent",
            border: "1px solid rgba(232,64,64,0.4)",
            color: "#e84040",
            padding: "5px 12px",
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: 1.5,
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          TENTAR NOVAMENTE
        </button>
      )}
    </div>
  );
}

export function MoveButtons({
  onUp,
  onDown,
  disabledUp,
  disabledDown,
}: {
  onUp: () => void;
  onDown: () => void;
  disabledUp: boolean;
  disabledDown: boolean;
}) {
  const btn: CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(0,212,232,0.2)",
    color: "#00d4e8",
    width: 26,
    height: 26,
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    lineHeight: 1,
    opacity: 1,
  };
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button style={{ ...btn, opacity: disabledUp ? 0.3 : 1 }} disabled={disabledUp} onClick={onUp} aria-label="Subir">
        ↑
      </button>
      <button style={{ ...btn, opacity: disabledDown ? 0.3 : 1 }} disabled={disabledDown} onClick={onDown} aria-label="Descer">
        ↓
      </button>
    </div>
  );
}
