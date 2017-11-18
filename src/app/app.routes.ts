import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BeerwikiComponent } from './beerwiki/beerwiki.component';
import { SellstartComponent } from './statistics/sellstart/sellstart.component';
import { QuanityComponent } from './statistics/quanity/quanity.component';
import { BeersortComponent } from './statistics/beersort/beersort.component';

export const appRoutes: Routes = [
    { path: 'contacts', component: ContactsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'sortiment', component: HomeComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'beerwiki', component: BeerwikiComponent },
    { path: 'sellstart', component: SellstartComponent },
    { path: 'quanity', component: QuanityComponent },
    { path: 'beersort', component: BeersortComponent },
    { path: '**', component: PagenotfoundComponent }
  ];
