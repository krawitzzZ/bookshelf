import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ConfirmationModalData } from '../../../../custom-types';
import { Book } from '../../../models';
import { BooksService } from '../../../services';
import { ConfirmationModalComponent } from '../../../modals';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  constructor(
    private router: Router,
    private booksService: BooksService,
    public dialog: MdDialog,
  ) {}

  @Output()
  onDelete = new EventEmitter<Book>()
  @Input()
  book: Book;
  noBookCover: string = '/assets/images/default.png';

  editBook(book: Book): void {
    this.router.navigate(['/books', book.id]);
  }

  deleteBookConfirm(book: Book): void {
    const data: ConfirmationModalData = {
      title: 'Delete this book?',
      content: '',
    };

    this.dialog
      .open(ConfirmationModalComponent, {
        width: '320px',
        data,
      })
      .afterClosed()
      .subscribe(this.handleDeleteBook.bind(this));
  }

  handleDeleteBook(del: boolean): void {
    if (del) {
      this.onDelete.emit(this.book);
    }
  }
}
