slides = [];

$(document).ready(function() {
  $.get(
      "https://codestats.net/api/users/datguy",
      {paramOne : 1, paramX : 'abc'},
      function(data) {
         animateData(data);
      }
  );
  let slideNum = window.prompt("Enter number of slides", 3);

  for (var i = 0; i <= slideNum; i++) {
    slides[i] = $("<div class='slide' id='slide"+i+"'></div>");
  }

  slides[0].html("<h1>Title</h1>");

  showSlides();

});

function showSlides() {
  console.log(slides);
  for (var i = 0; i <= slides.length; i++) {
    $("body").append(slides[i]);
  }
}

function animateData(data) {
  $username = data.user;
  $totaluserXP = data.total_xp;
  $totalusernewXP = data.new_xp;
  $userMaschines = data.maschines;
  $userLangs = data.languages;

  $totalLevel = get_level($totaluserXP);
  $totalNextLevelXP = get_next_level_xp($totalLevel);

  $("#username").text($("#username").text() + $username);

  $("#total_xp").text($("#total_xp").text() + $totalLevel);
  var total_xp_container = new ProgressBar.Circle('#total_xp_container', {
        color: '#aefc3d',
        trailWidth: 10,
        strokeWidth: 10,
        duration: 3000,
        easing: 'easeInOut',
        text: {
          value: $totaluserXP
        }
    });
  $("#new_xp").text($("#new_xp").text() + $totalusernewXP);

  total_xp_container.animate($totaluserXP / $totalNextLevelXP);

}

function get_level(xp) {
  return Math.floor(0.025 * Math.sqrt(xp));
}

function get_next_level_xp(level) {
  return Math.pow(Math.ceil((level + 1) / 0.025), 2)
}
