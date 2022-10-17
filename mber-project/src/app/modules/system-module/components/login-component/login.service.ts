
import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API  from "../../../base-module/service/api-gateway";

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends apiServiceBase{
  getUserById(id: number){
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_EMPLOYEE_BY_ID + id)
  }
  postLogin(sParam: any) {
    return this.postData(API.PHAN_HE.AUTH, API.API_LOGIN.LOGIN, sParam);
  }
}
