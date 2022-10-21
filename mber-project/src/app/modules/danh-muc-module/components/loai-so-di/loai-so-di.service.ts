import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoaiSoDiService extends apiServiceBase{
  onDeleted(id: number) {
    return this.deletedData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.DELETE + id)
  }

  addData(sParam) {
    return this.postData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.CREATE, sParam)
  }

  updateData(id, sParam) {
    return this.putData(API.PHAN_HE.DANH_MUC_SO_THU_DEN, API.API_DANH_MUC_SO_THU_DEN.UPDATE + id, sParam)
  }
}
