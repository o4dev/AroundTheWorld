var map, places, score;


function randInt(max, min) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
        //minZoom: z,
        //maxZoom: z,
        zoom: z,
        center: new google.maps.LatLng(x, y),
        tilt:                   0
    };
    console.log("x: " + x + ", y: " + y + ", z: " + z);
    return mapOptions;
}

function updateScore(correct){
    if(correct) {
        score++;
        goPlay()
    } else {
        alert('Score: ' + score);
    }
}

function askQuestion() {
    var answers = arguments;

    shuffle(answers);
    
    for(var i=0; i < answers.length; i++)
        $('#Op' + (i+1)).text(answers[i])
                        .click(function(){
                            $('.option').text("");
                            updateScore(arguments[0] == answers[i]);
                        });
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

    askQuestion(Country, False1, False2);
}

function init() {
    score = 0;

    $.getJSON('../places.json',function(json){
        places = json;           

        map = new google.maps.Map($('#map')[0],
                                         getOptions(true, 0, 0, 0));
  
        alert("Are you ready?");

        goPlay();
    });
}

 google.maps.event.addDomListener(window, 'load', init);

