from flask import (
	Blueprint, flash, render_template, request
)

from app.db import get_db

bp = Blueprint('math', __name__)

@bp.route('/', methods=['GET'])
def home():
	return render_template('index.html')

@bp.route('/game', methods=['GET'])
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
			(score)
		)
		db.commit()

	return "chill"