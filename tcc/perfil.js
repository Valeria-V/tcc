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
      const perfil = localStorage.getItem("perfil");
      // trazer resposta da api por array
      fetch(perfil, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // montar lista de usuários
        const usersContainer = document.getElementById("perfil");
        let usersHTML = '';
          usersHTML += `
            <div class="user" data-user-id="${data.Id}">
              <h5>${data.FirstName} ${data.LastName}</h5>
              <p>Endereço: <span>${data.Address}</span><p>
              <p>E-mail: <span>${data.email}</span><p>
              <p>Telefone: <span>${data.Phone}</span><p>
              <p>Data de criação: <span>${data.SignUpDate}</span><p>
            </div>
          `;
        usersContainer.innerHTML = usersHTML;
        });
    } catch (err) {
        console.log("Erro ao decodificar o token", err);
      }
  } else {
    console.log("Token não encontrado na storage");
  }