import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pageContent')
class PageContent {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}

export { PageContent };
