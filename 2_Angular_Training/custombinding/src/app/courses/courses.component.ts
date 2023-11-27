import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses = [
    {
      id: 101,
      name: "Angular for Beginners",
      author: "Steve Smith",
      duration: 19.5,
      type: "Free",
      price: 0.00,
      ratings: 4.8,
      image: 'assets/courses/course-img-1.png',
      description: 'In this course, you will learn the fundamentals of Angular. The course is purely project-based.'
    },
    {
      id: 102,
      name: "React Fundamentals",
      author: "Emily Johnson",
      duration: 15.0,
      type: "Premium",
      price: 29.99,
      ratings: 4.5,
      image: 'assets/courses/course-img-2.png',
      description: 'This React fundamentals course covers the core concepts and best practices in building React applications.'
    },
    {
      id: 103,
      name: "Java Programming Mastery",
      author: "John Davis",
      duration: 25.0,
      type: "Premium",
      price: 49.99,
      ratings: 4.7,
      image: 'assets/courses/course-img-3.webp',
      description: 'Master the art of Java programming with this comprehensive course covering advanced topics and real-world projects.'
    },
    {
      id: 104,
      name: "Django Web Development",
      author: "Sophia Miller",
      duration: 22.5,
      type: "Premium",
      price: 39.99,
      ratings: 4.6,
      image: 'assets/courses/course-img-4.jpg',
      description: 'Build powerful web applications with Django. This course includes hands-on projects and best practices in Django development.'
    },
    {
      id: 105,
      name: "Flask for Beginners",
      author: "Alex Turner",
      duration: 18.0,
      type: "Premium",
      price: 0.00,
      ratings: 4.5,
      image: 'assets/courses/course-img-5.png',
      description: 'Learn the basics of Flask and create your first web application. This course is perfect for beginners in web development.'
    },
    {
      id: 106,
      name: "ExpressJS Masterclass",
      author: "Daniel White",
      duration: 20.0,
      type: "Free",
      price: 34.99,
      ratings: 4.8,
      image: 'assets/courses/course-img-6.jpg',
      description: 'Become an ExpressJS expert with this comprehensive masterclass. Includes real-world examples and advanced topics.'
    },
    {
      id: 107,
      name: "TypeScript Essentials",
      author: "Lily Thompson",
      duration: 14.5,
      type: "Free",
      price: 0.00,
      ratings: 4.7,
      image: 'assets/courses/course-img-7.webp',
      description: 'Get started with TypeScript and enhance your JavaScript skills. This course covers the basics and advanced features of TypeScript.'
    },
    {
      id: 108,
      name: "Python for Data Science",
      author: "Michael Robinson",
      duration: 30.0,
      type: "Premium",
      price: 59.99,
      ratings: 4.9,
      image: 'assets/courses/course-img-8.png',
      description: 'Unlock the power of Python for data science. This course includes hands-on projects and practical applications in data analysis.'
    },
    {
      id: 109,
      name: "React Native for Beginners",
      author: "Jessica Carter",
      duration: 24.0,
      type: "Premium",
      price: 44.99,
      ratings: 4.6,
      image: 'assets/courses/course-img-9.png',
      description: 'Build cross-platform mobile apps with React Native. This course covers development for iOS and Android platforms.'
    },
    {
      id: 110,
      name: "Advanced Python",
      author: "David Anderson",
      duration: 28.0,
      type: "Free",
      price: 54.99,
      ratings: 4.8,
      image: 'assets/courses/course-img-10.webp',
      description: 'Take your Python skills to the next level with advanced programming techniques, design patterns, and real-world projects.'
    }
  ];

  getTotalCourses(){
    return this.courses.length;
  }

  getTotalFreeCourses(){
    return this.courses.filter(course => course.type=="Free").length;
  }

  getTotalPremiumCourses(){
    return this.courses.filter(course => course.type=="Premium").length;
  }

  courseCountRadioButton: string = 'All';

  onFilterRadioButtonChanged(data:string){
    this.courseCountRadioButton = data;
    // console.log("Parent")
    // console.log(this.courseCountRadioButton);
  }

  searchText:string = '';

  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
    console.log(this.searchText);
  }
}
