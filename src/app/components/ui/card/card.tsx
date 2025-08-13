import { cn } from "../../../lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border bg-white shadow p-4", className)}>
      {children}
    </div>
  );
}
