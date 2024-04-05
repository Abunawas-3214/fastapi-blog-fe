import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import NewPosts from './NewPosts'

const BASE_URL = 'http://127.0.0.1:8000'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/post/`)
        setPosts(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  return (
    <main className='self-center w-2/3 px-24 py-4 mx-auto space-y-10'>
      <h1 className='text-4xl font-bold text-center'> Open City Blog</h1>
      <div className='space-y-12'>
        {
          posts.length > 0 && posts.map((post, index) => (
            <Post key={index} Post={post} />
          ))
        }
      </div>
      <NewPosts />
    </main >
  )
}

export default App
