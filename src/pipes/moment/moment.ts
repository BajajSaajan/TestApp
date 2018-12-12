import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'moment',
})
export class MomentPipe implements PipeTransform {

	transform(value: string, ...args) {
		let mom = moment(value).startOf('day').fromNow();
		return mom;
	}
}
