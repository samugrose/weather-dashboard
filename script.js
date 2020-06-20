var bodGetter = $("body");
var cityState = "seattle";
var APIKey = "1d43caedb3b0cdb286ed6a8762ac368d";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
      console.log((response.main.temp - 273.15));
      var temp = (parseFloat(response.main.temp) - 273.15) * (9/5) + 32;
      console.log(temp);
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
      //var displayTemp = (temp − 273.15) * (9/5) + 32;
      //console.log(displayTemp);
      // Create CODE HERE to transfer content to HTML
      var bod = $("body");
      var newDiv = $("<div>");
      newDiv.text("Temp in Bujumbura: " + temp.toFixed(1));
      bod.append(newDiv);
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // Create CODE HERE to dump the temperature content into HTML

    });

    // <div class = "page-header d-flex align-items-center justify-content-center">
    //     <h1>
    //        Weather Dashboard 
    //     </h1>
    //  </div>
    var head = $("<div>");
    head.attr("class","page-header d-flex align-items-center justify-content-center");
    var headH1 = $("<h1>");
    headH1.text("Weather Dashboard");
    head.append(headH1); 
    bodGetter.append(head);
