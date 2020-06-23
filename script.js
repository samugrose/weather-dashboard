var bodGetter = $("body");
var cityStates = ["seattle"];
var APIKey = "1d43caedb3b0cdb286ed6a8762ac368d";

    // Here we are building the URL we need to query the database
    function getCityInfo() {
        for (i = 0; i < cityStates.length; i++) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityStates[i] + "&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
    //   console.log(queryURL);
      // Create CODE HERE to log the resulting object
    //   console.log((response.main.temp - 273.15));
    //   var temp = (parseFloat(response.main.temp) - 273.15) * (9/5) + 32;
    //   console.log(temp);
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
      //var displayTemp = (temp − 273.15) * (9/5) + 32;
      //console.log(displayTemp);
      // Create CODE HERE to transfer content to HTML
    //   var bod = $("body");
    //   var newDiv = $("<div>");
    //   newDiv.text("Temp in Bujumbura: " + temp.toFixed(1));
    //   bod.append(newDiv);
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // Create CODE HERE to dump the temperature content into HTML

    });
}
}

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
    

    //looks like an md-9 and md-3
//     var container = $("<section>");
//     container.addClass("container");
//     bodGetter.prepend(container); // adds header to top, 
//     bodGetter.prepend(head);

//     var bigRow = $("<section>");
//     bigRow.addClass("row");
//     container.append(bigRow);

//     var md3 = $("<section>");
//     md3.addClass("col-md-3");
//     bigRow.append(md3);
//     md3.prepend($("#submitSec"));

    

//     var md9 = $("<section>");
//     md9.addClass("col-md-9");
//     bigRow.append(md9);

//     var md9TopRow = $("<section>");
//     md9TopRow.addClass("row");
//     var md9Col = $("<section>");
//     md9Col.addClass("col-md-12");
//     md9TopRow.append(md9Col);
//     md9.append(md9TopRow);

//     var md9BtmRow = $("<section>");
//     md9BtmRow.addClass("row");
//     //var md9BtmCol = $("<section>");
//     //md9BtmCol.addClass("col-md-12"); //make this in html and append it to this md9btmrow
//    // md9BtmRow.append($("#weatherTiles"));
//     //md9.append(md9BtmRow);
//     for (i = 0; i < 5; i++) {
//         var weatherBlock = $("<section>");
//         weatherBlock.addClass("col-md-12 d-flex justify-content-between");
//         weatherBlock.attr("id", "weatherTiles")
//         md9BtmRow.append(weatherBlock);
//     }
    
    jQuery(`[type = "Submit"]`).on("click", function() {
        event.preventDefault();
        
        var currentCity =  $("#inlineFormInputName").val();
        cityStates.push(currentCity);
        console.log(cityStates);
        getCityInfo();
    //$("input:text").val("Glenn Quagmire");
    })
    

    //generate a form, add labels and input and


