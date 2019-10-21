$(document).ready(function () {


  $(() => {
    $.ajax({
      method: "GET",
      url: "/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
  });

  // const createNewArticle = function (article){
  //   let date = new Date(article.post_date).toDateString();
  //   const $articles = (`
  //     <article class ='articles'>
  //     <img src="${article.users.thumbnail}">
  //     ${articles.url}
  //     ${articles.description}
  //     ${articles.url}
  //     ${articles.topic}

  //   `)
  // }

  $('.article__comments-button').click( () => {
    $('.article__comments-container').slideToggle('slow');
    $('.article__comment').focus();
  });

});
