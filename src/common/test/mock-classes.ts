import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

export class MockUserRepository extends Repository<User> {}
