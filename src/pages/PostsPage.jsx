import { useEffect, useState } from 'react'
import AddNewPost from '../components/AddNewPost/AddNewPost'
import PostList from '../components/PostList/PostList'
import { PostsContext } from '../contexts'
import { posts } from '../utils/posts'

const PostsPage = () => {
  const [postList, setPostList] = useState(JSON.parse(localStorage.getItem('posts')) ?? posts)

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(postList))
  }, [postList])

  const changedMarked = (id) => {
    const newPostList = postList.map(function (post) {
      return post.id === id ? { ...post, marked: !post.marked } : post
    })

    setPostList(newPostList)
  }

  const handleAddPost = (post) => {
    setPostList([...postList, post])
  }
  return (
    <main>
      <PostsContext.Provider value={{ postList, handleAddPost, changedMarked }}>
        <AddNewPost />
        <PostList />
      </PostsContext.Provider>
    </main>
  )
}
// hadleAddPost перенести из пропса в контекст и использовать в ребенке через useContext
// в компоненте addNewPost удалить  handleAddPost и получить ее из контекста
export default PostsPage
