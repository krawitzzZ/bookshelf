import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BooksComponent,
  BookDetailComponent,
} from './components';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
