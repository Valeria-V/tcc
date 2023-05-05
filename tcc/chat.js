
    var Message = function(text, message_side) {
      this.text = text;
      this.message_side = message_side;
      this.draw = function() {
        var $message = $($('.message_template').clone().html());
        $message.addClass(this.message_side).find('.text').html(this.text);
        $('.messages').prepend($message);
        return setTimeout(function() {
          return $message.addClass('appeared');
        }, 0);
      };
    };
  
    var message_side = 'right';
    var getMessageText = function() {
      var $message_input = $('.message_input');
      return $message_input.val();
    };
  
    var sendMessage = function(text) {
      if (text.trim() === '') {
        return;
      }
  
      $('.message_input').val('');
      var $messages = $('.messages');
      message_side = message_side === 'left' ? 'right' : 'left';
      var message = new Message(text, message_side);
      message.draw();
  
      return $messages.animate({
        scrollTop: 0
      }, 300);
    };
  
    $('.send_message').on('click', function() {
      sendMessage(getMessageText());
    });
  
    $('.message_input').keyup(function(e) {
      if (e.which === 13) { // enter key
        sendMessage(getMessageText());
      }
    });
  
    sendMessage('Hello Philip! :)');
  
    setTimeout(function() {
      sendMessage('Hi Sandy! How are you?');
    }, 1000);
  
    setTimeout(function() {
      sendMessage('I\'m fine, thank you!');
    }, 2000);
  
  // decodificar token salvo
  const token = localStorage.getItem("token");
  console.log(token);
  
  if (token) {
    try {
      const decodedToken = jwt.jwtDecode(token);
      console.log(decodedToken);
  
      // pegar informações com o token salvo
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      // trazer resposta da api por array
fetch("https://tcc-production.up.railway.app/api/starvingless/user/v1/list", requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // montar lista de usuários
    const usersContainer = document.getElementById("master");
    let usersHTML = '';
    for (let i = 0; i < data.length; i++) {
      usersHTML += `
        <div class="user" data-user-id="${data[i].Id}">
          <h5>${data[i].FirstName}</h5>
        </div>
      `;
    }
    usersContainer.innerHTML = usersHTML;

    // Adiciona o event listener para cada elemento de usuário
    const userElements = document.querySelectorAll('.user');

    // clicar no usuário e abrir as informações na mesma página
    userElements.forEach(userElement => {
      userElement.addEventListener('click', () => {
        const userId = userElement.getAttribute('data-user-id');
        const userDetailsUrl = `https://tcc-production.up.railway.app/api/starvingless/user/v1/id/${userId}`;

        fetch(userDetailsUrl, requestOptions)
          .then(response => response.json())
          .then(userData => {
            // Abre a aba de perfil e salva o usuário clicado
            const userTab = window.open('/perfil.html', '_self');
            localStorage.setItem("perfil", userDetailsUrl);
          })
          .catch(error => console.error(error));
      });
    });
  })
        .catch(error => console.error(error));
    } catch (err) {
      console.log("Erro ao decodificar o token", err);
    }
  } else {
    console.log("Token não encontrado na storage");
  }