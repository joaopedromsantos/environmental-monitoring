import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface ProjectHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function ProjectHeader({
  searchTerm,
  setSearchTerm,
}: ProjectHeaderProps) {
  return (
    <div className="border-border border-b p-6">
      <h2 className="text-foreground mb-4 text-xl font-semibold">
        Projetos Ambientais
      </h2>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Buscar projetos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background pl-9"
        />
      </div>
    </div>
  );
}
