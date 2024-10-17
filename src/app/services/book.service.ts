import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Observable book list that updates dynamically
  private books = new BehaviorSubject<Book[]>([]);
  books$ = this.books.asObservable();

  // Add a new book
  addBook(newBook: Book) {
    const currentBooks = this.books.getValue();
    this.books.next([...currentBooks, newBook]);
  }

  // Get the latest list of books
  getBooks() {
    return this.books.getValue();
  }

  // Delete a book by index
  deleteBook(index: number) {
    const currentBooks = this.books.getValue();
    currentBooks.splice(index, 1); // Remove the book from the array
    this.books.next([...currentBooks]); // Update the observable with the new array
  }
}
