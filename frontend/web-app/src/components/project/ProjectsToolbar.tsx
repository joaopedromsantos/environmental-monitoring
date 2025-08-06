import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';


interface ProjectsToolbarProps {
  projectCount: number;
  onNewProjectClick: () => void;
}

export function ProjectsToolbar({ projectCount, onNewProjectClick }: ProjectsToolbarProps) {
  return (
    <div className="flex items-center justify-between p-4 px-6 border-b border-border">
      <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
        Projetos ({projectCount})
      </h2>
      <Button
        size="sm"
        className="cursor-pointer shadow-sm hover:bg-green-700 hover:text-white"
        variant="outline"
        onClick={onNewProjectClick}
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Projeto
      </Button>
    </div>
  );
}