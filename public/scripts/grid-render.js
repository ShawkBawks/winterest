$(document).ready(function () {
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  let loadArticles = () => {
    $.get('/articles', function(res){
    renderArticles(res);
    //  res = articles.articles;
    resizeAllGridItems();
    console.log(res)
    //  console.log(articles)
    })
  };

  // grid render
  let renderArticles = (articles) => {
    // // articles = JSON.parse(articles)
    // console.log(articles.articles[0])
    articles = articles.articles;
    $('.grid').empty();
    for (let article in articles){
      let output = createArticleTile(articles[article]);
      $('.grid').prepend(output);
      console.log(articles[article])
      console.log('test renderArticles:', article)
    }
  }

  // let renderArticles = (articles) => {
  //   $('.grid').empty();
  //   articles.forEach(function(obj){
  //     for (i in obj){
  //       let output = createArticleTile(article);
  //       $('.grid').prepend(output);
  //     }
  //   })
  // }

  let createArticleTile = function(article) {
    let $article = (`
    <div class="item blog">
    <div class="content">
      <div class="title">
        <h3>${article.title}</h3>
      </div>
      <img src="${article.thumbnail}" class="photothumb">
      <div class="desc">
        <p>${article.description}</p>
      </div>
      <div class="article_link">
          <a target="_blank" href="${article.url}">Link</a>
      </div>
      <div class="article_date">
        post_date: 2019-10-18
      </div>
      <div>
        topic: ${article.topic}
      </div>
    </div>
  </div>
    `);
  return $article;
  };
    loadArticles();
})
