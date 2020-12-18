$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function() {
    const charLimit = 140;
    let charsLeft = charLimit - $(this).val().length;
    const counter = $(this).parent().children('.tweet-button').children('.counter');
    // update counter value
    counter.val(charsLeft);
    if (charsLeft <= 0) {
      counter.addClass('characters-exceeded');
    } else {
      counter.removeClass('characters-exceeded');
    }
  });
});