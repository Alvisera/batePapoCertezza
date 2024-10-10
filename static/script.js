const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark')
})

document.getElementById('chk').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('botao').addEventListener('click', function() {
    document.getElementById('container_l').style.display = 'block';
    setTimeout(function() {
      document.getElementById('container_l').style.display = 'none';
    }, 10000); 
  });

document.getElementById("botao").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(); 
  }
});

