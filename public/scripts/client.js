/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const $markup = $(`
      <article class="tweet">
      <header>
        <div class="tweet-author">
          <img src=${escape(tweetObj.user.avatars)} class="avatar">
          <p>${escape(tweetObj.user.name)}</p>
        </div>
        <div>
          <p class="handle">${escape(tweetObj.user.handle)}</p>
        </div>
      </header>
  
      <div class="tweet-body">
        <p>${escape(tweetObj.content.text)}</p>
      </div>
  
      <footer>
        <p>${moment(tweetObj.created_at).fromNow()}</p>
        <p class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></p>
      </footer>
      </article>
    `);
    return $markup;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  // ajax post form submission
  $('form').on('submit', function(event) {
    event.preventDefault();
    // hide warning div
    $('.warning').slideUp();

    const tweetContent = $(this).find('#tweet-text').val();
    
    if (tweetContent === '') {
      $('.error-text').text('Please enter your tweet!');
      return $('.warning').slideDown();
    }

    if (tweetContent.length > 140) {
      $('.error-text').text('You have exceeded the maximum 140 characters, please try to be more concise');
      return $('.warning').slideDown();
    }

    $.ajax({ method: 'POST', url: '/tweets', data: $(this).serialize() })
      .done(function() {
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadTweets();
      });
  });

  // ajax get tweets
  const loadTweets = function() {
    $.ajax({method: 'GET', url: '/tweets', dataType: 'JSON'})
      .done(function(response) {
        renderTweets(response);
      });
  };
  loadTweets();
 

  // stretch - form toggle click event
  $('.form-toggle').on('click', function() {
    $(this).toggleClass('rotate');
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  // stretch second toggle button scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('.back-to-top').addClass('visible');
      $('.form-toggle-container').addClass('invisible');
    } else {
      $('.back-to-top').removeClass('visible');
      $('.form-toggle-container').removeClass('invisible');
    }
  });
  // second toddle click event
  $('.back-to-top').on('click', function() {
    $('html, body').animate({scrollTop: '0px'}, 300);
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
    $('.form-toggle').addClass('rotate');
  });

  
});

