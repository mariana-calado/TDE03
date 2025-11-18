async function loadPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "Carregando posts...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Erro ao buscar posts. Código: " + response.status);
    }

    const posts = await response.json();

    postsDiv.innerHTML = ""; 
    
    posts.slice(0, 10).forEach(post => {
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      postsDiv.appendChild(div);
    });

  } catch (erro) {
    postsDiv.innerHTML = `<p class="error-message">Erro ao carregar posts: ${erro.message}</p>`;
    console.error("Erro no GET:", erro);
  }
}

async function createPost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const postMessage = document.getElementById("postMessage");

  postMessage.innerHTML = "Enviando...";
  postMessage.className = ""; 
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao criar post. Código: " + response.status);
    }

    const data = await response.json(); 

    postMessage.innerHTML = `Post criado com sucesso! (ID retornado: ${data.id})`;
    postMessage.classList.add("success-message");

    const postsDiv = document.getElementById("posts");
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("post", "post-new"); 
    newDiv.innerHTML = `
        <h3>[NOVO] ${data.title}</h3>
        <p>${data.body}</p>
        <small>Simulação criada localmente. ID: ${data.id}</small>
    `;
    
    postsDiv.prepend(newDiv); 
    
    document.getElementById("postForm").reset();

  } catch (erro) {
    postMessage.innerHTML = `Erro ao enviar post: ${erro.message}`;
    postMessage.classList.add("error-message");
    console.error("Erro no POST:", erro);
  }
}

document.getElementById("postForm").addEventListener("submit", createPost);

loadPosts();