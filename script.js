var cityStates = ["Seattle"];
var APIKey = "1d43caedb3b0cdb286ed6a8762ac368d";
var currentCity = "Seattle";
var icon = "http://openweathermap.org/img/wn/04d@2x.png";

    function getCityInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&cnt=5&appid=" + APIKey;

    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        //console.log(moment.parseZone(date).format('MMM Do YYYY'));
        icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        console.log(icon + " icon");
    console.log(response);
    $(".cityDate").text( currentCity + " (" + moment(moment().format().substr(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")+ ")");
    $(".weatherIconMain").attr("href", icon);
    $(".mainTemp").text(((response.main.temp - 273.15) * 1.80 + 32).toFixed(1));
    
    console.log(response.main.humidity);
    $(".mainHum").text(response.main.humidity);
    $(".mainWind").text(response.wind.speed);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    getUV(lat, lon);
    });
}


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
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&cnt=38&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var dataInd = 0;
        for (i = 0; i < 38; i++) {
            
            if (response.list[i].dt_txt.indexOf("03:00:00") !== -1) {
                var currentIcon = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
                console.log(currentIcon);
            var currentDay = "(" + moment(response.list[i].dt_txt.substr(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")+ ")";
            $(".card-title" + dataInd).text(currentDay);
            console.log($(".card-title" + dataInd).text());
            $(".forecast" + dataInd).attr("src", currentIcon);
            $(".forecastTemp" + dataInd).text("Temperature: " + ((response.list[i].main.temp  - 273.15) * 1.80 + 32).toFixed(1)+ "\xB0F");
            $(".forecastHum" + dataInd).text("Humidity: " + response.list[i].main.humidity);
            dataInd++; //shouldn't get above 4 since it starts at 0
        }
        }
        //$(".card-title").text(currentCity);
        //$(".mainTemp").text = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1); main.temp
      })

}

  
    
    jQuery(`[type = "Submit"]`).on("click", function() {
        event.preventDefault();
        currentCity =  $("#inlineFormInputName").val();
        var newDiv = $("<section>");
        newDiv.addClass("choiceCard");
        newDiv.html(currentCity);
        $(".choiceCol").append(newDiv);
        localStorage.setItem("city", JSON.stringify(currentCity));
        console.log("local storage: " + JSON.parse(localStorage.getItem("city")))
        cityStates.push(currentCity);
        console.log(currentCity);
        $("#inlineFormInputName").val("");
        getCityInfo();
        getForecast();
    })



