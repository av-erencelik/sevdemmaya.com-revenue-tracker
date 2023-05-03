import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage: string | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ errorMessage, className, ...props }, ref) => {
  return (
    <>
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <p className="mt-1 px-1 pb-2 text-center text-xs text-destructive">{errorMessage}</p>
    </>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
