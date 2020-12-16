/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Test / driver code (temporary). Eventually will get this from the server.
 // Fake data taken from initial-tweets.json

$(document).ready(function() {
  const createTweetElement = function(tweetObj) {
    const $markup = $(`
      <article class="tweet">
      <header>
        <div class="tweet-author">
          <img src=${tweetObj.user.avatars} class="avatar">
          <p>${tweetObj.user.name}</p>
        </div>
        <div>
          <p class="handle">${tweetObj.user.handle}</p>
        </div>
      </header>
  
      <div class="tweet-body">
        <p>${tweetObj.content.text}</p>
      </div>
  
      <footer>
        <p>${moment(tweetObj.created_at).fromNow()}</p>
        <p class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></p>
      </footer>
      </article>
    `);
    return $markup;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet)
    }
  }

  // ajax post form submission
  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweetContent = $(this).find('#tweet-text').val()
    
    if (tweetContent === '') {
      return alert('please enter a tweet');
    }

    if (tweetContent.length > 140) {
      return alert('Max 140 characters');
    }

    $.ajax({ method: 'POST', url: '/tweets', data: $(this).serialize() })
    .done(function() {
      console.log('success')
    })
  })

  // ajax get 
  const loadTweets = function() {
    $.ajax({method: 'GET', url: '/tweets', dataType: 'JSON'})
    .done(function(response) {
      renderTweets(response);
    });
  }
  loadTweets();
});

