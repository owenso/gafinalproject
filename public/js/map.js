window.onload = function (){
  console.log('If you arent looking at a map right now, youre probably pretty mad.');
  $('.result-item').click(function(e){
    clickTrigger($(this).data());
  });
};



var map;

function initMap() {
  var customMapType = new google.maps.StyledMapType([{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';
  var givenloc = {lat: 40.7142, lng: -74.0064};


  map = new google.maps.Map(document.getElementById('map'), {
    center: givenloc,
    zoom: 17,
    // streetViewControl: false,

  });

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: givenloc,
    radius: 500,
    types: ['gym', 'grocery_or_supermarket']
  }, processResults);


  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}



function processResults(results, status, pagination) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    createMarkers(results);

    if (pagination.hasNextPage) {
      var moreButton = document.getElementById('more');

      moreButton.disabled = false;

      moreButton.addEventListener('click', function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }
  }
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');
  var markers = [];
  for (var i = 0, place; place = places[i]; i++) {
    if (places[i].types[0] == 'gym'){
      var gymImage = {
        url: '../images/gym_7a4a3a.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(40, 40)
      };   
    var gymMarker = new google.maps.Marker({
      map: map,
      icon: gymImage,
      title: place.name,
      position: place.geometry.location
    });
    gymMarker.infowindow = new google.maps.InfoWindow({
      content: "<h3>" + places[i].name + "</h3> <p>" + places[i].vicinity + "</p>",
      position: gymMarker.position,
      pixelOffset: new google.maps.Size(-13, 13),
    });
    google.maps.event.addListener(gymMarker, 'click', function(point) {  
        //this = marker  
        this.infowindow.open(map, this);//(map, this);  
    });
    placesList.innerHTML += '<li class="result-item"' + ' data-value='+ i + '>' + '<img id="list-icon-gym" src="' + gymImage.url + '">' + place.name + '</li>';
    markers.push(gymMarker);

    }
    else{
      var groceryImage = {
        url: '../images/grocery.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }; 
      var groceryMarker = new google.maps.Marker({
        map: map,
        icon: groceryImage,
        title: place.name,
        position: place.geometry.location
      }); 
    groceryMarker.infowindow = new google.maps.InfoWindow({
      content: "<h3>" + places[i].name + "</h3> <p>" + places[i].vicinity + "</p>",
      position: groceryMarker.position,
      pixelOffset: new google.maps.Size(-13, 13),
    });
    google.maps.event.addListener(groceryMarker, 'click', function(point) {  
        //this = marker  
        this.infowindow.open(map, this);//(map, this);  
    });

    placesList.innerHTML += '<li class="result-item"' + ' data-value='+ i + '>' + '<img id="list-icon-grocery" src="' + groceryImage.url + '">' + place.name + '</li>' + '<\/a>';
        // side_bar_html += '<a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + name + '<\/a><br>';
    markers.push(groceryMarker);

    }
    clickTrigger = function(id){
      google.maps.event.trigger(markers[id.value], "click");
      for(var i=0;i<markers.length;i++){
        if (i !== id.value){
          markers[i].infowindow.close(); 
        }
        
      }
    };

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
}
