import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'popover',
	templateUrl: 'popover.html'
})
export class PopoverComponent {

	location: any;
	@ViewChild('map') mapElement: ElementRef;
	map: any;

	constructor(public navCtrl: NavController, public navParms: NavParams, public geolocation: Geolocation) {
		this.location = navParms.get('location');
		this.loadMap();
	}


	loadMap() {
		let options = { timeout: 10000, enableHighAccuracy: true }
		this.geolocation.getCurrentPosition(options).then((position) => {
			let latLng = new google.maps.LatLng(this.location.coordinates.latitude, this.location.coordinates.longitude);
			let mapOptions = {
				center: latLng,
				zoom: 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
			this.addMarker(this.map);

		}, (err) => {
			console.log(err);
		});
	}

	addMarker(map: any) {
		let marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			position: map.getCenter()
		});

		let content = "<h4>" + this.location.street + "," + this.location.city + " " + this.location.state + "</h4>";
		this.addInfoWindow(marker, content);
	}

	addInfoWindow(marker, content) {
		let infoWindow = new google.maps.InfoWindow({
			content: content
		});
		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});
	}

}
