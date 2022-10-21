import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class MauThuDiService extends apiServiceBase {
  getALlLetterSample(sParam) {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI ,sParam)
  }
}
