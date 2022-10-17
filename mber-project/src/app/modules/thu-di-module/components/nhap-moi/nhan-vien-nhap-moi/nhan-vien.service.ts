import {apiServiceBase} from "../../../../base-module/service/api-service-base";
import * as API from "../../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NhanVienService extends apiServiceBase {

  public getNoiNhanBenNgoai() {
    return this.getData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.GET_ALL_NOI_NHAN_BEN_NGOAI);
  }

}
