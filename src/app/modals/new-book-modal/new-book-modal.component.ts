import { Component, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Book } from '../../models';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrls: ['./new-book-modal.components.scss']
})
export class NewBookModalComponent {
  constructor(public dialogRef: MdDialogRef<NewBookModalComponent>) {}

  book: Book = {
    id: null,
    title: '',
    authors: [],
    pages: 1,
    publisher: '',
    year: 1800,
    releaseDate: new Date(),
    ISBN: '',
    coverUrl: null,
  };

  onYesClick(book: Book): void {
    this.dialogRef.close(Object.assign({}, this.book, book));
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
