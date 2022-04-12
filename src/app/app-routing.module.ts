import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragDropComponent } from './experiments/drag-drop/drag-drop.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { NavModule } from './nav/nav.module';
import { Tab1Component } from './pages/tab1/tab1.component';
import { Tab2Component } from './pages/tab2/tab2.component';
import { Tab3Component } from './pages/tab3/tab3.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'tab1', component: Tab1Component, canActivate: [AuthGuard] },
  // { path: 'tab2', component: Tab2Component, canActivate: [AuthGuard] },
  { path: 'dd', component: DragDropComponent},
  {
    path: 'nav',
    loadChildren: () => import('./nav/nav.module').then((mod) => NavModule),
    component: NavComponent,
    // canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'nav', pathMatch: 'full' },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
