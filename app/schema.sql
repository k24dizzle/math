DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user TEXT NOT NULL,
	score INTEGER NOT NULL,
	started TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);