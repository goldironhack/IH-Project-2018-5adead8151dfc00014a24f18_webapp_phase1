var map;
var cord = [];
var Districts = new Array();

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
// OBTENCION DE LOS DATOS DE LOS DISTRITOS
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

function getDistrictNames(){
  var URL = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
	var data = $.get(URL, function(){
		console.log(URL)
	})
    //Itera sobre todo el archivo JSON para obtener los datos: nombre, localización (coordenadas) y localidad
		.done( function(){
      if(Districts[0] == null){
        for (var i = 0; i < 299; i++) {
          Districts[i] = new Object();
          Districts[i].name = data.responseJSON.data[i][10];
          Districts[i].borough = data.responseJSON.data[i][16];
          var loc = data.responseJSON.data[i][9];
          loc = loc.split(" "); // SE HACE LA ADAPTACION DE LA LOCALIZACION A FORMATO LAT-LNG
          loc = "{lat: " + loc[2].split(")")[0] + ", lng: " + loc[1].split("(")[1] + "}";
          Districts[i].location = loc; // SE GUARDAN LOS DATOS EN UN OBJETO DENTRO DEL ARRAY Districts
        }
        console.log(Districts);
      }
		})
		.fail( function(error){
			console.error(error);
		})
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
//OBTENCION DE LOS POLIGONOS DE LOS DISTRITOS
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

function getDistrictsGeoshapes(){
  var URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
      var text = JSON.parse(data.responseText);
      //console.log(text.features);
      console.log(text.features);
      for (var i = 0; i < text.features.length; i++) {
          if(text.features[i].geometry.type == "Polygon"){
            cord.push(text.features[i].geometry.coordinates[0]);
          }
        }
        //cord.push(new google.maps.LatLng(text.features[0].geometry.coordinates[0][i][1], text.features[0].geometry.coordinates[0][i][0]));
      console.log(cord);

      //new google.maps.LatLng --> Cambiar de número a LatLng

		})
		.fail( function(error){
			console.error(error);
		})
}

function onGoogleMapResponse(){

  var styledMapType = new google.maps.StyledMapType(
            [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
            {name: 'Classic'});

	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
    center: {lat: 40.7291, lng: -73.9965},
    zoom: 10.3,
    mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
	});

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');




  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.7291, -73.9965),
    map: map
  });
}

function drawDistrict(){
  var URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
  map.data.loadGeoJson(URL);

  map.data.setStyle(function(feature) {
          var color = '#697A55';
          if (feature.getProperty('isColorful')) {
            color = 'green';
          }
          return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
          });
        });

        map.data.addListener('click', function(event) {
          if(event.feature.getProperty('isColorful')){
            event.feature.setProperty('isColorful', false);
          } else {
            event.feature.setProperty('isColorful', true);
          }
        });

        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        map.data.addListener('mouseover', function(event) {
          map.data.revertStyle();
          map.data.overrideStyle(event.feature, {strokeWeight: 5});
        });

        map.data.addListener('mouseout', function(event) {
          map.data.revertStyle();
        });

}



/*{
    $("#3").click(function(){
        var center = new google.maps.LatLng(10.23,123.45);
        map.panTo(center);
    });
});*/


$(document).ready( function(){
	$("#getNeighborhoodNames").on("click", getDistrictNames);
  $("#drawDistrict").on("click", drawDistrict);
})
