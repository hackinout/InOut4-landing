var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var av = document.querySelector('.about-video')

if (windowWidth > 992) {
  av.classList.add('flex')
} else {
  av.classList.remove('flex')
}

function setaboutHeight(e) {
  var w = e.target.innerWidth
  if (w > 992) {
    av.classList.add('flex')
  } else {
    av.classList.remove('flex')
  }
}

window.addEventListener('resize', setaboutHeight, true)

$(document).ready(function () {
  var url = 'https://www.youtube.com/embed/SzmioR4Dj8E'
  $('#play-video').on('click', function (ev) {
    $('#video')[0].src = url + '?autoplay=1'
    ev.preventDefault()
  })
  $('#play-modal').on('hidden.bs.modal', function (e) {
    $('#play-modal iframe').attr('src', url)
  })
  $('.video-container').hover(function () {
    $('.play-button').toggleClass('scale')
  })
})

$(document).ready(function () {
  var $form = $('form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }
})

function register($form) {
  $('#mc-embedded-subscribe').val('checking...')
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $('#mc-embedded-subscribe').val('subscribe')
      if (data.result != 'success') {
        // Something went wrong, do something to notify the user.
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').css('color', '#ff8282')
        if (data.msg.indexOf("already") >= 0) {
          $('#subscribe-result').html('<p>' + data.msg + '</p>')
        } else {
          $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
        }
      } else {
        // Yeahhhh Success
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').css('color', '#ffffff')
        $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('')
      }
    }
  })
};
