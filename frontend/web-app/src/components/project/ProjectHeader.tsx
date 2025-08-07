import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useProjectsContext } from '@/contexts/ProjectsContext';

export function ProjectHeader() {
  const { searchTerm, setSearchTerm } = useProjectsContext();

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
