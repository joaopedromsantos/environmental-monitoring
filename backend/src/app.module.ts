import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Verifica se a aplicação está no ambiente de desenvolvimento
        const isDevelopment = configService.get('NODE_ENV') === 'development';

        if (isDevelopment) {
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            entities: [Project],
            synchronize: true, 
          };
        }

        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          entities: [Project],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),

    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
