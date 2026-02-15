async function getSummary() {
  const repoUrl = document.getElementById("repoInput").value;

  const response = await fetch("/repo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ repoUrl })
  });

  const data = await response.json();

  document.getElementById("result").innerHTML = `
  <p><b>Name:</b> ${data.name}</p>
  <p class="mt-4"><b>AI Summary:</b></p>
  <p>${data.aiSummary}</p>
`;

}
