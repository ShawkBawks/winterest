$(document).ready(function () {

  $(() => {
    $.ajax({
      method: "GET",
      url: "/users"
    }).done((users) => {
      users = users.users
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
  });

<<<<<<< HEAD
//   function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#blah')
//                 .attr('src', e.target.result);
//         };

//         reader.readAsDataURL(input.files[0]);
//     }
// };

// const createNewArticle = function (article){
//   let date = new Date(article.post_date).toDateString();
//   const $articles = (`
//     <article class ='articles'>
//     <img src="${article.users.thumbnail}">
//     ${articles.url}
//     ${articles.description}
//     ${articles.url}
//     ${articles.topic}
=======
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
>>>>>>> 578766fc79686760abdbbc6f0c7c1d46d4e851ad

});
