import React from "react";
import { cn } from "../../lib/utils";

interface ControlIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
}

export const ControlIcon = React.forwardRef<HTMLDivElement, ControlIconProps>(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-11 h-11 flex items-center justify-center bg-bg-surface border border-border rounded-md text-text-primary transition-colors group-hover:border-signal group-hover:text-signal",
          className
        )}
        {...props}
      >
        <Icon className="w-5 h-5 transition-colors" />
      </div>
    );
  }
);

ControlIcon.displayName = "ControlIcon";
