import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PageContent } from './pageContent.entity';
import { User } from './user.entity';

@Entity('post')
class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => PageContent, (pageContents) => pageContents.post)
    pageContents: PageContent;
}

export { Post };
