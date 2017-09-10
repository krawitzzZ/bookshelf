import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ConfirmationModalData } from '../../../custom-types';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) public data: ConfirmationModalData,
    public dialogRef: MdDialogRef<ConfirmationModalComponent>
  ) {
    this.data.title = data.title;
    this.data.content = data.content;
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
