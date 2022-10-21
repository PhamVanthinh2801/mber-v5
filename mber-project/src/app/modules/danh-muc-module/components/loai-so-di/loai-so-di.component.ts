import { Component, OnInit } from '@angular/core';
import {SoThuModel} from "../../../base-module/models";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {LoaiSoDenService} from "../loai-so-den/loai-so-den.service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {ErrorModel} from "../../../base-module/models/error/error.model";
import {LoaiSoDiService} from "./loai-so-di.service";

@Component({
  selector: 'app-loai-so-di',
  templateUrl: './loai-so-di.component.html',
  styleUrls: ['./loai-so-di.component.scss']
})
export class LoaiSoDiComponent extends iComponentBase implements OnInit {
  listBookTo: SoThuModel[];
  onShowBookToAdd = false;
  onShowBookToEdited = false;
  selectedLetterNoteBook: SoThuModel;
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'name', header: 'Tên sổ thư', style: 'width: auto; text-align: left'},
  ]

  constructor(private sharedApi: SharedApi,
              private soDiService: LoaiSoDiService,
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
        this.listBookTo = data.result.items;
      }
    })
  }

  dataEmit(ev: any) {
    this.selectedLetterNoteBook = ev;
  }

  popUpAdd(ev: any) {
    if (ev == 'true') {
      this.onShowBookToAdd = true;
    }
  }

  popUpEdited(ev: any) {
    if (ev == 'true') {
      console.log('data select', this.selectedLetterNoteBook)
      this.onShowBookToEdited = true;
    }
  }

  addLetterNoteBook() {
    this.soDiService.addData(this.selectedLetterNoteBook).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Thêm sổ thư đi thành công');
        this.selectedLetterNoteBook = {}
        this.freshPage();
      }
    },(error: ErrorModel)=> {
      this.showMessage(mType.error, 'Thông báo', 'Thêm không thành công'+error.error.result.errors);
    })
  }

  editLetterNoteBook(){
    this.soDiService.updateData(this.selectedLetterNoteBook.id, this.selectedLetterNoteBook).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Cập nhật sổ đi đến thành công');
        this.selectedLetterNoteBook = {}
        this.freshPage();
      }
    },(error: ErrorModel)=> {
      this.showMessage(mType.error, 'Thông báo', 'Cập nhật không thành công'+error.error.result.errors);
    })
  }

  isDeleted(ev) {
    if (ev == 'true') {
      this.soDiService.onDeleted(this.selectedLetterNoteBook.id).subscribe((data: any) => {
        this.showMessage(mType.success, 'Thông báo', 'Xóa sổ thư đi thành công');
        this.selectedLetterNoteBook = {}
        this.getNoteBookTo();
      })
    }
  }
}
