// POST /api/order
// Accepts multipart/form-data (simple demo). Stores order metadata into data/orders.json
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' })

  const form = new formidable.IncomingForm({ multiples: false, maxFileSize: 10 * 1024 * 1024 }) // 10MB limit
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send({ error: 'Error parsing form: ' + err.message })
    // Basic validation
    if (!fields.name || !fields.email || !fields.subject) {
      return res.status(400).send({ error: 'Missing required fields (name, email, subject)' })
    }

    // Save file if provided (demo - serverless fs is ephemeral)
    let filename = null
    if (files.file) {
      const uplDir = path.join(process.cwd(), 'uploads')
      if (!fs.existsSync(uplDir)) fs.mkdirSync(uplDir)
      const f = files.file
      const dest = path.join(uplDir, Date.now() + '_' + (f.originalFilename || 'upload'))
      try {
        fs.renameSync(f.filepath, dest)
        filename = dest
      } catch(e){
        // In serverless environments, filesystem may be read-only or ephemeral.
        filename = null
      }
    }

    // Save order metadata to data/orders.json (demo only)
    const dataPath = path.join(process.cwd(), 'data', 'orders.json')
    let orders = []
    try {
      orders = JSON.parse(fs.readFileSync(dataPath, 'utf8') || '[]')
    } catch(e){ orders = [] }

    const order = {
      id: 'ord_' + Date.now(),
      name: fields.name,
      email: fields.email,
      subject: fields.subject,
      course: fields.course || '',
      deadline: fields.deadline || '',
      whatsapp: fields.whatsapp || '',
      description: fields.description || '',
      file: filename,
      createdAt: new Date().toISOString()
    }
    orders.push(order)
    try {
      fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2))
    } catch(e){ /* in serverless this might fail; production: use DB */ }

    res.status(200).send({ ok: true, orderId: order.id })
  })
}
