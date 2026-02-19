// Call the seed API endpoint to populate Firestore
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

async function runSeed() {
  console.log(`Calling seed API at ${BASE_URL}/api/seed ...`)
  try {
    const res = await fetch(`${BASE_URL}/api/seed`, { method: 'POST' })
    const data = await res.json()
    console.log('Response status:', res.status)
    console.log('Response body:', JSON.stringify(data, null, 2))
    if (!res.ok) {
      process.exit(1)
    }
  } catch (err) {
    console.error('Failed to call seed API:', err.message)
    process.exit(1)
  }
}

runSeed()
