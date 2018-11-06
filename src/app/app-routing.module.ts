import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tenderDetail', loadChildren: './pages/tender-detail/tender-detail.module#TenderDetailPageModule' },
  { path: 'tender/:id', loadChildren: './tender/tender.module#TenderPageModule' },
  { path: 'application/:id', loadChildren: './application/application.module#ApplicationPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
