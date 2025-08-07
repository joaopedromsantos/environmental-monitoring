import * as z from 'zod';
import { ProjectStatus } from '@/types';

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.')
    .max(50, 'O nome não pode ter mais de 50 caracteres.'),

  responsibleResearcher: z
    .string()
    .min(5, 'O nome do pesquisador é obrigatório.')
    .max(60, 'O nome do pesquisador não pode ter mais de 60 caracteres.'),

  status: z.enum(ProjectStatus),
  geometry: z.any().refine((val) => val && val.type && val.coordinates, {
    message: 'Geometria inválida. Por favor, desenhe no mapa.',
  }),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
