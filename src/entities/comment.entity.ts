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

@Entity('comment')
class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @OneToMany(() => PageContent, (pageContents) => pageContents.comments)
    pageContents: PageContent;
}

export { Comment };
