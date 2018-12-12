import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MomentPipe } from '../../pipes/moment/moment';
import { SearchPipe } from '../../pipes/search/search';


@NgModule({
	declarations: [
		HomePage,
		MomentPipe,
		SearchPipe
	],
	imports: [
		IonicPageModule.forChild(HomePage),
	],
})
export class HomePageModule { }
