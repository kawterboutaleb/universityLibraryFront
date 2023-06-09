import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'; 
import {MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book/book.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TestComponent } from './test/test.component';
import { BookAddComponent } from './book/book-add/book-add.component';
import { BookCatlogComponent } from './book/book-catlog/book-catlog.component';
import { HomeComponent } from './home/home.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { DetailDialogComponent } from './dialog/detail-dialog/detail-dialog.component';
import { BookUpdateComponent } from './book/book-update/book-update.component';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { DocAddComponent } from './document/doc-add/doc-add.component';
import { DocUpdateComponent } from './document/doc-update/doc-update.component';
import { DocCatalogComponent } from './document/doc-catalog/doc-catalog.component';
import { ThesisComponent } from './thesis/thesis.component';
import { ThesisCatalogComponent } from './thesis/thesis-catalog/thesis-catalog.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ThesisAddComponent } from './thesis/thesis-add/thesis-add.component';
import { ThesisUpdateComponent } from './thesis/thesis-update/thesis-update.component';
import { UserComponent } from './user/user.component';
import { StudentComponent } from './student/student.component';
import { MatListModule } from '@angular/material/list';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoansComponent } from './loans/loans.component';
import { LoansListComponent } from './loans/loans-list/loans-list.component';
import { PunishersListComponent } from './loans/punishers-list/punishers-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './user/login/login.component';
import { UserSignUPComponent } from './user/user-sign-up/user-sign-up.component';
import { JwtInterceptor } from 'src/app/jwt.interceptor';
import { OpacComponent } from './user/opac/opac.component';
/*
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
} */
export function createTranslationLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    BookComponent,
    TestComponent,
    BookAddComponent,
    BookCatlogComponent,
    HomeComponent,
    DeleteDialogComponent,
    DetailDialogComponent,
    BookUpdateComponent,
    DashboardComponent,
    DocumentComponent,
    DocAddComponent,
    DocUpdateComponent,
    DocCatalogComponent,
    ThesisComponent,
    ThesisCatalogComponent,
    ThesisAddComponent,
    ThesisUpdateComponent,
    UserComponent,
    StudentComponent,
    LoansComponent,
    LoansListComponent,
    PunishersListComponent,
    LoginComponent,
    UserSignUPComponent,
    OpacComponent
      ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule, 
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatListModule,
    NgMultiSelectDropDownModule.forRoot(),
    
    TranslateModule.forRoot({
      defaultLanguage:'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        //useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }) 

    ],
    
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      ...new MatDialogConfig(),
       hasBackdrop: true,
       autoFocus: true,
       disableClose: true
    } as MatDialogConfig,
    },LoginComponent,
    {

      provide: HTTP_INTERCEPTORS,

     useClass: JwtInterceptor,

      multi: true

    }
  ],
  bootstrap: [AppComponent],
  //entryComponents: [DeleteDialogComponent, DetailDialogComponent]
})
export class AppModule { }
