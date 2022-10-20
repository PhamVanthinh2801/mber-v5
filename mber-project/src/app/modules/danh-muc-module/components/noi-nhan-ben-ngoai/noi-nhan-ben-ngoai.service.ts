import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class NoiNhanBenNgoaiService extends apiServiceBase {
  onDeleted(id: number) {
    return this.deletedData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.DELETED + id)
  }

  addData(sParam) {
    return this.postData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.CREATE, sParam)
  }

  updateData(id, sParam) {
    return this.putData(API.PHAN_HE.NOI_NHAN_BEN_NGOAI, API.API_NOI_NHAN_BEN_NGOAI.UPDATE + id, sParam)
  }
}
