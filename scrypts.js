function getWeather(location){
   let latitude = location.latitude;
   let longitude = location.longitude;
   let lat_box = document.getElementById("lat")
   let lon_box = document.getElementById("lon")
   
   lat_box.innerHTML = location.latitude
   lon_box.innerHTML = location.longitude

   return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c708b1623179bb92fb6654448ed0ba58&units=metric`).then(response => response.json())
}

let getLocationPromise = new Promise((resolve, reject) => {
   if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function (position) {

           let spinner = document.getElementById("spinner");
           spinner.removeAttribute('hidden');  

           lat = position.coords.latitude
           long = position.coords.longitude
           resolve({latitude: lat, 
                   longitude: long})
       })

   } else {
       reject("your browser doesn't support geolocation API")
   }
})


getLocationPromise.then(location => getWeather(location)).then((response)=>{
   document.getElementById("city").innerHTML = response.name
   spinner.setAttribute('hidden', '');
   console.log(response)
   console.log("GGg",response.main.temp)
   console.log("icon", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
   let html = ` 
<div class="card">
   <div class="icon">
      <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="err">
   </div>
   <h2 class="temp">Temperature ${Math.round(response.main.temp)}°C</h2>
   <span class="feels">Feels like: ${Math.round(response.main.feels_like)}°C</span>
   <span class="wind">Wind speed: ${response.wind.speed}m/s</span>
   <span class="humidity">Humidity: ${response.main.humidity}%</span>
   <span class="cloud">Cloud: ${response.weather[0].description}</span>
</div>`;
document.getElementById("weather").innerHTML = html
}).catch((err) => {
   console.log(err)
})


