import { IsString, IsNotEmpty, MaxLength, IsIn } from 'class-validator';
import { IsGeoJSON } from './../../utils/validators/geojson.validator';
import type { Geometry } from 'geojson';
import { ProjectStatus } from '../enums/project-status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @IsIn(Object.values(ProjectStatus))
  status: ProjectStatus;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  responsibleResearcher: string;

  @IsGeoJSON()
  geometry: Geometry;
}
