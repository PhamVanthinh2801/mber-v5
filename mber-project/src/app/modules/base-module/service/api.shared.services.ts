import {apiServiceBase} from ".//api-service-base";
import * as API from ".//api-gateway";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedApi extends apiServiceBase {
  // get thư đi theo trạng thái
  getThuDiTheoTrangThai(statusLetter: any){
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, statusLetter);
  }
  // update trạng thái thư
  public updateLetter(id: number, sParam: any): Observable<any> {
    return this.putData(API.PHAN_HE.THU_DI, API.API_THU_DI.UPDATE_THU_DI+'/'+id, sParam);
  }
  // get nhân viên theo bộ phận
  public getPersonByParentOganization(id: number): Observable<any> {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_EMPLOYEE_BY_ID_ORG + id);
  }
  // Lấy toàn bộ đơn vị
  getAllDonVi() {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_ALL_DON_VI)
  }

  // lấy đơn vị theo parent
  public getParentOrganizations(organizationId: number): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI, API.API_DON_VI.GET_DON_VI_BY_ID + organizationId);
  }

  // Lấy đơn vị chuyển phát
  public getDonViChuyenPhat(): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI_CHUYEN_PHAT, API.API_DON_VI_CHUYEN_PHAT.GET_ALL_DON_VI_CHUYEN_PHAT);
  }

  // Lấy toàn bộ nhân viên
  getAllNhanVien() {
    return this.getData(API.PHAN_HE.EMPLOYEE, API.API_EMPLOYEE.GET_ALL_EMPLOYEE);
  }

  // Lấy toàn bộ độ khẩn
  getDoKhan() {
    return this.getData(API.PHAN_HE.DO_KHAN, API.API_DO_KHAN.GET_ALL_DO_KHAN);
  }

  // Lấy toàn bộ độ mật
  getDoMat() {
    return this.getData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.GET_ALL_DO_MAT);
  }

  // Lấy toàn bộ auto gen code
  getAutoGenCode() {
    return this.getData(API.PHAN_HE.THU_DI, API.API_THU_DI.GEN_CODE);
  }

  // Lấy toàn bộ số thư đi
  public getSoThuDi() {
    return this.getData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.GET_ALL_DANH_MUC_SO_THU_DEN);
  }
}
