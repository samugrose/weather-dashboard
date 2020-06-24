var cityStates = ["Seattle"];
var APIKey = "1d43caedb3b0cdb286ed6a8762ac368d";
var currentCity = "Seattle";
var icon = "http://openweathermap.org/img/wn/04d@2x.png";

    //main function pulling information for the current city selected, pulling from local storage and populating info for temperature
    function getCityInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&cnt=5&appid=" + APIKey;

    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var localStorageVals = JSON.parse(localStorage.getItem("city"))
        console.log(localStorageVals)
        
        //console.log(moment.parseZone(date).format('MMM Do YYYY'));
        icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        console.log(icon + " icon");
    //console.log(response);
    $(".cityDate").text( currentCity + " (" + moment(moment().format().substr(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")+ ")");
    $(".weatherIconMain").attr("href", icon);
    $(".mainTemp").text(((response.main.temp - 273.15) * 1.80 + 32).toFixed(1));
    
    //console.log(response.main.humidity);
    $(".mainHum").text(response.main.humidity);
    $(".mainWind").text(response.wind.speed);
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    getUV(lat, lon);
    generateLocals();
    });
}

//this function gets the UV value for the latitude and longitude of an area
function getUV (lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".mainUV").text(response.value);
    var vall = response.value;
    if (vall <= 5.0) {
        $(".mainUV").css("background-color", "yellow"); 
    } else if (vall <= 7.0) {
        $(".mainUV").css("background-color", "orange"); 
    } else if (vall <= 10.0) {
        $(".mainUV").css("background-color", "red"); 
    } else { //vall is greater than 10, meaning super bad UV 
        $(".mainUV").css("background-color", "lavender"); 
    }
  })
}

getCityInfo();
getForecast();


//this function loads the five day forecast info and plugs in the values retrieved from the api, with corresponding Emoji.
function getForecast() {
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + currentCity +"&cnt=5&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&cnt=38&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response);
        var dataInd = 0;
        for (i = 0; i < 38; i++) {
            
            if (response.list[i].dt_txt.indexOf("03:00:00") !== -1) {
                var currentIcon = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
                //console.log(currentIcon);
            var currentDay = "(" + moment(response.list[i].dt_txt.substr(0, 10), "YYYY-MM-DD").format("MM/DD/YYYY")+ ")";
            $(".card-title" + dataInd).text(currentDay);
            //console.log($(".card-title" + dataInd).text());
            $(".forecast" + dataInd).attr("src", currentIcon);
            $(".forecastTemp" + dataInd).text("Temperature: " + ((response.list[i].main.temp  - 273.15) * 1.80 + 32).toFixed(1)+ "\xB0F");
            $(".forecastHum" + dataInd).text("Humidity: " + response.list[i].main.humidity);
            dataInd++; //shouldn't get above 4 since it starts at 0
        }
        }
        generateLocals();
      })

}

    //this function populates the list of choices from localStorage below the search bar on the left
  function generateLocals() {
    var toLoad = JSON.parse(localStorage.getItem("city"));
    //need to empty rows first 
    $(".box").empty();
    for (i = 0; i < toLoad.length; i++) {
     //array of city options stored in local
    var newDiv = $("<section>");
    newDiv.html(toLoad[i]);
    newDiv.addClass("choiceCard choiceCard" + toLoad[i]);
    $(".box").append(newDiv);
    }
  }

    //tracks clicks on choice cards in the .box to get the value of the city, and set the current city displayed to this value, reruns main functions
  $(".box").on("click", ".choiceCard", function(event) {
        event.preventDefault();
      //console.log("clicked choice " + $(".choiceCard").text());
      var dataVal = $(this).html();
      currentCity = dataVal;
      getCityInfo();
      getForecast();
      generateLocals();
  })
    
  // stores info to local storage, reruns the above functions to generate local values and display tiles
    jQuery(`[type = "Submit"]`).on("click", function() {
        event.preventDefault();
        currentCity =  $("#inlineFormInputName").val();
        currentCity = currentCity.charAt(0).toUpperCase() + currentCity.substr(1, currentCity.length);
        if (currentCity !== "" && !cityStates.includes(currentCity)) {
            
            //console.log(currentCity);
            var newDiv = $("<section>");
            newDiv.addClass("choiceCard choiceCard" + currentCity); //gives us choiceCardSacramento if currentCity is Sacramento
            newDiv.html(currentCity);
            $(".box").append(newDiv);
            cityStates.push(currentCity); //updates cityStates in localStorage for generation of past cards
            console.log(cityStates);
            localStorage.setItem("city", JSON.stringify(cityStates));
            var cities = JSON.parse(localStorage.getItem("city"));
            //console.log( "city at index 0: " + cities[0])
            
            //console.log(currentCity);
            $("#inlineFormInputName").val("");
            getCityInfo();
            getForecast();
        }
    })



