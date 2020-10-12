/*
1. Hit the location api with the postal code: 2 things -- 1) location name, location key
2. hit forecast API with location key: Get the 5 days of weather forecast
 */


const images = [
    {
      "type": "Sunny",
      "src": "https://i2-prod.examinerlive.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg"
    },
    {
      "type": "Snowy",
      "src":"https://st2.depositphotos.com/1363168/9872/i/950/depositphotos_98723840-stock-photo-winter-background-with-snowy-weather.jpg"
    },
    {
      "type": "Rainy",
      "src": "https://patch.com/img/cdn20/users/22887534/20200309/013414/styles/patch_image/public/donatphotography-rain-umbrella-shutterstock-728383990___09133103158.jpg?width=695"
    }
  ];
  
  const apiKey ="GzSdbg0NNfaCAME8yN9YN6hS8lZTKy6b";
  
  //"http://dataservice.accuweather.com/locations/v1/cities/search?apikey=GzSdbg0NNfaCAME8yN9YN6hS8lZTKy6b&q=q&language=en-us&details=false"
  const searchURL = "https://dataservice.accuweather.com/locations/v1/postalcodes/search";
  
  const searchURL2 =  'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
  

  var locationKey; 
  var locationName;
  var locationState;

  
  function getSearchUrl(zipCode) {
   let url = `${searchURL}?language=en-us&details=false&q=${zipCode}&apikey=${apiKey}`;
   return url;
  }
  
  
  function displayResults(responseJson){
    
      $('#js-weatherLocation').text(`Five Day Weather Forecast For: ${locationName} ${locationState}`)
      var dailyForecasts = responseJson.DailyForecasts;

   $('#results-list').empty();
  
    // iterate through the items array
    for(let i=0; i< dailyForecasts.length; i++){
        var maxTemp = dailyForecasts[i].Temperature.Maximum.Value
        var minTemp = dailyForecasts[i].Temperature.Minimum.Value
        var dates = new Date(dailyForecasts[i].Date); 
        var dayWeather = dailyForecasts[i].Day.IconPhrase
        var nightWeather = dailyForecasts[i].Night.IconPhrase
        var month = getMonth(dates)
        var date = dates.getDate()
        var year = dates.getFullYear()
    

      $('#results-list').append(
        `<li>
        <p> Dates: ${month} ${date}, ${year}</p>
        <p> Min : ${minTemp}°F</p>
        <p> Max : ${maxTemp}°F</p>
        <p> Weather during the day:  ${dayWeather}</p>
        <p>Weather at Night: ${nightWeather}</p>
        </li>`
      )
    }
    $('#results').removeClass('hidden')
  }
  
  function getMonth(dates){
    if(dates.getMonth() === 0)
    return 'January'
    else if(dates.getMonth() === 1)
    return 'February'
    else if(dates.getMonth() === 2)
    return 'March'
    else if(dates.getMonth() === 3)
    return 'April'
    else if(dates.getMonth() === 4)
    return 'May'
    else if(dates.getMonth() === 5)
    return 'June'
    else if(dates.getMonth() === 6)
    return 'July'
    else if(dates.getMonth() === 7)
    return 'August'
    else if(dates.getMonth() === 8)
    return 'September'
    else if(dates.getMonth() === 9)
    return 'October'
    else if(dates.getMonth() === 10)
    return 'November'
    else if(dates.getMonth() === 11)
    return 'December'
  }
  
  
  function getWeather(query){
   var url = getSearchUrl(query) //locationURL 
   fetch(url)
      .then(response => {
        return response.json();
      }).then(responseJson => {
          locationKey = responseJson[0].Key;
          locationName = responseJson[0].LocalizedName;
          locationState = responseJson[0].AdministrativeArea.LocalizedName
          var forecastURL = `${searchURL2}${locationKey}?apikey=${apiKey}`
          console.log(forecastURL)
          return fetch(forecastURL);
      }).then(response => {
          return response.json();
        }).then(responseJson => {
            console.log(responseJson)
            displayResults(responseJson)
      })
  }
  
  
  
  function watchForm(){
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm =$('#js-searchWeather').val();
      getWeather(searchTerm);
    });
  } 
  
  function renderBackgroundImage(){
    $('body').css('background-image', 'url('+ images[0].src + ')');
  }
   
  
  $(watchForm);
  
  //$(renderBackgroundImage);
  