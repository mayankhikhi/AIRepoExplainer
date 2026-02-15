async function getSummary() {
  const repoUrl = document.getElementById("repoInput").value;
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  loading.classList.remove("hidden");
  result.innerHTML = "";

  const response = await fetch("/repo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ repoUrl })
  });

  const data = await response.json();

  loading.classList.add("hidden");

  result.innerHTML = `
    <p><b>Name:</b> ${data.name}</p>
    <p class="mt-4"><b>AI Summary:</b></p>
    <p>${data.aiSummary}</p>
  `;
}


