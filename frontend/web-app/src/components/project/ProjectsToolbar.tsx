import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectsToolbarProps {
  projectCount: number;
  onNewProjectClick: () => void;
}

export function ProjectsToolbar({
  projectCount,
  onNewProjectClick,
}: ProjectsToolbarProps) {
  return (
    <div className="border-border flex items-center justify-between border-b p-4 px-6">
      <h2 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
        Projetos ({projectCount})
      </h2>
      <Button
        size="sm"
        className="shadow-sm"
        onClick={onNewProjectClick}
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Projeto
      </Button>
    </div>
  );
}
