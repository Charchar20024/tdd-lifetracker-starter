CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT  NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE exercise (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  duration   TEXT NOT NULL,
  intensity  TEXT NOT NULL
);