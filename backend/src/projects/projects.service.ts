import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectStatus } from './enums/project-status.enum';

interface IStatusCount {
  status: ProjectStatus;
  count: string;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  create(dto: CreateProjectDto) {
    const project = this.repository.create(dto);
    return this.repository.save(project);
  }

  async findAll(nameFilter?: string) {
    const queryBuilder = this.repository.createQueryBuilder('project');

    if (nameFilter) {
      queryBuilder.where('project.name ILIKE :name', {
        name: `%${nameFilter}%`,
      });
    }
    const [projects, total] = await queryBuilder.getManyAndCount();

    const statusCountsResult: IStatusCount[] = await this.repository
      .createQueryBuilder('project')
      .select('project.status', 'status')
      .addSelect('COUNT(project.id)', 'count')
      .groupBy('project.status')
      .getRawMany();

    const statusCounts = {
      [ProjectStatus.ACTIVE]: 0,
      [ProjectStatus.PENDING]: 0,
      [ProjectStatus.FINISHED]: 0,
    };

    statusCountsResult.forEach((item) => {
      statusCounts[item.status] = parseInt(item.count, 10);
    });

    return {
      data: projects,
      total,
      statusCounts,
    };
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id: id });
  }

  async remove(id: string) {
    const project = await this.repository.findOneBy({ id: id });
    if (!project) return null;
    return this.repository.remove(project);
  }
}
