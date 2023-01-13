import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/post.entity';
//import { respCommentFromPostSchema } from '../../schemas/comment/schemaComment';

const listAllMessagesFromPostService = async (postId: string) => {
    const postRepository = AppDataSource.getRepository(Post)

    const messages = await postRepository.createQueryBuilder('post').
    innerJoinAndSelect('post.pageContents', 'pageContents').
    innerJoinAndSelect('pageContents.comments', 'comments').
    where('post.id = :id_post', {id_post: postId}).
    select(['post.id as id_post', 'comments']).
    getRawMany()

    return messages
}

export default listAllMessagesFromPostService