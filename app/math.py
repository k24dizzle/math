from flask import (
	Blueprint, render_template
)

bp = Blueprint('math', __name__)

@bp.route('/test', methods=['GET'])
def test():
	return render_template('index.html')