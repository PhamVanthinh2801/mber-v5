import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {LocalStorageService} from '../../functions/store/local-storage.service';
import {MessageService} from "primeng/api";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent extends iComponentBase implements OnInit {
  name: any;
  password: any;
  user: any;
  isLoading = false;

  constructor(private loginService: LoginService,
              public title: Title,
              public router: Router,
              private tokenStorageService: LocalStorageService,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if(this.tokenStorageService.getToken() && this.tokenStorageService.getUserFromStorage()){
      return;
    }else{
      // this.isLoading = true;
      if (this.name != undefined || this.password != undefined) {
        const param = {
          username: "admin",
          password: "abc@123"
        }
        this.loginService.postLogin(param).subscribe((data: any) => {
          this.tokenStorageService.setToken(data.result.accessToken)
          this.user = {
            userId: data.result.userId,
            username: data.result.username,
            roles: data.result.roles[0]
          }
          this.loginService.getUserById(this.user.userId).subscribe((data)=> {
            data.result.roles = this.user.roles;
            this.tokenStorageService.setUserToStorage(data.result)
            this.showMessage(mType.success, 'Thông báo', 'đăng nhập thành công');
            setTimeout(()=>{
              this.reloadPage();
            },500);
          })
        })
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
