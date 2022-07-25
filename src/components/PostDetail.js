import styles from './PostDetail.module.css'

import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {

    console.log(post.image)
  return (
    <div className={styles.post_detail}>
        <img src={`${post.image}`} alt={post.title}/>
        <h2>{post.title}</h2>
        <p className={styles.createby}>{post.createBy}</p>

        <div className={styles.tags}>
            {post.tagsArray && post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>

        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail