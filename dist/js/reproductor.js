(function IIFE() {
  var list = [
  {
    id: 1,
    url:
    "dist/audio/1 Vislumbre.mp3",
    author: "Avistaje",
    title: "Vislumbre",
    cover:
    "dist/imagenes/avcd-disc.jpg" },

  {
    id: 2,
    url:
    "dist/audio/2 Radiante.mp3",
    author: "Avistaje",
    title: "Radiante",
    cover:
    "dist/imagenes/avcd-disc.jpg" },

  {
    id: 3,
    url:
    "dist/audio/3 Caida Libre.mp3",
    author: "Avistaje",
    title: "Caída Libre",
    cover:
    "dist/imagenes/avcd-disc.jpg" },

  {
    id: 4,
    url:
    "dist/audio/4 Desvolucion.mp3",
    author: "Avistaje",
    title: "Desvolucón",
    cover:
    "dist/imagenes/avcd-disc.jpg" },

  {
    id: 5,
    url:
    "dist/audio/5 Tomasito.mp3",
    author: "Avistaje",
    title: "Tomasito",
    cover:
    "dist/imagenes/avcd-disc.jpg" },

  {
    id: 6,
    url:
    "dist/audio/6 Tus Ojos.mp3",
    author: "Avistaje",
    title: "Tus Ojos",
    cover:
    "dist/imagenes/avcd-disc.jpg" }
  ];



  var currentId = 0;
  var isPlaying = false;
  var isLoop = true;
  var isShuffle = false;
  var currentAudio = "music1";
  var timer = null;
  var loopOne = false;

  var currentTimeIndicator = document.querySelector(".music-time__current");
  var leftTimeIndicator = document.querySelector(".music-time__last");
  var progressBar = document.getElementById("length");
  var playBtn = document.querySelector(".play");
  var cover = document.querySelector(".cover");
  var title = document.querySelector(".music-player__title");
  var author = document.querySelector(".music-player__author");

  var loopBtn = document.getElementById("loop");
  var shuffleBtn = document.getElementById("shuffle");
  var forwardBtn = document.getElementById("forward");
  var backwardBtn = document.getElementById("backward");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var progressDiv = document.getElementById("progress");

  function play(e) {
    if (!isPlaying) {
      // console.log('play');
      e.target.src =
      "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/pause.svg";
      e.target.alt = "Pause";
      isPlaying = true;
      document.getElementById(currentAudio).play();
      showTime();
    } else {
      // console.log('pause');
      e.target.src =
      "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
      e.target.alt = "Play";
      document.getElementById(currentAudio).pause();
      isPlaying = false;
      clearInterval(timer);
    }
  }

  function changeBar() {
    var audio = document.getElementById(currentAudio);
    var percentage = (audio.currentTime / audio.duration).toFixed(3);
    progressBar.style.transition = "";
    // console.log(audio.currentTime);

    //set current time
    var minute = Math.floor(audio.currentTime / 60);
    var second = Math.floor(audio.currentTime % 60);
    var leftTime = audio.duration - audio.currentTime;
    currentTimeIndicator.innerHTML =
    ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

    //set left time
    var leftMinute = Math.floor(leftTime / 60);
    var leftSecond = Math.floor(leftTime % 60);

    leftTimeIndicator.innerHTML =
    ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

    //set time bar
    progressBar.style.width = percentage * 100 + "%";
  }

  function showTime() {
    timer = setInterval(function () {return changeBar();}, 500);
  }

  function nextMusic(mode) {
    playBtn.src =
    "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
    playBtn.alt = "Play";
    document.getElementById(currentAudio).pause();
    isPlaying = false;
    clearInterval(timer);

    if (mode === "next") {
      currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      init();
    } else {
      currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
      init();
    }
  }

  function shuffle(e) {
    isShuffle = !isShuffle;
    if (isShuffle) {
      e.target.parentNode.classList.add("is-loop");
    } else {
      e.target.parentNode.classList.remove("is-loop");
    }
  }

  function backward() {
    var audio = document.getElementById(currentAudio);
    audio.currentTime -= 5;
    if (!isPlaying) {
      changeBar();
    }
  }

  function forward() {
    var audio = document.getElementById(currentAudio);
    audio.currentTime += 5;
    if (!isPlaying) {
      changeBar();
    }
  }

  function stopMusic() {
    playBtn.src =
    "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/play.svg";
    playBtn.alt = "Play";
    isPlaying = false;
  }

  function goToNextMusic() {
    var newId = currentId;
    while (isShuffle && !loopOne && newId === currentId) {
      newId = Math.floor(Math.random() * Math.floor(list.length - 1));
    }

    if (!isShuffle && !loopOne) {
      currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
    }
    if (!isShuffle && loopOne) {
      currentId = currentId;
    }

    if (isShuffle) {
      currentId = newId;
    }
    init();
    document.getElementById(currentAudio).play();
  }

  function loop(e) {
    var audio = document.getElementById(currentAudio);

    if (!isLoop && !loopOne) {
      isLoop = true;
      loopOne = false;
      // console.log('is loop');
      e.target.parentNode.classList.add("is-loop");
      e.target.src =
      "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
      audio.loop = false;
      audio.onended = function (e) {return goToNextMusic();};
      console.log(isLoop, loopOne);
    } else if (isLoop && !loopOne) {
      // console.log('is loop one');
      isLoop = true;
      loopOne = true;
      e.target.parentNode.classList.add("is-loop");
      e.target.src =
      "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loopone.svg";
      audio.loop = true;
      audio.onended = function (e) {return goToNextMusic();};
      console.log(isLoop, loopOne);
    } else {
      // console.log('not loop');
      isLoop = false;
      loopOne = false;
      e.target.parentNode.classList.remove("is-loop");
      e.target.src =
      "https://snowleo208.github.io/100-Days-of-Code/7.%20Music%20Player/img/loop.svg";
      audio.loop = false;
      audio.onended = function (e) {return stopMusic();};
      console.log(isLoop, loopOne);
    }
  }

  function progress(e) {
    var audio = document.getElementById(currentAudio);
    //get current position and minus progress bar's x position to get current position in progress bar
    var pos =
    (e.pageX - progressDiv.getClientRects()[0].x) /
    progressDiv.getClientRects()[0].width;
    audio.currentTime = pos * audio.duration;
    changeBar();
  }

  function init() {
    //reset music duration and setup audio
    var audio =
    document.getElementById(currentAudio) === null ?
    new Audio() :
    document.getElementById(currentAudio);
    audio.src = list[currentId].url;
    audio.id = currentAudio;
    document.getElementById(currentAudio) === null ?
    document.body.appendChild(audio) :
    "";

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    document.getElementById(currentAudio).currentTime = 0;

    title.innerHTML = list[currentId].title;
    author.innerHTML = list[currentId].author;
    cover.src = list[currentId].cover;

    //set current time
    audio.addEventListener("loadedmetadata", function () {
      var leftMinute = Math.floor(audio.duration / 60);
      var leftSecond = Math.floor(audio.duration % 60);
      currentTimeIndicator.innerHTML = "00:00";
      leftTimeIndicator.innerHTML =
      ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
      progressBar.style.transition = "";
    });

    //set loop
    document.getElementById(currentAudio).onended = function (e) {return goToNextMusic(e);};
  }

  playBtn.addEventListener("click", play);
  loopBtn.addEventListener("click", loop);

  shuffleBtn.addEventListener("click", shuffle);
  forwardBtn.addEventListener("click", forward);
  backwardBtn.addEventListener("click", backward);

  prevBtn.addEventListener("click", function (e) {return nextMusic("prev");});
  nextBtn.addEventListener("click", function (e) {return nextMusic("next");});
  progressDiv.addEventListener("click", function (e) {
    progress(e);
  });

  init();
})();