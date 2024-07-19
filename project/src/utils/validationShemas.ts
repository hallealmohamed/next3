import { MdEmail } from "react-icons/md";
import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string(
    {
      required_error:"required string",
      invalid_type_error:"title should be of type string"
    }
  ).min(2,{message:"lentghn >2 "}).max(200),
  description: z.string().min(2),
});
export const RegisterSchema = z.object({
  username: z.string().min(2,{message:"lentghn >2 "}).max(200),//.optianl
  
  password: z.string().min(2),
  email: z.string().min(5,{message:"lentghn >2 "}).max(200).email(),
});
export const LoginSchema = z.object({
  email: z.string().min(5,{message:"lentghn >2 "}).max(200).email(),
  password: z.string().min(2),
 
});
export const CreateCommentSchema = z.object({
  text: z.string().min(5,{message:"lentghn >2 "}).max(200),
  articleId: z.number(),
 
});
export const UpdateCommentSchema = z.object({
  text: z.string().min(5,{message:"lentghn >2 "}).max(200),
  
 
});
