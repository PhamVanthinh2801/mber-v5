
import {Injectable} from "@angular/core";
import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";

@Injectable({
  providedIn: 'root'
})
export class TestService extends apiServiceBase {
  public getALlThuDi() {
    return this.getData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_ALL_THU_DI);
  }
}
