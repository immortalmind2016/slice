import { Author } from '../../author/entities/author.entity';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';

export class MockUserRepository extends Repository<User> {}
export class MockAuthorRepository extends Repository<Author> {}
