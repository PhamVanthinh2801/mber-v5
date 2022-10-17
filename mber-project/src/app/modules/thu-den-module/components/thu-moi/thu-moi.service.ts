import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThuMoiService extends apiServiceBase {
  getAllThuMoi(statusLetter: any) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, statusLetter);
  }

  updateLetter(id: number, sParam: any): Observable<any> {
    return this.putData(API.PHAN_HE.THU_DI, API.API_THU_DI.UPDATE_THU_DI + '/' + id, sParam);
  }

  getThuMoi(status: any): Observable<any> {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, status);
  }

  deletedThuMoi(id: any) {
    return this.deletedData(API.PHAN_HE.THU_DI, API.API_THU_DI.DELETED + '/' + id)
  }

  getLetterFrom(): Observable<any> {
    return this.getData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.GET_ALL_DANH_MUC_SO_THU_DEN);
  }

  getAllOrganizations(): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_ALL_DON_VI);
  }

  getParentOrganizations(organizationId: number): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_DON_VI_BY_ID + organizationId);
  }

  getAllPerson(): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_ALL_EMPLOYEE);
  }

  getAllSecurity(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.GET_ALL_DO_MAT);
  }

  getAllUrgency(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_KHAN, API.API_DO_KHAN.GET_ALL_DO_KHAN);
  }

  getPersonByParentOganization(id: number): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_EMPLOYEE_BY_ID_ORG + id);
  }
}
