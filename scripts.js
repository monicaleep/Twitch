const url = "https://wind-bow.glitch.me/twitch-api/streams/";
const userArr = ["ESL_SC2","comster404", "ShoutFactoryTV","OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dreamhackhs", "brunofin"];
const users_url = "https://wind-bow.glitch.me/twitch-api/users/"
const main = document.querySelector('.main');

console.log(main);
document.addEventListener("DOMContentLoaded",function(event){
  userArr.forEach(function(user){
    fetch(url+user).then(response => {return response.json(); })
      .then( data => {
      if (!data.stream){
        let item = JSON.stringify(user);
        var streamer = document.createElement("div");
        streamer.id = user;
        streamer.className += "offline";
        streamer.innerHTML= "<p>" + item + " offline <br> </p>";
        //console.log(streams);
        main.appendChild(streamer);
      }
      else{
        let item = JSON.stringify(user);
        var streamer = document.createElement("div");
        streamer.id = user;
        streamer.className += "online";
        streamer.innerHTML= "<p>" +item + " online <br>" + data._links.self + "<br>" + data.stream.game +"</p>";
        //console.log(streams);
        main.appendChild(streamer);
      }
    })
    .then(function(){
    fetch(users_url+user)
      .then(response => {  return response.json();  })
      .then( data => {
        if (data.error){
          var u = document.getElementById(user)
          u.classList.remove("offline")
          u.className += " unavailable";
          u.innerHTML += "404'd, account not found"
        }
      });
    });
  });
});
