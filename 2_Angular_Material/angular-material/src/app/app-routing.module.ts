import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BlogPageComponent } from './blog/blog-page/blog-page.component';
import { SingleBlogComponent } from './blog/single-blog/single-blog.component';
import { PostComponent } from './blog/post/post.component';

const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "blog", children: [
    { path: "", component: BlogPageComponent},
    { path: "my-best-blog", component: PostComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
