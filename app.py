from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('login.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')    
    

@app.route('/profile')
def profile():
    return render_template('profile.html') 


@app.route('/map')
def map():
    return render_template('map.html')    


@app.route('/forgotpassword')
def forgotpassword():
    return render_template('forgotpassword.html')    


if __name__ == 'main':
	app.run(debug=True)


