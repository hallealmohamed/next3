"use client";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';

interface ArticleProps {
    article: Article;
}

const EditArticleForm = ({ article }: ArticleProps) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        console.log("article:", article);  // Log the article object
        if (article) {
            console.log("article title:", article.title);  // Log the article title
            setTitle(article.title);
            setDescription(article.description);
        }
    }, [article]);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error("Title is required");
        if (description === "") return toast.error("Description is required");

        try {
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
                title,
                description
            });
            toast.success("Edit successful", {
              autoClose: 7000,  // Notification will auto close after 5 seconds
          });
            
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
        router.refresh();
    };

    return (
        <form onSubmit={formSubmitHandler} className='flex flex-col items-center justify-center'>
            <input
                className='mb-4 border rounded p-2 w-96 text-xl'
                type='text'
                placeholder='Enter title of article'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className='mb-4 p-2 lg:text-xl rounded resize-none w-96'
                rows={5}
                placeholder='Enter article description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg'>
                Edit
            </button>
            <ToastContainer />
        </form>
    );
};

export default EditArticleForm;
