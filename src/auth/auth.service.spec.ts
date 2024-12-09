import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test/database/utils';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './auth.constants';
import { AdminUser } from '../database/entities/admin-user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtContants.secret,
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AdminUser),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
