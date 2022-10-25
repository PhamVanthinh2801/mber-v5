import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DoMatService extends apiServiceBase {

  onDeleted(id: number) {
    return this.deletedData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.DELETED + id)
  }

  addData(sParam) {
    return this.postData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.CREATE, sParam)
  }

  updateData(id, sParam) {
    return this.putData(API.PHAN_HE.DO_MAT, API.API_DO_MAT.UPDATE + id, sParam)
  }
}
