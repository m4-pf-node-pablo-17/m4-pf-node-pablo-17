import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Product } from "./products.entities";

@Entity("store")
class Store {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  category: string;

  @Column()
  contact: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Product, (product) => product.store)
  products: Product;
}

export { Store };
