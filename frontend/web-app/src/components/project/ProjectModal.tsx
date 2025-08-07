import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectSchema,
  type CreateProjectFormData,
} from '@/schemas/project.schema';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ProjectStatus, type CreateProjectDto } from '@/types';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useProjectsContext } from '@/contexts/ProjectsContext';

interface NewProjectModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreate: (data: CreateProjectDto) => Promise<void>;
}

export function NewProjectModal({
  isOpen,
  onOpenChange,
  onCreate,
}: NewProjectModalProps) {
  const { drawnGeometry, setDrawnGeometry, setIsDrawingOnMap } =
    useProjectsContext();

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      responsibleResearcher: '',
      status: ProjectStatus.PENDING,
    },
  });

  useEffect(() => {
    if (drawnGeometry) {
      form.setValue('geometry', drawnGeometry);
      setDrawnGeometry(null);
      onOpenChange(true);
    }
  }, [drawnGeometry, form, setDrawnGeometry, onOpenChange]);

  const onSubmit = async (data: CreateProjectFormData) => {
    try {
      await onCreate(data);
      onOpenChange(false);
      form.reset();
    } catch {
      toast.error('Erro ao criar projeto. Tente novamente.');
    }
  };

  const handleModalStateChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setIsDrawingOnMap(false);
      setDrawnGeometry(null);
      form.reset();
    }
  };

  const handleDrawClick = () => {
    setIsDrawingOnMap(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para cadastrar um novo projeto de
            monitoramento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Projeto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Análise da Qualidade da Água"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleResearcher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesquisador Responsável</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Dra. Helena Costa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value={ProjectStatus.ACTIVE}
                        className="cursor-pointer focus:bg-green-100 focus:text-green-900"
                      >
                        Ativo
                      </SelectItem>
                      <SelectItem
                        value={ProjectStatus.PENDING}
                        className="cursor-pointer focus:bg-yellow-100 focus:text-yellow-900"
                      >
                        Pendente
                      </SelectItem>
                      <SelectItem
                        value={ProjectStatus.FINISHED}
                        className="cursor-pointer focus:bg-gray-200 focus:text-gray-900"
                      >
                        Finalizado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleDrawClick}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {form.watch('geometry')
                ? 'Área Definida (Clique para redesenhar)'
                : 'Desenhar Área no Mapa'}
            </Button>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleModalStateChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"                
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Criando...' : 'Criar Projeto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
