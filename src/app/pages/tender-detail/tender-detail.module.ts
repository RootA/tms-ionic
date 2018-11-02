import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { IonicModule } from '@ionic/angular';
import { TenderDetailPage } from './tender-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TenderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TenderDetailPage]
})
export class TenderDetailPageModule {}
