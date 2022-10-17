import { Injectable } from '@angular/core';
import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
// @ts-ignore
import {Observable} from "rxjs/dist/types";


@Injectable({
  providedIn: 'root'
})
export class ThuDaNhanService extends apiServiceBase{

  getAllThuMoi(statusLetter: any){
    return this.postData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.GET_LETTER_PAGE, statusLetter);
  }
  public getAllOrganizations(): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_ALL_DON_VI);
  }
}
