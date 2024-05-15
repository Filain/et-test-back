import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EventEntity } from './events.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'varchar', length: 30, nullable: true })
  name?: string;

  @Column({ type: 'varchar', unique: true, length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  where_here?: string;

  @Column({ type: 'date', nullable: true })
  date_birth?: Date;

  @Column()
  event_id: number;
  @ManyToOne(() => EventEntity, (entity) => entity.event)
  @JoinColumn({ name: 'event_id' })
  user?: EventEntity;
}
