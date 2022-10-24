import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class MauThuDiService extends apiServiceBase {
  getALlLetterSample(sParam) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, sParam)
  }

  createLetterSample(sParam) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.ADD_THU_DI, sParam)
  }

  updateLetterSample(id: number, sParam) {
    return this.putData(API.PHAN_HE.THU_DI, API.API_THU_DI.UPDATE_THU_DI + '/' + id, sParam)
  }

  deletedLetterSample(id: number) {
    return this.deletedData(API.PHAN_HE.THU_DI, API.API_THU_DI.DELETED + id)
  }
}
