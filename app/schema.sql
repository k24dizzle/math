DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
	score INTEGER NOT NULL,
	completed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);