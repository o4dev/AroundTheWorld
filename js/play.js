var map, places, score, answers;


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
        //disableDefaultUI:       !navigable,
        //disableDoubleClickZoom: !navigable,
        //draggable:              !navigable,
        //keyboardShortcuts:      !navigable,
        //scrollWheel:            !navigable,
        //panControl:             !navigable,
        //zoomControl:            !navigable,
        mapTypeId:              google.maps.MapTypeId.SATELLITE,
        //overviewMapControl:     false,
        //rotateControl:          false,
        //scaleControl:           false,
        //streetViewControl:      false,
        //minZoom: z,
        //maxZoom: z * 10,
        zoom: z*10000,
        center: new google.maps.LatLng(x, y),
        //tilt:                   0
    };
    console.log("x: " + x + ", y: " + y + ", z: " + z);
    return mapOptions;
}

function updateScore(correct){
    $('.option').off();
    console.log('correct: ' + correct);
    if(correct) {
        score++;
        $('#score').text(score);
        delete places[answers[0]];
        goPlay();
    } else {
        console.log('asking question: ' + answers[0], answers[1], answers[2]);
        askQuestion(answers[0], answers[1], answers[2]);
    }
}

function askQuestion() {
    answers = arguments;
    var correct = arguments[0];

    shuffle(answers);
    
    $('#Op1').text(answers[0])
             .click(function(){
                $('option').text("")
                updateScore(correct == answers[0]);
             })

    $('#Op2').text(answers[1])
             .click(function(){
                $('option').text("")
                updateScore(correct == answers[1]);
             })

    $('#Op3').text(answers[2])
             .click(function(){
                $('option').text("")
                updateScore(correct == answers[2]);
             })
}

function goPlay() {
    var Country = Object.keys(places)[randInt(1, Object.size(places))];
    var CountryVars = places[Country];

    var False1 = Country;
    while(False1 == Country){
        False1 = Object.keys(places)[randInt(1, Object.size(places))];
    }

    var False2 = False1;
    while((False1 == False2) || (False2 == Country)){
        False2 = Object.keys(places)[randInt(1, Object.size(places))];
    }

    
    map.setOptions(getOptions(true,
                              CountryVars[0],
                              CountryVars[1],
                              CountryVars[2]));

    console.log(Country);

    askQuestion(Country, False1, False2);
}

function init() {
    score = 0;
    $('#score').text(score);

    $.getJSON('../places.json',function(json){
        places = json;           

        first = places['Barbados']

        map = new google.maps.Map($('#map')[0],
                                         getOptions(true, first[0], first[1], first[2]));

        goPlay();

    });
}

$(document).ready(init);

