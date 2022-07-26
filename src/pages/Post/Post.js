import styles from './Post.module.css'

// hooks
import {useParams} from 'react-router-dom'

const Post = () => {

    const { id } = useParams()

  return (
    <div>
        <h1>Post</h1>
        <p>{id}</p>
    </div>
  )
}

export default Post