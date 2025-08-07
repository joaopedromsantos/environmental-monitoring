import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { ProjectStatus } from './enums/project-status.enum';
import { CreateProjectDto } from './dto/create-project.dto';

interface IStatusCount {
  status: ProjectStatus;
  count: string;
}

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: Repository<Project>;

  const mockQueryBuilder: any = {
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
    getManyAndCount: jest.fn(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateProjectDto = {
      name: 'Projeto de Teste',
      status: ProjectStatus.ACTIVE,
      responsibleResearcher: 'Dr. Unitário',
      geometry: { type: 'Point', coordinates: [10, 20] },
    };

    it('should create and save a project', async () => {
      const savedProject = {
        id: 'project_12345',
        ...createDto,
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(savedProject);
      mockRepository.save.mockResolvedValue(savedProject);

      const result = await service.create(createDto);

      expect(result).toEqual(savedProject);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(savedProject);
    });

    it('should throw an error if save fails', async () => {
      const errorMessage = 'Failed to save project';

      mockRepository.create.mockReturnValue(createDto);
      mockRepository.save.mockRejectedValue(new Error(errorMessage));

      await expect(service.create(createDto)).rejects.toThrow(errorMessage);
    });
  });

  describe('findAll', () => {
    const mockProjects = [
      { id: '1', name: 'Proj 1', status: ProjectStatus.ACTIVE },
    ];
    const mockTotal = 1;
    const mockStatusCounts: IStatusCount[] = [
      { status: ProjectStatus.ACTIVE, count: '1' },
    ];

    beforeEach(() => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([
        mockProjects,
        mockTotal,
      ]);
      mockQueryBuilder.getRawMany.mockResolvedValue(mockStatusCounts);
    });

    it('should return all projects and status counts without filters', async () => {
      const result = await service.findAll();

      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(2);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
      expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();

      expect(result).toEqual({
        data: mockProjects,
        total: mockTotal,
        statusCounts: {
          [ProjectStatus.ACTIVE]: 1,
          [ProjectStatus.PENDING]: 0,
          [ProjectStatus.FINISHED]: 0,
        },
      });
    });

    it('should return filtered projects by name', async () => {
      const nameFilter = 'projeto filtered';

      await service.findAll(nameFilter);

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'project.name ILIKE :name',
        { name: `%${nameFilter}%` },
      );
    });
  });

  describe('findOne', () => {
    it('should return a specific project by ID', async () => {
      const projectId = '1';
      const project = { id: '1', name: 'Projeto 1', status: ProjectStatus.ACTIVE };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(project as any);

      const result = await service.findOne(projectId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: projectId });
      expect(result).toEqual(project);
    });

    it('should return null if the project is not found', async () => {
      const projectId = '999';

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(projectId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: projectId });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove project with success', async () => {
      const projectId = '1';
      const projectToRemove = { id: '1', name: 'Projeto 1', status: ProjectStatus.ACTIVE };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(projectToRemove as any);
      jest.spyOn(repository, 'remove').mockResolvedValue(projectToRemove as any);

      const result = await service.remove(projectId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: projectId });
      expect(repository.remove).toHaveBeenCalledWith(projectToRemove);
      expect(result).toEqual(projectToRemove);
    });

    it('should return null if not removed', async () => {
      const projectId = '999';

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.remove(projectId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: projectId });
      expect(repository.remove).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
