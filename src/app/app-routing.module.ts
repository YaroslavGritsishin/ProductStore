import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
    { path: '', component: MainLayoutComponent, children:[
        {path: '', redirectTo: '/', pathMatch:'full'},
        {path:'', component: HomePageComponent},
        {path: 'login', component: LoginPageComponent},
        {path: 'register', component: RegisterPageComponent},
        {path: 'categories', component: CategoriesPageComponent},
        {path: 'contacts', component: ContactsPageComponent},
        {path: 'about', component: AboutPageComponent}
      ]
    },
    {
      path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(comp => comp.AdminModule) 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
