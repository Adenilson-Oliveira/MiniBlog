import styles from './Post.module.css'

// hooks
import { Link, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const { id } = useParams()
    // console.log(id)
    const { document: post, loading } = useFetchDocument('posts', id)

    console.log(post)
  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={`${post.image}`} alt={post.title}/>
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
          <Link to='/' className='btn btn-outline'>Voltar</Link>
        </>
      )}
    </div>
  )
}

export default Post