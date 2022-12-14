import {Component, OnInit} from '@angular/core';
import {SoThuModel} from "../../../base-module/models";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {LoaiSoDenService} from "./loai-so-den.service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {ErrorModel} from "../../../base-module/models/error/error.model";

@Component({
  selector: 'app-loai-so-den',
  templateUrl: './loai-so-den.component.html',
  styleUrls: ['./loai-so-den.component.scss']
})
export class LoaiSoDenComponent extends iComponentBase implements OnInit {
  listBookFrom: SoThuModel[];
  onShowBookFromAdd = false;
  onShowBookFromEdited = false;
  selectedLetterNoteBook: SoThuModel;
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'name', header: 'Tên sổ thư', style: 'width: auto; text-align: left'},
  ]

  constructor(private sharedApi: SharedApi,
              private soDenService: LoaiSoDenService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.selectedLetterNoteBook = {};
    this.getNoteBookTo();
  }

  getNoteBookTo() {
    this.sharedApi.getSoThuDen().subscribe((data: any) => {
      if (data) {
        this.listBookFrom = data.result.items;
      }
    })
  }

  dataEmit(ev: any) {
    this.selectedLetterNoteBook = ev;
  }

  popUpAdd(ev: any) {
    if (ev == 'true') {
      this.onShowBookFromAdd = true;
    }
  }

  popUpEdited(ev: any) {
    if (ev == 'true') {
      console.log('data select', this.selectedLetterNoteBook)
      this.onShowBookFromEdited = true;
    }
  }

  addLetterNoteBook() {
    this.soDenService.addData(this.selectedLetterNoteBook).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Thêm sổ thư đến thành công');
        this.selectedLetterNoteBook = {}
        this.freshPage();
      }
    },(error: ErrorModel)=> {
      this.showMessage(mType.error, 'Thông báo', 'Thêm không thành công'+error.error.result.errors);
    })
  }

  editLetterNoteBook(){
    this.soDenService.updateData(this.selectedLetterNoteBook.id, this.selectedLetterNoteBook).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Cập nhật sổ thư đến thành công');
        this.selectedLetterNoteBook = {}
        this.freshPage();
      }
    },(error: ErrorModel)=> {
      this.showMessage(mType.error, 'Thông báo', 'Cập nhật không thành công'+error.error.result.errors);
    })
  }

  isDeleted(ev) {
    if (ev == 'true') {
      this.soDenService.onDeleted(this.selectedLetterNoteBook.id).subscribe((data: any) => {
        this.showMessage(mType.success, 'Thông báo', 'Xóa sổ thư đến thành công');
        this.selectedLetterNoteBook = {}
        this.getNoteBookTo();
      })
    }
  }
}
