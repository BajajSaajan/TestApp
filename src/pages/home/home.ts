import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import * as moment from 'moment';
import { PopoverComponent } from '../../components/popover/popover'

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	page: any = 1;
	items = [];
	response: any;
	hideInfinite: boolean


	constructor(public navCtrl: NavController, public apiService: ApiServiceProvider, public popoverCtrl: PopoverController) { }


	ionViewDidLoad() {
		this.loadDataFromServer();
	}


	loadDataFromServer() {
		this.apiService.showLoader('Fetching data...');
		this.apiService.getMethod("api/?page=" + this.page + "&results=10&exc=login&seed=rti").then((result) => {
			this.apiService.dismissLoader();
			this.response = result;
			this.items = [];
			for (var i = 0; i < this.response.results.length; i++) {
				this.items.push(this.response.results[i]);
			}
			this.page = this.page + 1;
		}, (err) => {
			this.apiService.dismissLoader();
			this.apiService.showToastMessage("Some error occured while fetching the data. please try again")
		});
	}

	private loadMoreData(infiniteScroll?: any): void {
		this.apiService.getMethod("api/?page=" + this.page + "&results=10&exc=login&seed=rti")
			.then(result => {
				this.response = result;
				if (this.response.results <= 0) {
					// Hide the infiniteScroll if there's no more data
					this.hideInfinite = true;
				}

				for (var i = 0; i < this.response.results.length; i++) {
					this.items.push(this.response.results[i]);
				}
				// Check if it's not null/undefined before calling the complete method
				if (infiniteScroll) {
					infiniteScroll.complete();
				}

				this.page = this.page + 1;
			}, (err) => {
				this.hideInfinite = true;
				if (infiniteScroll) {
					infiniteScroll.complete();
				}
			});
	}


	onItemSelected(item) {
		this.navCtrl.push('MapPage', {
			location: item.location
		});
	}


	//popup window when user hover in any item. 
	//if you want to use popup windiw simply call this method on HTML. right now it's hide.
	showPopover(event, item) {
		let popover = this.popoverCtrl.create(PopoverComponent, {
			location: item.location
		});
		popover.present({
			ev: event,
		});
	}
}
