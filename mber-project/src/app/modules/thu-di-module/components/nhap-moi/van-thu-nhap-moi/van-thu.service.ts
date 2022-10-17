import {apiServiceBase} from "../../../../base-module/service/api-service-base";
import * as API from "../../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VanThuService extends apiServiceBase {
  public getDonViChuyenPhat(): Observable<any> {
    return this.getData(API.PHAN_HE.DON_VI_CHUYEN_PHAT, API.API_DON_VI_CHUYEN_PHAT.GET_ALL_DON_VI_CHUYEN_PHAT);
  }

  public getALlThuDi() {
    return this.getData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_ALL_THU_DI);
  }

  public getNoiNhanBenNgoai() {
    return this.getData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.GET_ALL_NOI_NHAN_BEN_NGOAI);
  }

}
