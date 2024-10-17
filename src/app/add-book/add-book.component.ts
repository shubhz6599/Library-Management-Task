import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { StringOnlyDirective } from '../directives/string-only.directive';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from '../directives/numbers-only.directive';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StringOnlyDirective, CommonModule, NumbersOnlyDirective],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'] // Fixed: styleUrl -> styleUrls
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.addBookForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Fixed Validators syntax
      bookName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      publication: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      bookDetails: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      qty: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      price: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      branch: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.addBookForm.valid) {
      const newBook = this.addBookForm.value;
      this.bookService.addBook(newBook); // Call service to add book
      alert('Book added successfully!');
      this.addBookForm.reset(); // Reset the form after submission
    }
  }
}
