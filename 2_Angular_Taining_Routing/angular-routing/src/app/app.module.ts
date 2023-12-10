import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BannerComponent } from './home/banner/banner.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { PopularComponent } from './home/popular/popular.component';
import { ServicesComponent } from './home/services/services.component';
import { TestimonyComponent } from './home/testimony/testimony.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from './Services/course.service';
import { ServicesService } from './Services/services.service';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '', redirectTo: 'Home', pathMatch: 'full'}, 
  {path: 'Home', component: HomeComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Contact', component: ContactComponent},
  {path: 'Courses', component: CoursesComponent},
  {path: 'Courses/Course/:id', component: CourseDetailComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    ContactComponent,
    AboutComponent,
    CoursesComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    BannerComponent,
    ContactUsComponent,
    PopularComponent,
    ServicesComponent,
    TestimonyComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CurrencyPipe,
    ServicesService, 
    CourseService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
