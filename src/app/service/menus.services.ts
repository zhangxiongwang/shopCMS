/**
 * Created by zhangxiongwang on 2018/5/30.
 */
import { Injectable } from '@angular/core';
import { MENUS } from './menus.mock';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class MenusService {
  getMenu(): Observable<any[]> {
    return of(MENUS);
  }
}
