import type { ReactNode } from 'react';
// Native anchors preserve URL hashes, focus and keyboard navigation without a RAF loop.
export function SmoothScroll({ children }: { children: ReactNode }) { return <>{children}</>; }
