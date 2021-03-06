/*{ "Afganistan" : [33.118359,67.6653712,1537524]
    "Albania" : [41.089326,20.1107484,469673]
    "Algeria" : [27.653952,3.5886401,1652528]
    "American Samoa" : [-14.3189001,-170.6761617,25933]
    "Andorra" : [42.516645,1.5885547,29543]
    "Australia" : [-24.4607256,135.2087514,3338675]
    "Bahamas" : [24.2984611,-77.8772981,192212]
    "Barbados" : 13.1900628,-59.5355639,56794]
    "Belgium" : [50.5010789,4.4764595,296826]
    "Bermuda" : [32.2787659,-64.7304891,36741]
    "Brazil" : [-14.9658805,-47.830254,3621078]
    "Cambodia" : [12.0711774,105.5550497,624099]
    "Canada" : [60.0716077,-88.1372559,4175383]
    "China" : 31.9270613,107.9359675,3031155]
    "Colombia" : [2.3592995,-72.5567875,1862855]
    "Cuba" : [20.9171285,-79.183785,868288]
    "Cyprus" : [35.1153667,33.4366703,190693]
    "Egypt" : [25.8953356,30.7630561,832410]
    "Finland" : [63.0914262,28.2994528,792628]
    "France" : [45.3975366,3.1767366,1279353]
    "Germany" : [49.9811503,11.4193946,1170288]
    "Greece" : [37.9777654,22.9601329,732440]
    "Greenland" : [71.3069724,-40.9556549,2347828]
    "Haiti" : [18.7485612,-72.9516802,441169]
    "Hong Kong" : [22.3070195,114.1687345,54092]
    "Iceland" : [64.70626,-18.9788466,394958]
    "India" : [16.1772109,79.6617897,3492983]
    "Ireland" : [52.895947,-7.3830639,483756]
    "Italy" : [40.8515424,14.502903,1402885]
    "Jamaica" : 18.1155174,-77.2760026,221765]
    "Japan" : [35.7942499,138.3013259,1479818]
    "North Korea" : [39.0204261,127.1681305,710234]
    "Malaysia" : [2.8847867,113.7113146,930852]
    "Mexico" : 21.8266848,-102.7779858,1711932]
    "Monaco" : [43.7309905,7.430517,3585]
    "The Netherlands" : [52.0170567,5.0568074,286634]
    "New Zealand" : [-43.3744881,172.4662705,2713655]
    "Norway" : [60.6650816,9.1470672,1602198]
    "Oman" : [19.9790149,56.9999564,902443]
    "Poland" : [51.612734,19.9650481,577696]
    "Portugal" : [38.6712733,-8.0619347,720683]
    "Russia" : [62.0011098,103.4560118,4280925]
    "St Lucia" : [13.8815079,-60.9811948,56602]
    "Saudi Arabia" : [22.8412934,44.6068403,1721300]
}*/
function randInt(max, min) {
    return Math.floor((Math.random() * (max - min)) + min);
}
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
    console.log("x: " + x + ", y: " + y + ", z: " + z);   
    return mapOptions;
}

function init() {
    var map = new google.maps.Map(document.getElementById("map"),
                                  getOptions(true, 0, 0, 0));
    google.maps.event.addListener(map, "rightclick", function(event) {
        map.setOptions(getOptions(true,
                                  randInt(0, 0),
                                  randInt(0, 0),
                                  randInt(0, 0)));
    });
}
google.maps.event.addDomListener(window, 'load', init);
