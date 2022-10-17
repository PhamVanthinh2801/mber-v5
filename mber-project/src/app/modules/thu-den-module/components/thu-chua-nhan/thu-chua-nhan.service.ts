import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThuChuaNhanService extends apiServiceBase {
  getThuChuaNhan(sParam: any) {
    return this.postData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.GET_LETTER_PAGE, sParam);
  }

  onDeleteThuChuaNhan(id: number) {
    return this.deletedData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.DELETE_LETTER_TO + id)
  }

  onUpdateThu(id: number, sParam: any) {
    return this.putData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.UPDATE_LETTER_TO + id, sParam)
  }
}
