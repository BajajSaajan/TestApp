import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Network } from '@ionic-native/network';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

	loading: any;
	BASEURL: string = 'https://randomuser.me/';


	constructor(public http: HttpClient, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public network: Network) { }


	getMethod(data) {
		if (this.network.type == 'none') {
			const toast = this.toastCtrl.create({
				message: 'Please check your internet connection.',
				duration: 3000,
				position: 'bottom'
			});
			toast.present();
			this.dismissLoader();
		} else {
			return new Promise((resolve, reject) => {
				this.http.get(this.BASEURL + data).subscribe(response => {
					resolve(response);
				}, (err) => {
					reject(err);
				});

			});
		}

	}

	showLoader(msg) {
		this.loading = this.loadingCtrl.create({
			content: msg
		});

		this.loading.present();
	}

	dismissLoader() {
		this.loading.dismiss();
	}
	showToastMessage(msg) {
		const toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

}
