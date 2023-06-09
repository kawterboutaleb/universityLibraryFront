import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookComponent } from "./book/book.component";
import { BookCatlogComponent } from "./book/book-catlog/book-catlog.component";
import { TestComponent } from "./test/test.component";
import { LoginComponent } from "./user/login/login.component";
import { BookAddComponent } from "./book/book-add/book-add.component";
import { Book } from "./models/book.model";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BookUpdateComponent } from "./book/book-update/book-update.component";
import { ThesisUpdateComponent } from "./thesis/thesis-update/thesis-update.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocAddComponent } from "./document/doc-add/doc-add.component";
import { DocUpdateComponent } from "./document/doc-update/doc-update.component";
import { DocCatalogComponent } from "./document/doc-catalog/doc-catalog.component";
import { DocumentComponent } from "./document/document.component";
import { ThesisCatalogComponent } from "./thesis/thesis-catalog/thesis-catalog.component";
import { ThesisComponent } from "./thesis/thesis.component";
import { ThesisAddComponent } from "./thesis/thesis-add/thesis-add.component";
import { StudentComponent } from "./student/student.component";
import { LoansComponent } from "./loans/loans.component";
import { LoansListComponent } from "./loans/loans-list/loans-list.component";
import { PunishersListComponent } from "./loans/punishers-list/punishers-list.component";
import { UserComponent } from './user/user.component';
import { UserSignUPComponent } from "./user/user-sign-up/user-sign-up.component";
import { OpacComponent } from "./user/opac/opac.component";
 

const appRoutes: Routes =[
    { path: '', redirectTo: 'home',pathMatch:"full" },
    {path:'user', component: UserComponent,

        children:[

            {path:'signUp', component:UserSignUPComponent},

            { path: 'login', component: LoginComponent },

        ]},
    {path:'home', component: HomeComponent},
    {path:'student', component: StudentComponent},
    { path: 'opac', component: OpacComponent },
    {path:'book', component: BookComponent, 
        children:[
            {path:'catalog', component:BookCatlogComponent},
            {path:'add',component:BookAddComponent},
            {path:'edit/:id',component:BookUpdateComponent}
        ]},
    {path:'document', component: DocumentComponent, 
        children:[
            {path:'catalog', component:DocCatalogComponent},
            {path:'add',component:DocAddComponent},
            {path:'edit/:id',component:DocUpdateComponent}
        ]},
    {path:'thesis', component: ThesisComponent, 
        children:[
            {path:'catalog', component:ThesisCatalogComponent},
            {path:'add',component:ThesisAddComponent},
            {path:'edit/:id',component:ThesisUpdateComponent}
        ]},
    {path:'loans', component: LoansComponent, 
        children:[
            {path:'loansList', component:LoansListComponent},
            {path:'punishersList', component:PunishersListComponent}
            
        ]},
    {path:'dashboard', component:DashboardComponent},
    {path:'test', component: TestComponent},
    {path:'**', redirectTo:'/home' }
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
}
)
export class AppRoutingModule{}