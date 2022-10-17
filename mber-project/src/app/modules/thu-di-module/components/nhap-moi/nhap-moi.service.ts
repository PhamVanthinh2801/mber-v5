import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NhapMoiService extends apiServiceBase {
  public getLetterFrom(): Observable<any> {
    return this.getData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.GET_ALL_DANH_MUC_SO_THU_DEN);
  }

  public getAllOrganizations(): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_ALL_DON_VI);
  }

  public getParentOrganizations(organizationId: number): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_DON_VI_BY_ID + organizationId);
  }

  public getAllPerson(): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_ALL_EMPLOYEE);
  }

  public getPersonByParentOganization(id: number): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_EMPLOYEE_BY_ID_ORG + id);
  }

  public getAllSecurity(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.GET_ALL_DO_MAT);
  }

  public getAllUrgency(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_KHAN, API.API_DO_KHAN.GET_ALL_DO_KHAN);
  }

  public createLetter(sParam: any) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.ADD_THU_DI, sParam);
  }

  public getLetterPattern(status: any) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI,status);
  }

  deletedThuDi(id: any) {
    return this.deletedData(API.PHAN_HE.THU_DI, API.API_THU_DI.DELETED + '/' + id);
  }
}
