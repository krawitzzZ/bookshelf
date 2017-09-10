import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Author } from '../../models';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.scss']
})
export class AuthorModalComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public editAuthor: Author,
    public dialogRef: MdDialogRef<AuthorModalComponent>,
  ) {
    if (editAuthor) {
      this.author = Object.assign({}, editAuthor);
    }
  }

  maxLength: number = 20;
  author: Author = {
    id: null,
    name: '',
    surname: '',
  };

  hasError(field, validator: string): boolean {
    return field.invalid && (field.dirty || field.touched) && field['errors'][validator];
  }

  onYesClick(): void {
    this.dialogRef.close(Object.assign({}, this.author));
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
