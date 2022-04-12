import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { Tab1Component } from '../pages/tab1/tab1.component';
import { Tab2Component } from '../pages/tab2/tab2.component';
import { Tab3Component } from '../pages/tab3/tab3.component';
import { Tab4Component } from '../pages/tab4/tab4.component';
import { CancelledComponent } from '../profile-pages/cancelled/cancelled.component';
import { CompletedComponent } from '../profile-pages/completed/completed.component';
import { ServiceComponent } from '../profile-pages/service/service.component';
import { ToPayComponent } from '../profile-pages/to-pay/to-pay.component';
import { CustomComponent } from '../shop-pages/custom/custom.component';
import { GenerateComponent } from '../shop-pages/generate/generate.component';
import { ModeComponent } from '../shop-pages/mode/mode.component';
import { QuickComponent } from '../shop-pages/quick/quick.component';
import { QuickmodeComponent } from '../shop-pages/quickmode/quickmode.component';

const routes: Routes = [
  { path: 'home', component: Tab1Component, pathMatch: 'full' },
  { path: 'cart', component: Tab2Component, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'profile', component: Tab3Component, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'toPay', component: ToPayComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'service', component: ServiceComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'completed', component: CompletedComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'mode', component: ModeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'custom', component: CustomComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'quick', component: QuickComponent, pathMatch: 'full' },
  { path: 'generate', component: GenerateComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'quickmode', component: QuickmodeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'cancelled', component: CancelledComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'account', component: Tab4Component, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavRoutingModule {}
