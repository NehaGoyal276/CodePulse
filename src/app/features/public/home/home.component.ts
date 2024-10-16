import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]> ; 
blog: any;

  constructor(private blogPOstService: BlogPostService,
    private categoryService: CategoryService
  ){}
  
  
  ngOnInit(): void {
    this.blogs$=this.blogPOstService.getALlBlogPosts();
  }



}
