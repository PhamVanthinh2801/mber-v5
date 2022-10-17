import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./modules/system-module/components/login-component/login.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {path: 'thu-den',
    loadChildren: () => import('./modules/thu-den-module/thu-den.module').then(m => m.ThuDenModule),
  },
  {
    path: 'thu-di',
    loadChildren: () => import('./modules/thu-di-module/thu-di.module').then(m => m.ThuDiModule),
  },
  {
    path: 'danh-muc',
    loadChildren: () => import('./modules/danh-muc-module/danh-muc.module').then(m => m.DanhMucModule),
  },
  {
    path: 'bao-cao',
    loadChildren: () => import('./modules/bao-cao-module/bao-cao-module').then(m => m.BaoCaoModule),
  }
];


export const appRoutingModule = RouterModule.forRoot(routes);
