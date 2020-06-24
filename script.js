var bodGetter = $("body");
var cityStates = ["Seattle"];
var APIKey = "1d43caedb3b0cdb286ed6a8762ac368d";
var currentCity = cityStates[0];

    function getCityInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&cnt=5&appid=" + APIKey;

    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        //console.log(moment.parseZone(date).format('MMM Do YYYY'));
    console.log(response);
    $(".cityDate").text( currentCity + " (" + moment(moment().format().substr(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")+ ")");
    $(".mainTemp").text(((response.main.temp - 273.15) * 1.80 + 32).toFixed(1));
    
    console.log(response.main.humidity);
    $(".mainHum").text(response.main.humidity);
    $(".mainWind").text(response.wind.speed);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    getUV(lat, lon);
    });
}

var nowMoment = moment();
console.log(nowMoment);

function getUV (lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".mainUV").text(response.value)
  })
}

getCityInfo(); //when they click a new city these will be recalled
getForecast();

function getForecast() {
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + currentCity +"&cnt=5&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&cnt=5&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        //$(".card-title").text(currentCity);
        //$(".mainTemp").text = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1); main.temp
      })

}

  
    
    jQuery(`[type = "Submit"]`).on("click", function() {
        event.preventDefault();
        
        var currentCity =  $("#inlineFormInputName").val();
        cityStates.push(currentCity);
        console.log(cityStates);
        getCityInfo();
    //$("input:text").val("Glenn Quagmire");
    })
    

    //generate a form, add labels and input and


