import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent}   from './login/login.component';
import {HomeComponent}      from './home/home.component';
import {ShopComponent}      from './shop/shop.component';
import {AddshopComponent}      from './shop/addshop/addshop.component';
import {UpdateshopComponent}      from './shop/updateshop/updateshop.component';
import {OrderComponent}      from './order/order.component';
import {UpdateorderComponent}      from './order/updateorder/updateorder.component';
import {UserComponent}      from './user/user.component';
import {AdduserComponent}      from './user/adduser/adduser.component';
import {UpdateuserComponent}      from './user/updateuser/updateuser.component';
import {ContentComponent} from './content/content.component';
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: '', component: ContentComponent},
      {path: 'shop', component: ShopComponent},
      {path: 'shop/addshop', component: AddshopComponent},
      {path: 'shop/updateshop', component: UpdateshopComponent},
      {path: 'order', component: OrderComponent},
      {path: 'order/updateorder', component: UpdateorderComponent},
      {path: 'user', component: UserComponent},
      {path: 'user/adduser', component: AdduserComponent},
      {path: 'user/updateuser', component: UpdateuserComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
