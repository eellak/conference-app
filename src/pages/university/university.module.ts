import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniversityPage } from './university';

@NgModule({
  declarations: [
    UniversityPage,
  ],
  imports: [
    IonicPageModule.forChild(UniversityPage),
  ],
})
export class UniversityPageModule {}
