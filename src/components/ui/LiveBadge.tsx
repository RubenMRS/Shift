import React from "react";
import { cn } from "../../lib/utils";

interface LiveBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export const LiveBadge = React.forwardRef<HTMLDivElement, LiveBadgeProps>(
  ({ className, text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-md bg-bg-surface/50 text-xs font-semibold text-text-secondary uppercase tracking-wider",
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 motion-reduce:animate-none"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
        </span>
        {text}
      </div>
    );
  }
);

LiveBadge.displayName = "LiveBadge";
