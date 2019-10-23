$(document).ready(function () {

  $(".article__comments-form").on('submit', function(event) {
    event.preventDefault();
    let tweetBody = $(this).serialize();
    if (!$('.article__comment').val()) {
      $('#error-message-container').html('&#9888; Empty Tweet! please enter some chars to tweet. &#9888;').show().delay(3000).fadeOut();
    }
    if ($('.tweet-area').val().length > 140) {
      $('#error-message-container').html('&#9888; Too long! please respect our orbitary limit of 140 chars. &#9888;').show().delay(3000).fadeOut();
    } else {
      $.ajax({
        method: "POST",
        url:"/tweets",
        data: tweetBody
      })
      .then(loadTeewts);
    }

  });

  $('.article__comments-button').click( () => {
    $('.article__comments-container').slideToggle('slow');
    $('.article__comment').focus();
  });

})


