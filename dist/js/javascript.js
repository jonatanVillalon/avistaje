//variables
const btnToggle = document.getElementById('main-menu-toggle');
const nav = document.getElementById('main-nav');
const lcontainer = document.querySelector(".l-container");
const pua = document.querySelector('.pua');

const modal = document.querySelector('#modal-av');
const btnModal = document.querySelector('#btn-modal-av');
const cerrarModal = document.querySelector('.close-modal');

//events listeners

//toggle navegacion celulares
btnToggle.addEventListener('click', toggle);

btnModal.addEventListener('click', abrirModal);
cerrarModal.addEventListener('click', cerrarModales);

//funcion
function toggle() {
    nav.classList.toggle('show');
}

function abrirModal()
	{
	modal.style.display = "block";
	}

function cerrarModales()
	{
	modal.style.display = "none";
	}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//precarga la pagina
window.addEventListener('load', precargaPagina);
	
//precarga de la pagina
function precargaPagina(){

  let tiempo = setTimeout(showPage, 11000);	

}

function showPage(){
	 /** var img1 = new Image();
  img1.src = 'img/foto-secundaria-1.jpg';

  var img2 = new Image();
  img2.src = 'img/foto-secundaria-2.jpg';

  var img3 = new Image();
  img3.src = 'img/foto-secundaria-3.jpg';**/

  //Cuando se terminan de cargar las imágenes se le agrega la clase "close" a #wrap-preload.
  var preload = document.getElementById('loader');

  preload.classList.add('close');

}

// función para obtener el ancho de la barra de scroll
const getScrollBarWidth = () => window.innerWidth - document.documentElement.getBoundingClientRect().width;

// funcion para asignar ese valor a una variable css
const cssScrollBarWidth = () => document.documentElement.style.setProperty('--scrollbar', `${getScrollBarWidth()}px`);

// asignar la variable css al cargar la página
addEventListener('load', cssScrollBarWidth);

// reasignar la variable css al redimensionar la ventana
addEventListener('resize', cssScrollBarWidth);


/** JQUERY **/
$(document).ready(function() {
		$('a[href*="#"]').bind('click', function(e) {
				e.preventDefault(); // prevent hard jump, the default behavior

				var target = $(this).attr("href"); // Set the target as variable

				// perform animated scrolling by getting top-position of target-element and set it as scroll target
				$('html, body').stop().animate({
						scrollTop: $(target).offset().top
				}, 2000, function() {
						location.hash = target; //attach the hash (#jumptarget) to the pageurl
				});

				return false;
		});

});

$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();

		 
		if (scrollDistance >= 1000) {
			$(lcontainer).fadeIn("slow");
			$(pua).fadeIn("slow");
		} else {
			$(lcontainer).fadeOut("slow");
			$(pua).fadeOut("slow");
		}
	
		// Assign active class to nav links while scolling
		$('.page-section').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('.main-nav a').removeClass('active');
						$('.main-nav a').eq(i).addClass('active');
				}
		});

}).scroll();


/** API DE VIDEOS YOUTUBE // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('video-player', {
      height: '100%',
      width: '100%',
	  playerVars: {'autoplay': 1, 'controls': 0, 'mute':1, 'loop': 1, 'rel': 0, 'start': 15, 'playsinline':1, 'showinfo':0},
      videoId: 'KaBbW_jVZDk'
    });
  }**/