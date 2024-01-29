import { Quote } from '../../quote/entities/quote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Quote, (quote) => quote.author)
  quotes: Quote[];
}
