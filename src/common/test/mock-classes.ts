import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';

export class MockUserRepository extends Repository<User> {}
