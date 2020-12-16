/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Test / driver code (temporary). Eventually will get this from the server.
 // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$( document ).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet)
    }
  }


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
  renderTweets(data);

  // ajax form submission
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({ method: 'POST', url: '/tweets', data: $(this).serialize(), dataType: 'JSON' })
    .done(function(a) {
      console.log('data: ', a);
    })
  })



});

