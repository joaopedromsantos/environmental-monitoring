import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import type { Geometry } from 'geojson';
import { ProjectStatus } from '../enums/project-status.enum';
import { nanoid } from 'nanoid';

@Entity('projects')
export class Project {
  @PrimaryColumn({
    length: 29,
  })
  id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @Column({
    length: 60,
    nullable: false,
  })
  responsibleResearcher: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  geometry: Geometry;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = `project_${nanoid()}`;
  }
}
