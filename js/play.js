
function randInt(max, min) {
    return Math.floor((Math.random() * (max - min)) + min);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getOptions(navigable, x, y, z) {
    var mapOptions = {
        disableDefaultUI:       !navigable,
        disableDoubleClickZoom: !navigable,
        draggable:              navigable,
        keyboardShortcuts:      navigable,
        scrollWheel:            navigable,
        panControl:             navigable,
        zoomControl:            navigable,
        mapTypeId:              google.maps.MapTypeId.SATELLITE,
        overviewMapControl:     false,
        rotateControl:          false,
        scaleControl:           false,
        streetViewControl:      false,
        minZoom: z, maxZoom: z, zoom: z,
        center: new google.maps.LatLng(x, y),
        tilt:                   0
    };
    console.log("x: " + x + ", y: " + y + ", z: " + z); // do we really need this? does it give the user too much info?
    return mapOptions;
}



function askQuestion(Country, False1, False2) {
    // TODO: stuff to display options (via jquery)
    //       and get response.
}

function goPlay() {
    var Country = Object.keys(places)[randInt(1, Object.size(places))];
    var CountryVars = places[Country];
    delete places[Country];

    var False1 = Object.keys(places)[randInt(1, Object.size(places))];
    var False2 = False1;

    while(False1 == False2){
        False2 = Object.keys(places)[randInt(1, Object.size(places))];
    }

    map.setOptions(getOptions(true,
                              CountryVars[0],
                              CountryVars[1],
                              CountryVars[2]));

    return askQuestion(Country, False1, False2);
}

function init() {
    $.getJSON("../places.json",function(json){
        window.places = json;           
    });

    window.map = new google.maps.Map(document.getElementById("map"), // TODO: use jquery here?
                                     getOptions(true, 0, 0, 0));

    alert("Are you ready?");

    // TODO: Get timer
    var thereIsTime = true;
    while(thereIsTime){
        goPlay()
    }

    });
}

google.maps.event.addDomListener(window, 'load', init);

