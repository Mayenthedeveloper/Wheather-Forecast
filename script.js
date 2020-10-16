//'use strict'

const sunny = "https://i2-prod.examinerlive.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg"
const snowy = 
"https://st2.depositphotos.com/1363168/9872/i/950/depositphotos_98723840-stock-photo-winter-background-with-snowy-weather.jpg"
const rainy = "https://patch.com/img/cdn20/users/22887534/20200309/013414/styles/patch_image/public/donatphotography-rain-umbrella-shutterstock-728383990___09133103158.jpg?width=695"
const showers = "https://cdn.abcotvs.com/dip/images/511280_021015-shutterstock-rain-umbrella-weather-generic-img.jpg?w=1600"

const cloudy = "https://i.ytimg.com/vi/ZtNERI8FokY/maxresdefault.jpg"

const partlysunnyshowers = "https://www.wpclipart.com/weather/rain_water/partly_sunny_w_rain_showers.png"

const intermittentcloud = "https://aminus3.s3.amazonaws.com/image/g0023/u00022087/i01458799/83070d958c1b91823d6c49054e318ff9_giant.jpg"

const apiKey ="GzSdbg0NNfaCAME8yN9YN6hS8lZTKy6b";
  
  //"http://dataservice.accuweather.com/locations/v1/cities/search?apikey=GzSdbg0NNfaCAME8yN9YN6hS8lZTKy6b&q=q&language=en-us&details=false"
const searchURL = "https://dataservice.accuweather.com/locations/v1/postalcodes/search";
  
const searchURL2 =  'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  
  //Global keys
  var locationKey; 
  var locationName;
  var locationState;
  var weatherfortoday;
  
  
  function getSearchUrl(zipCode) {
   let url = `${searchURL}?language=en-us&details=false&q=${zipCode}&apikey=${apiKey}`;
   return url;
  }
  
  //This function handles adding the 5 day weather forecast in a table format  
  function displayResults(responseJson){
    
      $('#js-weatherLocation').text(`Five Day Weather Forecast For ${locationName} ${locationState}.`)
      var dailyForecasts = responseJson.DailyForecasts;
   // if there are previous results, remove them
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
    
    //Setting conditions for the background.
    if(i==0)
    {
      weatherfortoday = dayWeather
    }


       $('#result-table').append(
         `
         <tr>
            <td>${month} ${date}, ${year}</td>
            <td>${minTemp} °F</td>
            <td>${maxTemp} °F</td> 
            <td>${dayWeather}</td>
            <td>${nightWeather}</td>
         </tr>`
       )

    }
  // setting the background for the day's weather
    var backgroundURL
    
    if(weatherfortoday.toLowerCase().includes('sunny'))
    {
      backgroundURL = sunny
    }
    else if(weatherfortoday.toLowerCase().includes('rain'))
    {
      backgroundURL = rainy
    }
    else if(weatherfortoday.toLowerCase().includes('snowy'))
    {
      backgroundURL = snowy
    }
    else if(weatherfortoday.toLowerCase().includes('showers'))
    {
     backgroundURL = showers
    }

    else if(weatherfortoday.toLowerCase().includes('cloudy')) 
    {
      backgroundURL = cloudy
    }

    else if(weatherfortoday.toLowerCase().includes('partlysunnyshowers'))
    {
     backgroundURL = partlysunnyshowers
    }

    else if(weatherfortoday.toLowerCase().includes('intermittentcloud'))
    {
      backgroundURL = intermittentcloud
    }
    
    console.log(backgroundURL)

   //background image animation
    $('#bg').animate({opacity:0}, 'slow', function(){
      $('#bg').css({'background-image':`url('${backgroundURL}'`})
      .animate({opacity: 1}, 'slow');
    })
  

  //display the results section
    $('#results').removeClass('hidden')
  }
  
  //This function is for setting the month to return months instead of numbers
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
  
  //This function fetches the weather url by zipcode, and also fetches the 5 day weather forecast with the location key
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
          //console.log(forecastURL)
          return fetch(forecastURL);
      }).then(response => {
          return response.json();
        }).then(responseJson => {
            //console.log(responseJson)
            displayResults(responseJson)
      })
  }
  
  
  //This function Watches out for the form submission
  function watchForm(){
    $('form').submit(event => {
      event.preventDefault();
      //capture the value of the user's input
      const searchTerm =$('#js-searchWeather').val();
      getWeather(searchTerm);
    });
  } 
  
  
  $(watchForm);
 
  