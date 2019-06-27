from flask import (
	Blueprint, flash, render_template, request
)

from app.db import get_db

bp = Blueprint('math', __name__)

# @bp.route('/', methods=['GET'])
# def home():
# 	return render_template('index.html')

@bp.route('/', methods=['GET'])
def game():
	return render_template('game.html')

@bp.route('/result', methods=['POST'])
def result():
	score = request.form['score']
	db = get_db()
	if not score:
		flash(error)
	else:
		db.execute('INSERT INTO scores (score) VALUES (?)',
			(score,)
		)
		db.commit()

	total = tuple(db.execute('SELECT COUNT(*) FROM scores').fetchone())[0]
	beat = tuple(db.execute('SELECT COUNT(*) FROM scores WHERE score <= ?', (score,)).fetchone())[0]
	percentile = (beat * 100.0) / total
	return "%.1f" % percentile

@bp.route('/results', methods=['GET'])
def results():
	rows = []
	for row in db.execute('SELECT score, COUNT(*) as count FROM scores GROUP BY score ORDER BY score'):
		print(row.keys())
		print(tuple(row))
		rows.append(tuple(row))
	return rows