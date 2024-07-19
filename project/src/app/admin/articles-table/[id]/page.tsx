import React from 'react'
import EditArticleForm from '@/components/aritcles/EditArticleForm';
import { getSingalArticle } from '@/apiCall/artcilApiCall';
import { SingleArticle } from '@/utils/type';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { Article } from '@prisma/client';


interface SingleArticlePageProps {
    params: {
        id: string;
    }
}

const Page = async ({ params }: SingleArticlePageProps) => {
  const articleId = params.id;
  try {
      const response = await axios.get(`${DOMAIN}/api/articles/${articleId}`);
      const data = response.data;
      const article: Article = data.article; // Extract the article object
      console.log("Fetched article:", article);

      return (
          <div>
              <EditArticleForm article={article} />
          </div>
      );
  } catch (error) {
      console.error("Failed to fetch article:", error);
      return (
          <div>
              <p>Failed to load article</p>
          </div>
      );
  }
}

export default Page;