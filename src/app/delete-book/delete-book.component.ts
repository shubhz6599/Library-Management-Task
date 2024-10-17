import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent implements OnInit {
  books: Book[] | any = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks(); // Load books when the component initializes
    this.bookService.books$.subscribe(updatedBooks => {
      this.books = updatedBooks; // Subscribe to the observable to get real-time updates
    });
  }

  loadBooks() {
    this.books = this.bookService.getBooks(); // Fetch the initial book list
  }

  deleteBook(index: number) {
    this.bookService.deleteBook(index); // Call the service to delete the book
  }
}

