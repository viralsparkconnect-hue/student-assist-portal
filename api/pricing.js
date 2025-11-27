// Simple demo pricing endpoint
module.exports = (req, res) => {
  const pricing = [
    { service: "12th / Diploma Assignments", range: "₹199 – ₹499" },
    { service: "Engineering Assignments", range: "₹499 – ₹1499" },
    { service: "MBA Assignments", range: "₹599 – ₹1499" },
    { service: "PhD Synopsis", range: "₹1499 – ₹3499" },
    { service: "Coding Projects", range: "₹299 – ₹9999" }
  ]
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(pricing))
}
