"use client";

import { useState } from "react";

interface RawCopyButtonProps {
  text: string;
}

export function RawCopyButton({ text }: RawCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className="font-mono text-xs text-primary hover:text-white transition-colors uppercase cursor-copy"
      onClick={handleCopy}
    >
      {copied ? "Copied" : "[Copy]"}
    </button>
  );
}
