import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  cep: string;

  //insert FK usuario here.
  //insert FK loja here.
}

export default Address;
