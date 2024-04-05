import { useState } from 'react'
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'

export default function NewPosts() {
    const [image, setImage] = useState(null);
    const [creator, setCreator] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleImageUpload = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleCreate = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
            const res = await axios.post(`${BASE_URL}/post/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            createPost(res.data.filename);
        }
    }

    const createPost = async (imageUrl: string) => {
        const res = await axios.post(`${BASE_URL}/post/`, {
            title: title,
            creator: creator,
            content: text,
            image_url: imageUrl,
        });
        window.location.reload();

        return JSON.stringify(res.data);
    }

    return (
        <div className='flex flex-col items-center'>
            <form className="flex flex-col items-center w-1/2" onSubmit={handleCreate}>
                <input className="w-3/4 p-1 mb-2 border border-gray-400" type="file" accept="image/*" onChange={handleImageUpload} />
                <input className="w-full p-1 mb-2 border border-gray-400" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input className="w-full p-1 mb-2 border border-gray-400" type="text" placeholder="Author" value={creator} onChange={e => setCreator(e.target.value)} />
                <textarea className="w-full h-32 p-1 mb-2 border border-gray-400" placeholder="Content" value={text} onChange={e => setText(e.target.value)}></textarea>

                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Submit</button>

            </form>



        </div>
    )
}
