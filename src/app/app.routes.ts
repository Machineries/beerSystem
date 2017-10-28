import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: 'contacts', component: ContactsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'sortiment', component: HomeComponent },
    { path: '**', component: PagenotfoundComponent }
  ];
