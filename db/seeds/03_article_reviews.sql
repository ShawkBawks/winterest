DROP TABLE IF EXISTS article_reviews CASCADE;
CREATE TABLE article_reviews (
	id SERIAL PRIMARY KEY NOT NULL,
	comment VARCHAR(255),
	rating SMALLINT,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM articles, articles_review
JOIN articles ON article_id = articles.id;

INSERT INTO article_reviews (comment, rating)
 VALUES ("IT IS THE BEE'S KNEES. This is the best comment I have ever seen!", 5);


INSERT INTO article_reviews (comment, rating)
 VALUES ('I mean, its alright...This is the most mediocre comment I have ever seen!', 3);


 INSERT INTO article_reviews (comment, rating)
 VALUES ('What is this article?! This is the worst comment I have ever seen!', 1);
