import { DataType, newDb } from 'pg-mem';
import { User } from '../../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Quote } from '../../quote/entities/quote.entity';

export const setupDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  // Register current_database function
  db.public.registerFunction({
    name: 'current_database',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world ${x}`,
  });

  db.public.registerFunction({
    name: 'version',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world ${x}`,
  });

  db.public.registerFunction({
    name: 'RANDOM',
    args: [],
    returns: DataType.record,
    implementation: () => `hello world`,
  });

  db.public.registerFunction({
    name: 'obj_description',
    args: [DataType.regclass, DataType.text],
    returns: DataType.text,
    implementation: (x) => `hello world ${x}`,
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [User, Author, Quote],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
