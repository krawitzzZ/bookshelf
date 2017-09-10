import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../../models';
import { State } from '../../../custom-types';
import { BooksService, ApiService, SnackbarService } from '../../services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private location: Location,
    public snackbarService: SnackbarService
  ) {}

  book: Book;
  state: State = {
    fetching: false,
    error: null,
  };

  ngOnInit(): void {
    this.route.params.map(params => params.id).subscribe(id => this.getBook(id));
  }

  getBook(id: String): void {
    this.state.fetching = true;
    this.state.error = null;
    this.booksService.getBook(id)
      .then(book => {
        this.book = book;
        this.state.fetching = false;
      })
      .catch(this.handleError.bind(this));
  }

  goBack(): void {
    this.location.back();
  }

  saveBook(book: Book): void {
    this.book = book;
    this.booksService.updateBook(book)
      .then(this.handleSuccess.bind(this))
      .catch(this.handleError.bind(this));
  }

  handleSuccess(): void {
    this.state.fetching = false;
    this.state.error = null;
    this.snackbarService.openSnackBar('Book successfully saved', 1500);
  }

  handleError(errorMsg: string): void {
    this.state.fetching = false;
    this.state.error = errorMsg;
    this.snackbarService.openSnackBar(errorMsg, 1500);
  }
}
