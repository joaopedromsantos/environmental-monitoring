import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Project } from '@/types';
import { translateStatus, getStatusClasses } from '@/utils/translations';
import { CalendarPlus, Trash2, UserRoundPen } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ProjectListItemProps {
  project: Project;
  onSelect: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectListItem({
  project,
  onSelect,
  onDelete,
}: ProjectListItemProps) {
  return (
    <Card
      key={project.id}
      onClick={() => onSelect(project)}
      className="bg-background cursor-pointer p-4 transition-shadow hover:shadow-md"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-foreground text-sm leading-tight font-medium">
            {project.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusClasses(project.status)}>
              {translateStatus(project.status)}
            </Badge>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructiveGhost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você tem certeza que deseja excluir?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso irá deletar
                    permanentemente o projeto
                    <strong className="text-foreground"> {project.name}</strong>
                    .
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(project.id)}
                  >
                    Sim, excluir projeto
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <UserRoundPen className="h-3 w-3" />
            {project.responsibleResearcher}
          </div>
          <div className="flex items-center gap-1">
            <CalendarPlus className="h-3 w-3" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );
}
