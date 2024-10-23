const output = document.getElementById("output");
const button = document.getElementById("get-posts-btn");

async function showPosts() {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    const data = await response.json();
    console.log(data);
    output.innerHTML = data
      .map((post) => {
        return `
        <div class="card">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        </div>
      `;
      })
      .join("");
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", showPosts);
