import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {
  books: any[] = [];
  noBooksAvailable: boolean = false; // Flag to check if there are no books

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Subscribe to the book list from BookService
    this.bookService.books$.subscribe((books) => {
      this.books = books;
      console.log(books);
    });
  }
}
