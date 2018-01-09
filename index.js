var latitude;
var longitude;
var url = "https://fcc-weather-api.glitch.me/";
var tempUnit;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude, longitude);

      console.log(latitude);
      console.log(longitude);
    });
  } else {
    console.log("Error, cannot determine your location.");
  }

  function getWeather(latitude, longitude) {
    $.getJSON(
      url + "/api/current?lat=" + latitude + "&lon=" + longitude,
      function(json) {
        $(".loc").html("<h2 class='loc'>" + json.name + "</h2>");
        $(".temp").html(
          "<h2>" +
            Math.round(json.main.temp) +
            " °<button class='as-text unit'>C</button></h2>"
        );
        tempUnit = "C";
        $(".type").html(json.weather[0].main);
        $(".icon").html("<img src=" + json.weather[0].icon + "/>");
        $(".temp").click(function() {
          if (tempUnit === "C") {
            var fahrenheit = Math.round(9 * json.main.temp / 5 + 32);
            $(".temp").html(
              "<h2>" +
                fahrenheit +
                " °<button class='as-text unit' id='f'>F</button></h2>"
            );
            tempUnit = "F";
          } else if (tempUnit === "F") {
            $(".temp").html(
              "<h2>" +
                Math.round(json.main.temp) +
                " °<button class='as-text unit'>C</button></h2>"
            );
            tempUnit = "C";
          }
        });
      }
    );
  }
});