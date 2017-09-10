import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule, ILocalStorageServiceConfig } from 'angular-2-local-storage';

import { RoutingModule } from './routing';
import { ServicesProvider } from './services';
import { ComponentsProvider } from './components';
import { DirectivesProvider } from './directives';
import { PipesProvider } from './pipes';
import { ModalsProvider } from './modals';
import { SharedProvider } from './shared';
import { AppComponent } from './app.component';

const localStorageConfig: ILocalStorageServiceConfig = {
  prefix: 'bookshelf',
  storageType: 'localStorage',
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingModule,
    ...SharedProvider,
    LocalStorageModule.withConfig(localStorageConfig),
  ],
  declarations: [
    AppComponent,
    ...ComponentsProvider,
    ...DirectivesProvider,
    ...PipesProvider,
    ...ModalsProvider,
  ],
  providers: [
    ...ServicesProvider,
  ],
  entryComponents: [
    ...ModalsProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
