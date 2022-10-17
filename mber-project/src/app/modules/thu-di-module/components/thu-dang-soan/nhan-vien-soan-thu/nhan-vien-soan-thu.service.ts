import {apiServiceBase} from "../../../../base-module/service/api-service-base";
import * as API from "../../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NhanVienSoanThuService extends apiServiceBase {
  public updateLetter(id: number, sParam: any): Observable<any> {
    return this.putData(API.PHAN_HE.THU_DI, API.API_THU_DI.UPDATE_THU_DI+'/'+id, sParam);
  }
  public getNoiNhanBenNgoai() {
    return this.getData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.GET_ALL_NOI_NHAN_BEN_NGOAI);
  }

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

  public getAllSecurity(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.GET_ALL_DO_MAT);
  }

  public getAllUrgency(): Observable<any> {
    return this.getData(API.PHAN_HE.DO_KHAN, API.API_DO_KHAN.GET_ALL_DO_KHAN);
  }
  public getPersonByParentOganization(id: number): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_EMPLOYEE_BY_ID_ORG + id);
  }

}
