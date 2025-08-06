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
  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      responsibleResearcher: '',
      status: ProjectStatus.PENDING,
      latitude: '0.0',
      longitude: '0.0',
    },
  });

  const onSubmit = async (data: CreateProjectFormData) => {
    form.reset();
    try {
      const payload: CreateProjectDto = {
        name: data.name,
        status: data.status,
        responsibleResearcher: data.responsibleResearcher,
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
        },
      };

      await onCreate(payload);

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Falha ao criar projeto:', error);
    }
    console.log('Dados do projeto:', data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
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

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 40.7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: -23.5546"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                className="cursor-pointer"
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="cursor-pointer"
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
