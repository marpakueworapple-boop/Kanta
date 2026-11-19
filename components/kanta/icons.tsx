/*
  Kanta line icons — the exact same drawings as the "Icon/…" components in Figma.
  24px grid, 1.75 stroke, colour comes from the text colour (currentColor).
*/
import type { SVGProps } from "react";

export type IconName =
  | "search" | "bell" | "bag" | "sliders" | "heart" | "home" | "explore" | "plus" | "user"
  | "arrow" | "verified" | "men" | "women" | "shoes" | "bags" | "accessories" | "mail" | "logout";

const paths: Record<IconName, React.ReactNode> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  bag: (<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>),
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  home: (<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>),
  explore: (<><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></>),
  plus: <path d="M12 5v14M5 12h14" />,
  user: (<><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></>),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  verified: (<><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>),
  men: <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />,
  women: (<><path d="M9 2l1.2 4.5L6 22h12L13.8 6.5 15 2" /><path d="M10.2 6.5h3.6" /><path d="M7.6 15.5c2.8 1 6 1 8.8 0" /></>),
  shoes: (<><path d="M2 17V9.5l4-2.5 2.6 3.2c1.6 1.1 4.2 1.7 6.6 2.1l4.8 1.2A2.6 2.6 0 0 1 22 16v1z" /><path d="M2 20.5h20" /><path d="M10.5 11.5l-1 2M13.5 12.4l-.8 1.6" /></>),
  bags: (<><path d="M5 8h14l1.5 13.5h-17z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>),
  accessories: (<><circle cx="12" cy="12" r="6" /><path d="M12 10v2l1.2 1.2" /><path d="M16.1 7.7 15.5 2h-7l-.6 5.7M7.9 16.3 8.5 22h7l.6-5.7" /></>),
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>),
  logout: (<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>),
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number; filled?: boolean };

export function Icon({ name, size = 24, filled = false, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
