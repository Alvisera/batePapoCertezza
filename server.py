from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send
import http.client
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def get_cnpj_data(cnpj):
    conn = http.client.HTTPSConnection("receitaws.com.br")
    headers = { 'Accept': "application/json" }
    conn.request("GET", f"/v1/cnpj/{cnpj}", headers=headers)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))

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
    return render_template('chat.html')

@app.route('/search', methods=['GET', 'POST'])
def consulta_cnpj():
    if request.method == 'POST':
        cnpj = request.form['cnpj']
        json_data = get_cnpj_data(cnpj)

        data = {
            'nome': json_data.get("nome", "Não disponível"),
            'fantasia': json_data.get("fantasia", "Não disponível"),
            'cnpj': json_data.get("cnpj", "Não disponível"),
            'abertura': json_data.get("abertura", "Não disponível"),
            'situacao': json_data.get("situacao", "Não disponível"),
            'endereco': f"{json_data.get('logradouro', 'Não disponível')}, {json_data.get('numero', 'Não disponível')}, {json_data.get('bairro', 'Não disponível')}, {json_data.get('municipio', 'Não disponível')}, {json_data.get('uf', 'Não disponível')}, {json_data.get('cep', 'Não disponível')}",
            'atividade_principal': json_data.get("atividade_principal", [{}])[0].get("text", "Não disponível"),
            'capital_social': json_data.get("capital_social", "Não disponível"),
        }

        return render_template('result.html', data=data)
    return render_template('consulta_cnpj.html')

@socketio.on('message')
def handle_message(msg):
    print(f"Mensagem recebida no servidor: {msg}")
    send(msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)