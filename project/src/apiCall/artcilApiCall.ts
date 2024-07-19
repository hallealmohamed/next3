import { Article } from '@prisma/client';
import { Comment } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleArticle, SingleComment } from '@/utils/type';
import axios from 'axios';
export async function getAllArticle(pageNumber:string | undefined):Promise<Article[]>
{
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`);
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
    return await response.json();
}
export async function getAllArticlee():Promise<Article[]>
{
    const response = await fetch(`${DOMAIN}/api/articles/admin`);
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
    return await response.json();
}

export async function getArtcilBasesearchText(searchText:string ):Promise<Article[]>
{
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
    return response.json();
}

export async function getSingalArticle(articlid:string ):Promise<SingleArticle>
{
    const response = await fetch(`${DOMAIN}/api/articles/${articlid}`);

    // if (!response.ok) {
    //   throw new Error('failed to fetch data');
    // }
    const data = await response.json();
    console.log('Data fetched from API:', data);
  
   
  
    return data as SingleArticle;
}
export async function getAllComments(): Promise<SingleComment[] | undefined> {
    try {
        const response = await axios.get(`${DOMAIN}/api/comments`);
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
  
        const comments: SingleComment[] = response.data; // Assurez-vous que les données correspondent à votre type Comment
        
        return comments;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return undefined; // Return undefined in case of an error
    }
  }
  