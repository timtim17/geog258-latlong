import { Loader } from '@googlemaps/js-api-loader';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const id = document.getElementById.bind(document);
const qs = document.querySelector.bind(document);

const loader = new Loader({
    apiKey: 'AIzaSyCDnAdv_lbETZRMbUjoSuqstIusuDbI0b4',
    version: 'weekly',
    libraries: ['places'],
});

loader.load().then(() => {
    const map = new google.maps.Map(id('map') as HTMLElement, {
        mapTypeControl: false,
        center: { lat: 47.6062, lng: -122.3321 },
        zoom: 3,
    });

    const input = qs('input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['geometry', 'name'],
        strictBounds: false,
    });

    const marker = new google.maps.Marker({
        map,
        visible: false,
    });

    autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            const resultsContainer = id('results') as HTMLElement;
            resultsContainer.hidden = false;
            id('results-name')!.textContent = place.name ?? input.value;
            id('results-lat')!.textContent = place.geometry.location.lat().toString();
            id('results-lon')!.textContent = place.geometry.location.lng().toString();
        }
    });
});
