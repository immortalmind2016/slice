import 'dotenv/config';
import { User } from './user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Author } from './author/author.entity';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Author],
};

export default new DataSource(options);
