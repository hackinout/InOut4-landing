$(document).ready(function () {
	var url = $("#video")[0].src
	$('#play-video').on('click', function (ev) {

		$("#video")[0].src = url + "?autoplay=1";
		ev.preventDefault();

	});
	$("#play-modal").on('hidden.bs.modal', function (e) {
		$("#play-modal iframe").attr("src", url);
	});
	$('.video-container').hover(function (){
		$('.play-button').toggleClass('scale')
	});

});
var about = document.querySelector('.about-container');
var video = document.querySelector('.video-container');
var play_video = document.getElementById('play-video-bg');
var yt = document.querySelector('iframe');
var aboutWidth = about.getBoundingClientRect().width;
var aboutHeight = about.getBoundingClientRect().height;
var play_videoHeight = play_video.getBoundingClientRect().height;
// var vW = video.style.width = aboutWidth + 'px';
// var vH = video.style.height = aboutHeight + 'px';
var pV = aboutHeight + 'px';
console.log(pV);
// yt.width = vW;
// yt.height = vH;
// about.style.height = play_videoHeight + 'px';
// play_video.style.height = "79%";
// play_video.style.width = "100%";
var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
if (windowWidth > 992) {
	about.style.height = play_videoHeight + 'px';
}
console.log("windowWidth:", windowWidth)
console.log("windowHeight:", windowHeight)

$(document).ready( function () {
    var $form = $('form');
    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
			register($form);
        });
    }
});

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                // Something went wrong, do something to notify the user.
				console.log(data.msg);
				$( ".error" ).html( "<p>" + data.msg.substring(4) + "</p>" );
				$('.success').hide();
            } else {
				$('.error').hide();
				$( ".success" ).html( "<p>Thank you for subscribing</p>" );
            }
        }
    });
}

