$(document).ready(function () {

  //fILTER OVA HERE!!
  filterSelection("all")
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
  }

  // Show filtered elements
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  // Hide elements that are not selected
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  // Add active class to the current control button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }






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
<<<<<<< HEAD
=======

>>>>>>> feature_article_view
});
