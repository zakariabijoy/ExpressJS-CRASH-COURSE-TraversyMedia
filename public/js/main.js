const output = document.getElementById("output");
const button = document.getElementById("get-posts-btn");
const addbutton = document.getElementById("add-post-btn");

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

// submit new post

async function submitPost(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const data = { title, content };
  try {
    const response = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    output.innerHTML = `
      <div class="card">
        <h2>${result.title}</h2>
        <p>${result.content}</p>
      </div>
    `;
    showPosts();
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", showPosts);
addbutton.addEventListener("click", submitPost);
