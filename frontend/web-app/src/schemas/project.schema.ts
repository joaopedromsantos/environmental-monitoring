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

  latitude: z
    .string()
    .min(1, 'Latitude é obrigatória.')
    .max(10, 'Latitude não pode ter mais de 10 caracteres.')
    .transform((val) => val.replace(',', '.'))
    .refine((val) => !isNaN(Number(val)), {
      message: 'Latitude deve ser um número válido.',
    })
    .refine((num) => Math.abs(Number(num)) <= 90, {
      message: 'Latitude deve estar entre -90 e 90.',
    }),

  longitude: z
    .string()
    .min(1, 'Longitude é obrigatória.')
    .max(10, 'Longitude não pode ter mais de 10 caracteres.')
    .transform((val) => val.replace(',', '.'))
    .refine((val) => !isNaN(Number(val)), {
      message: 'Longitude deve ser um número válido.',
    })
    .refine((num) => Math.abs(Number(num)) <= 180, {
      message: 'Deve estar entre -180 e 180',
    }),
    
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
