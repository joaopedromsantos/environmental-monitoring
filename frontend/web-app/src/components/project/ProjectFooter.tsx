export interface StatItemProps {
  label: string;
  count: number;
  className?: string;
}

export interface ProjectFooterProps {
  stats: {
    active: number;
    finished: number;
    pending: number;
  };
}

function StatItem({ label, count, className }: StatItemProps) {
  return (
    <div>
      <div className={`text-lg font-semibold ${className}`}>{count}</div>
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  );
}

export function ProjectFooter({ stats }: ProjectFooterProps) {
  return (
    <div className="border-border bg-background/50 border-t p-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <StatItem
          label="Ativo"
          count={stats.active}
          className="text-green-600"
        />
        <StatItem
          label="Finalizado"
          count={stats.finished}
          className="text-gray-500"
        />
        <StatItem
          label="Pendente"
          count={stats.pending}
          className="text-amber-500"
        />
      </div>
    </div>
  );
}
