import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/comment.entity';
import { PageContent } from '../../entities/pageContent.entity';
import { Post } from '../../entities/post.entity';

const createCommentService = async (
  dataText: string,
  id_post: string,
) => {

  const commentRepository = AppDataSource.getRepository(Comment);
  const postRepository = AppDataSource.getRepository(Post)
  const pageContentRepository = AppDataSource.getRepository(PageContent)

  //TROCAR ESSE ANY 
  const createComment = commentRepository.create(dataText as any)

  const idComment = await commentRepository.save(createComment)

  const createPageContent = pageContentRepository.create({ comments: idComment as any, post: id_post as any})

  const idPost = await pageContentRepository.save(createPageContent)

  console.log(idPost);
  

  return idPost;
};

export default createCommentService;
