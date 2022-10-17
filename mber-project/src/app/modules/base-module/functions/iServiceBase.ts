import {Component} from "@angular/core";
import {ConfirmationService, MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {iFunction} from "./iFunction";
import {IStaticModuleComponent} from "./static..function";


export const enum cType {
  question,
  trash,
  edit
}

export const enum mType {
  success,
  info,
  warn,
  error
}

export const VN_LOCAL = {
  firstDayOfWeek: 0,
  dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['TH1', 'TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'TH8', 'TH9', 'TH10', 'TH11', 'TH12'],
  today: 'Hôm nay',
  clear: 'Xóa'
};

@Component({
  selector: 'app-i-com',
  template: `<p></p>`,
})

export class iComponentBase extends iFunction {
  constructor(public messageService: MessageService, public titleService?: Title) {
    super();
  }

  showMessage(iType: mType, strheader: any, strmessage: any, key?: string) {
    if (iType == 0) {
      if (key != undefined) {
        this.messageService.add({key, severity: 'success', summary: strheader, detail: strmessage});
      } else {
        this.messageService.add({severity: 'success', summary: strheader, detail: strmessage});
      }

    }

    if (iType == 1) {
      if (key != undefined) {
        this.messageService.add({key, severity: 'info', summary: strheader, detail: strmessage});
      } else {
        this.messageService.add({severity: 'info', summary: strheader, detail: strmessage});
      }
    }

    if (iType == 2) {
      if (key != undefined) {
        this.messageService.add({key, severity: 'warn', summary: strheader, detail: strmessage});
      } else {
        this.messageService.add({severity: 'warn', summary: strheader, detail: strmessage});
      }
    }

    if (iType == 3) {
      if (key != undefined) {
        this.messageService.add({key, severity: 'error', summary: strheader, detail: strmessage});
      } else {
        this.messageService.add({severity: 'error', summary: strheader, detail: strmessage});
      }
    }
  }

  showConfirmBase(ev: any, type: cType, mess: string, hed: string) {
    let strIcon;
    if (type == 0) {
      strIcon = 'pi pi-question-circle';
    }
    if (type == 1) {
      strIcon = 'pi pi-trash';
    }

    if (type == 2) {
      strIcon = 'pi pi-pencil';
    }

    let _iConfirmSer: ConfirmationService;
    _iConfirmSer = IStaticModuleComponent.injector.get(ConfirmationService);
    _iConfirmSer.confirm({
      message: mess,
      header: hed,
      icon: strIcon.toString(),
      accept: () => ev()
    });
  }

  freshPage(){
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }
}
