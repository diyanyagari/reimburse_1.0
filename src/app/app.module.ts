import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { MaterialModule } from './material.module'
import { MatTableModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { UserComponent, DialogOverviewExampleDialog } from './user/user.component';
import { UsersService } from './users.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    DialogOverviewExampleDialog,
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpLinkModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { 
	constructor(apollo: Apollo, httpLink: HttpLink){
		apollo.create({
			link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
			cache: new InMemoryCache()
		});
	}
}
