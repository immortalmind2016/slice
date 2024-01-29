import { Author } from '../../author/entities/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  quoteId: number;

  @Column()
  quote: string;

  @Column({ name: 'authorId' })
  authorId: number;

  @ManyToOne(() => Author, (author) => author.quotes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
