import Api from "../axios/Api";
const ARTICLE_API="/articles"
export const fetchArticles=async()=> {
    return await Api.get(ARTICLE_API);
    }
    export const fetchArticleById=async(articleId)=>{
        return await Api.get(ARTICLE_API + '/' + articleId);
    }
    export const delArticle=async(articleId) =>{
        return await Api.delete(ARTICLE_API + '/' + articleId);
        }
        export const addArticle=async(article)=> {
        return await Api.post(ARTICLE_API, article);
        }
        export   const editArticle=(article) =>{
        return Api.put(ARTICLE_API + '/' + article._id, article);
        }