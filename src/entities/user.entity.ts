import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';

// Entities
import { BaseEntity } from './base.entity';

@Entity('user', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ length: 255, nullable: false })
  firstName: string;

  @Column({ length: 255, nullable: false })
  lastName: string;

  @Column({ default: false })
  isDeleted: boolean;

  toJSON() {
    delete this.isDeleted;
    return this;
  }

}
