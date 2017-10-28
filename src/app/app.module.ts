import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Our components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// Routes
import { appRoutes } from './app.routes';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { FormsModule} from '@angular/forms';

// tslint:disable-next-line:max-line-length
import { ButtonModule, InputTextModule, DataGridModule, DataTableModule, SharedModule, SliderModule, DropdownModule } from 'primeng/primeng';

// Services
import { SystembolagetService } from './services/systembolaget.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactsComponent,
    PagenotfoundComponent,
    NewsComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SliderModule,
    ButtonModule,
    DataGridModule,
    DataTableModule,
    SharedModule,
    HttpModule,
    BrowserModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [SystembolagetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
