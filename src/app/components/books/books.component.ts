import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { MdDialog } from '@angular/material';

import { NewBookModalComponent } from '../../modals/new-book-modal/new-book-modal.component';
import { BooksService, SnackbarService } from '../../services';
import { Book } from '../../models';
import { State } from '../../../custom-types';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    public snackbarService: SnackbarService,
    private localStorageService: LocalStorageService,
    public dialog: MdDialog,
  ) { }

  private sortByField: string = 'sortBy';
  books: Book[] = [];
  sortBy = this.localStorageService.get(this.sortByField) || 'title';
  state: State = {
    fetching: false,
    error: null,
  };

  ngOnInit(): void {
    this.state.fetching = true;
    this.booksService
      .getBooks()
      .then(books => {
        this.books = books;
        this.state.fetching = false;
      })
      .catch(this.handleError.bind(this));
  }

  addBookModal(): void {
    this.dialog
      .open(NewBookModalComponent)
      .afterClosed()
      .subscribe(this.handleAddBook.bind(this));
  }

  handleAddBook(book: Book | null): void {
    if (book) {
      this.state.fetching = true;
      this.booksService
        .createBook(book)
        .then(this.handleSuccessCreate.bind(this))
        .catch(this.handleError.bind(this));
    }
  }

  deleteBook(book: Book): void {
    this.state.fetching = true;
    this.booksService
      .deleteBook(book.id)
      .then(this.handleSuccessDelete.bind(this, book))
      .catch(this.handleError.bind(this));
  }

  handleSuccessCreate(book: Book): void {
    console.log(book);
    this.state.fetching = false;
    this.state.error = null;
    this.books = this.books.concat(book);
    this.snackbarService.openSnackBar('Book successfully created', 1500);
  }

  handleSuccessDelete(book: Book): void {
    this.state.fetching = false;
    this.state.error = null;
    this.books = this.books.filter(b => b.id !== book.id);
    this.snackbarService.openSnackBar('Book successfully deleted', 1500);
  }

  handleError(errorMsg: string): void {
    this.state.fetching = false;
    this.state.error = errorMsg;
    this.snackbarService.openSnackBar(errorMsg, 1500);
  }

  toggleSortBy(field: string): void {
    this.localStorageService.set(this.sortByField, field);
    this.sortBy = field;
  }
}
