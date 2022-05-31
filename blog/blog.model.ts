export class Blog {
    id: number;
    businessid: number;
    categoryid: number;
    title: any;
    urltitle: any;
    createdon: string;
    author: string;
    picpath: string;
    body: string;
    
    status: any;
  
    constructor(blog) {
        this.id = blog.id || 0;
        this.businessid = blog.businessid || 0;
        this.categoryid = blog.categoryid || 0;
        this.title=  blog.title || "";
        this.urltitle=  blog.urltitle || "";
        this.createdon = blog.createdon || "";
        this.author = blog.author || "";
        this.picpath = blog.picpath || "";
        this.body = blog.body || 0;
        this.status= blog.status ||"";
    }
  }