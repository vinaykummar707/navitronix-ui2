import React from "react";

interface LanguageBadgeProps {
  langCode: string;
  label: string;
}

/**
 * Language badge display component [web:62][web:65]
 */
export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ 
  langCode, 
  label 
}) => (
  <span className="flex items-center gap-4">
    <span
      className="flex text-xs capitalize size-8 shrink-0 items-center bg-pink-900 justify-center rounded-full border"
      aria-hidden="true"
    >
      {langCode}
    </span>
    <span className="flex flex-col space-y-0.5">
      <span>{label}</span>
    </span>
  </span>
);
