import {Injectable} from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class AppGlobal {
  //定义全局变量
  static domain = 'http://localhost:8011';
}


@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private  toast: ToastrService,) {
  }

  // 对参数进行编码
  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    console.log('params ======' + params, str);
    return str;
  }

  httpGet(url, params, callback) {
    this.http.get(AppGlobal.domain + url + this.encode(params))
      .toPromise()
      .then(res => {
        var d = res;
        callback(d == null ? "[]" : d);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  httpPost(url, params, callback) {
    this.http.post(AppGlobal.domain + url, params)
      .toPromise()
      .then(res => {
        var d = res;
        callback(d == null ? "[]" : d);
      }).catch(error => {
      this.handleError(error);
    });
  }

  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，服务器出错，请联系管理员');
    }
    if (error.status == 0) {
      msg = '请检查当前网络是否连接';
    }
    console.log(error);
    if (msg != '') {
      this.toast.error(msg);
    } else {
      this.toast.error(error.message);
    }
  }

}
