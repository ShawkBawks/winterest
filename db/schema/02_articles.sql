-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  post_date DATE,
  likes BOOLEAN SET DEFAULT FALSE,
  author_id INTEGER REFERENCES users.id ON DELETE CASCADE,
  topic VARCHAR(50) NOT NULL
);
