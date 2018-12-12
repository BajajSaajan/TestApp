import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'search',
})
export class SearchPipe implements PipeTransform {
	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(items: any[], value: string): any[] {
		if (!items) return [];
		if (!value) return items;
		value = value.toLowerCase();
		return items.filter(item => {
			return (item.name.first.toLowerCase().includes(value) || item.name.last.toLowerCase().includes(value));
		});
	}
}
