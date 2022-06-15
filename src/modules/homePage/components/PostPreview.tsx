import { IPost } from '@typess/postType';
import { Link } from 'react-router-dom';

type Props = {
  post: IPost;
};

const PostPreview: React.FC<Props> = ({ post }: Props) => {
  return (
    <Link to={`post/${post.id}`}>
      <div className="border-2 border-gray-400 rounded-md p-4 h-full">
        <h3 className="text-base font-semibold mb-2">{post.title}</h3>
        <p className="text-sm">{post.body}</p>
      </div>
    </Link>
  );
};

export default PostPreview;
