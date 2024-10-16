import { Category } from "../../category/models/category.model";

export interface BlogPost{
    id:string;
    title:string;
    urlHandle:string;
    featuredImageUrl:string;
    shortDesc:string;
    content:string;
    
    author: string;
    publishedDate:Date;
    isVisible:boolean;
    categories:Category[];
}