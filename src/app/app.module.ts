import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { CdTimerModule } from 'angular-cd-timer';
import { LogoutComponent } from './logout/logout.component';
import { CountdownModule } from 'ngx-countdown';
import { HistoryComponent } from './history/history.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { SearchComponent } from './search/search.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchViewComponent } from './search-view/search-view.component';
import { DateAndTimePipe } from './date-and-time.pipe';
import { DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './interceptor.service';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';
import { AddTimeComponent } from './add-time/add-time.component';
import { CustomizedPriceComponent } from './customized-price/customized-price.component';
import { MainComponent } from './main/main.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SortDirective } from '../sort-directive';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    UpdateComponent,
    LoginComponent,
    ViewComponent,
    LogoutComponent,
    HistoryComponent,
    LoginUserComponent,
    SearchComponent,
    UserLogoutComponent,
    SearchViewComponent,
    DateAndTimePipe,
    CustomizedCellComponent,
    AddTimeComponent,
    CustomizedPriceComponent,
    MainComponent,
    InvoiceComponent,
    SignUpComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdTimerModule,
    CountdownModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgxSpinnerModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    RatingModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    AgGridModule.withComponents([CustomizedCellComponent])
  ],
  providers: [DatePipe, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, CustomizedCellComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
