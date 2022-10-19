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
    return this.putData(API.PHAN_HE.THU_DEN, API.API_THU_DEN.UPDATE_LETTER_TO+ '/' + id, sParam);
  }
}
