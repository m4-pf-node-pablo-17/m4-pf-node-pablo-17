import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Store } from "./store.entity";
import { User } from "./user.entity";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => User, (users) => users.products, { eager: true })
  user: User;

  @ManyToOne(() => Store, (store) => store.products, { eager: true })
  store: Store;
}

export { Product };
