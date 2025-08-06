import type { ProjectStatus } from "@/types";


const statusTranslations: Record<ProjectStatus, string> = {
  Active: 'Ativo',
  Finished: 'Finalizado',
  Pending: 'Pendente',
};

export function translateStatus(status: ProjectStatus): string {
  return statusTranslations[status] || status;
}


const statusClasses: Record<ProjectStatus, string> = {
  Active: 'bg-green-500/20 text-green-800 border-green-500/30',
  Finished: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
  Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
};

export function getStatusClasses(status: ProjectStatus): string {
  return statusClasses[status] || '';
}