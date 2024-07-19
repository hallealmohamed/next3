import { Article,Comment,User } from "@prisma/client";
// export type Article={
//     id:number;
//     userId:number;
//     title:string;
//     body:string;
//   }
  export  type  JWTPayload={
    id:number,
    isAdmin:boolean,
    username:string
};

export type CommentwithUser=Comment & {user:User };
export type SingleArticle=Article & {comments :CommentwithUser};
export type SingleComment=Comment & {user:User} &{article:Article};