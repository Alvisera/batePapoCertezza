from flask import Flask, render_template, redirect, url_for
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/telainicial')
def tela_inicial():
    return render_template('tela_inicial.html')

@app.route('/chat')
def chat():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    print(f"Mensagem recebida no servidor: {msg}")
    send(msg, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
