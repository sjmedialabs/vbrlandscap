const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}/api/seed`;

console.log(`Calling seed API at ${url}...`);

fetch(url, { method: "POST" })
  .then(async (res) => {
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);
    if (!res.ok) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("Seed request failed:", err.message);
    process.exit(1);
  });
