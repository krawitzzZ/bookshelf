import { NgModule } from '@angular/core';

import {
  MdToolbarModule,
  MdButtonModule,
  MdListModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdExpansionModule,
  MdCardModule,
  MdDialogModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdChipsModule,
  MdSnackBarModule,
  MdMenuModule,
} from '@angular/material';

const materialModules = [
  MdToolbarModule,
  MdButtonModule,
  MdListModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdExpansionModule,
  MdCardModule,
  MdDialogModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdChipsModule,
  MdSnackBarModule,
  MdMenuModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialDesignModule { }
