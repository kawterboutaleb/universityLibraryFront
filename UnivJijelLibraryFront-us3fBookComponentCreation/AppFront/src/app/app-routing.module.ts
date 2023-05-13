import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookComponent } from "./book/book.component";
import { BookCatlogComponent } from "./book/book-catlog/book-catlog.component";
import { TestComponent } from "./test/test.component";
import { UserLoginComponent } from "./user-login/user-login.component";
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

const appRoutes: Routes =[
    { path: '', redirectTo: 'home',pathMatch:"full" },
    {path:'login', component: UserLoginComponent},
    {path:'home', component: HomeComponent},
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