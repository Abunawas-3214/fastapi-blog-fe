import axios from "axios"

const BASE_URL = 'http://127.0.0.1:8000'

export default function Post({ Post }: any) {
    const deletePost = async (postId: number) => {
        await axios.delete(`${BASE_URL}/post/${postId}`)
        window.location.reload()
    }

    return (
        <div className="grid w-full grid-cols-4 gap-4 h-fit">
            <div className="w-full h-full">
                <img src={`http://127.0.0.1:8000/${Post.image_url}`} alt="post" className="w-full" />
            </div>
            <div className="w-full h-full col-span-3">
                <h4 className="text-lg font-semibold">{Post.title}</h4>
                <h6 className="ml-2 italic text-md">by: {Post.creator}</h6>
                <p className="text-sm">{Post.content}</p>
                <button type="button" className="mt-2 bg-gray-200 hover:opacity-75 py-0.5 px-2 rounded border border-gray-500" onClick={() => deletePost(Post.id)}>Delete Post</button>
            </div>
        </div>
    )
}

