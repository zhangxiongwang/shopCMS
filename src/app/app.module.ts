import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {HttpService} from './service/http.service';
import {AppRoutingModule} from './app-routing.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ModalModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NavItemComponent} from './nav-item/nav-item.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {NavSideComponent} from './nav-side/nav-side.component';
import {MenusService} from './service/menus.services';
import {ShopComponent} from './shop/shop.component';
import {AddshopComponent} from './shop/addshop/addshop.component';
import {OrderComponent} from './order/order.component';
import {UserComponent} from './user/user.component';
import {AdduserComponent} from './user/adduser/adduser.component';
import {UpdateuserComponent} from './user/updateuser/updateuser.component';
import {UpdateshopComponent} from './shop/updateshop/updateshop.component';
import {UpdateorderComponent} from './order/updateorder/updateorder.component';
import {ContentComponent} from './content/content.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    NavItemComponent,
    NavMenuComponent,
    NavSideComponent,
    ShopComponent,
    AddshopComponent,
    OrderComponent,
    UserComponent,
    AdduserComponent,
    UpdateuserComponent,
    UpdateshopComponent,
    UpdateorderComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    HttpClientModule,
    NgxEchartsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpService, MenusService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
