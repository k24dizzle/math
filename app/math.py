from flask import (
	Blueprint, render_template
)

bp = Blueprint('math', __name__)

@bp.route('/', methods=['GET'])
def home():
	return render_template('index.html')

@bp.route('/game', methods=['GET'])
def game():
	return render_template('game.html')