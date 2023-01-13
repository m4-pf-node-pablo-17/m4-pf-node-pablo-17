import { AppDataSource } from '../data-source';
import { Post } from '../entities/post.entity';

const listAllMessagesFromPostService = async (postId: number) => {
    const postRepository = AppDataSource.getRepository(Post)

    const messages = await postRepository.createQueryBuilder('post').
    innerJoinAndSelect('post.pageContents', 'pageContents').
    innerJoinAndSelect('pageContents.comments', 'comments').
    where('post.id = :id_post', {id_post: postId}).
    select(['post.id as id_post', 'pageContents', 'comments']).
    getRawMany()

    return messages
}

export default listAllMessagesFromPostService