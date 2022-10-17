import {SERVICE_GATEWAY} from "./api-gateway";
import * as API from "./api-gateway";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs";
import {retry} from "rxjs/operators";


@Injectable()
export class apiServiceBase  {
  constructor(public httpClient: HttpClient) {
  }

  getOptionsRequest(ignoreLoading?: boolean, responseType?: string) {
    const options: any = {};
    if (ignoreLoading != undefined && ignoreLoading) {
      options.reportProgress = true;
    }
    if (responseType != undefined && responseType) {
      options.responseType = responseType;
    }
    return options;
  }

  getURLService(phanHe: any) {
    try {
      switch (phanHe) {
        case API.PHAN_HE.AUTH: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.AUTH;
        }
        case API.PHAN_HE.THU_DEN: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.THU_DEN;
        }
        case API.PHAN_HE.THU_DI: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.THU_DI;
        }
        case API.PHAN_HE.DANH_MUC_SO_THU_DEN: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.DANH_MUC_SO_THU_DEN;
        }
        case API.PHAN_HE.EMPLOYEE: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.EMPLOYEE;
        }
        case API.PHAN_HE.DON_VI: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.DON_VI;
        }
        case API.PHAN_HE.DO_MAT: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.DO_MAT;
        }
        case API.PHAN_HE.DO_KHAN: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.DO_KHAN;
        }
        case API.PHAN_HE.DON_VI_CHUYEN_PHAT: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.DON_VI_CHUYEN_PHAT;
        }
        case API.PHAN_HE.NOI_NHAN_BEN_NGOAI: {
          return SERVICE_GATEWAY.GETWAY + API.PHAN_HE.NOI_NHAN_BEN_NGOAI;
        }
        default: {
          return '';
        }
      }
    } catch (error) {
      console.log('Lỗi lấy IP APT Gate way' + error);
      return null;
    }
  }

  public postData(service: any, api: any, inputData: any, ignoreLoading?: boolean, responseType?: string): Observable<any> {
    try {
      // Get IP và URL
      const url = this.getURLService(service) + api;
      document.body.style.cursor = 'default';
      return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log('lỗi đây này', error)
          return throwError(error);
        })
      );
    } catch (error) {
      document.body.style.cursor = 'default';
      console.log(error);
      return null;
    }
  }

  public getData(service: any, api: any, ignoreLoading?: boolean): Observable<any> {
    try {
      const url = this.getURLService(service) + api;
      document.body.style.cursor = 'default';
      return this.httpClient.get(url).pipe(catchError(this.handleError));
    } catch (error) {
      document.body.style.cursor = 'default';
      console.log(error);
    }
    return null as any;
  }

  public deletedData(service: any, api: any, ignoreLoading?: boolean): Observable<any> {
    try {
      const url = this.getURLService(service) + api;
      document.body.style.cursor = 'default';
      return this.httpClient.delete(url).pipe(
        retry(1),
        // catchError(this.handleError)
        catchError((error: HttpErrorResponse) => {
          console.log('lỗi đây này', error)
          return throwError(error);
        })


      );
    } catch (error) {
      document.body.style.cursor = 'default';
      console.log(error);
    }
    return null as any;
  }

  public putData(service: any, api: any, inputData: any, ignoreLoading?: boolean): Observable<any> {
    try {
      // Get IP và URL
      const url = this.getURLService(service) + api;
      document.body.style.cursor = 'default';
      // @ts-ignore
      console.log(url);
      // @ts-ignore
      return this.httpClient.put(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
    } catch (error) {
      document.body.style.cursor = 'default';
      console.log(error);
      return null as any;
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
     return errorMessage = `Error: ${error.error.message}`;
    } else if (error.error != ErrorEvent) {
      return null;
    } else {
      // Server-side errors
     return errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
