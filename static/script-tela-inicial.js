for(let i = 0; i < 100; i++) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 10 + 3}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(particle);
}

const username = localStorage.getItem('username');
        console.log(username)
        if (!username) {
            window.location.href = '/login';
        } else {
            document.querySelector('h3').innerText = `Bem-vindo, ${username}!`;
        }

document.getElementById('img-menu-hamburguer').addEventListener('click', function() {
    var abaLateral = document.getElementById('aba-lateral');
    abaLateral.classList.toggle('open'); 

    var h3_bemVindo = document.getElementById('bem-vindo');
    h3_bemVindo.classList.toggle('open');
    
    var h1_containerPrincipal = document.getElementById('h1-titulo-principal');
    h1_containerPrincipal.classList.toggle('open');

    var img_menu = document.getElementById('img-menu-hamburguer');
    img_menu.classList.toggle('open');
});

const chat = document.getElementById('id_chat');
chat.addEventListener('click', function() {
    window.location.href = '/chat';
})
        
function trocarImagem(elemento, novaImagem) {
    elemento.style.opacity = '0';  
    setTimeout(function() {
      elemento.src = novaImagem;   
      elemento.style.opacity = '1'; 
    }, 100);  
  }

  function restaurarImagem(elemento, imagemOriginal) {
    elemento.style.opacity = '0';  
    setTimeout(function() {
      elemento.src = imagemOriginal;  
      elemento.style.opacity = '1';  
    }, 100);  
  }

window.addEventListener('beforeunload', function() {
  document.getElementById('loader').style.display = 'block'; 
  document.body.classList.add('fade'); 
});

window.addEventListener('load', function() {
  document.body.classList.add('fade-in');
  document.getElementById('loader').style.display = 'none';
});