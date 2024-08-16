import { Entity, PrimaryGeneratedColumn, Column, Collection } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  rating: string;

  @Column()
  comment: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
