import type { SVGProps } from 'react';

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z"
        stroke="url(#quantum-gradient)"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2.5" fill="url(#quantum-gradient)" strokeWidth="0" />
      <circle cx="8" cy="10" r="1.5" fill="url(#quantum-gradient)" strokeWidth="0" />
      <circle cx="16" cy="10" r="1.5" fill="url(#quantum-gradient)" strokeWidth="0" />
      <circle cx="10" cy="15" r="1" fill="url(#quantum-gradient)" strokeWidth="0" />
      <circle cx="14" cy="15" r="1" fill="url(#quantum-gradient)" strokeWidth="0" />
      <circle cx="12" cy="8" r="1" fill="url(#quantum-gradient)" strokeWidth="0" />
      <path d="M12 12l-4 -2" stroke="url(#quantum-gradient)" />
      <path d="M12 12l4 -2" stroke="url(#quantum-gradient)" />
      <path d="M12 12l-2 3" stroke="url(#quantum-gradient)" />
      <path d="M12 12l2 3" stroke="url(#quantum-gradient)" />
      <path d="M10 15l-2-5" stroke="url(#quantum-gradient)" />
      <path d="M14 15l2-5" stroke="url(#quantum-gradient)" />
    </svg>
  ),
};
