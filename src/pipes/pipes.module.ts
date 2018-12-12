import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import { SearchPipe } from './search/search';
@NgModule({
	declarations: [MomentPipe,
		SearchPipe],
	imports: [],
	exports: [MomentPipe,
		SearchPipe]
})
export class PipesModule { }
