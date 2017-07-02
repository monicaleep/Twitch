const url = "https://wind-bow.glitch.me/twitch-api/streams/";
const userArr = ["ESL_SC2","comster404", "ShoutFactoryTV","OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dreamhackhs", "brunofin"];
const users_url = "https://wind-bow.glitch.me/twitch-api/users/"
const main = document.querySelector('.main');



document.addEventListener("DOMContentLoaded",function(event){
  userArr.forEach(function(user){
    fetch(url+user)
    .then(handleErrors)
    .then(response => {return response.json(); })
    .then( data => {
      addStream(user, data);
    })
    .then(function(){
    fetch(users_url+user)
    .then(handleErrors)
      .then(response => {  return response.json();  })
      .then( data => {
        if (data.error){
          var u = document.getElementById(user)
          u.classList.remove("offline")
          u.className += " unavailable";
          u.innerHTML += "404'd, account not found"
        }
      });
    })
    .catch(error => alert(error));
  });
});
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function addStream(user, data){
  var streamer = document.createElement("div");
  streamer.id = user;
  if (!data.stream){
    streamer.className += "offline";
    streamer.innerHTML= "<p>" + user + " offline <br> </p>";
  }
  else{
    streamer.className += "online";
    streamer.innerHTML= "<p>" +user + " online <br>" + data._links.self + "<br>" + data.stream.game +"</p>";
  }
  main.appendChild(streamer);
}
