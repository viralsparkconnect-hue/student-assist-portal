// POST /api/upload
// Accepts file uploads and returns stored path. Demo only — in production use S3/GCS.
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' })
  const form = new formidable.IncomingForm({ multiples: false, maxFileSize: 15 * 1024 * 1024 })
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send({ error: err.message })
    if (!files.file) return res.status(400).send({ error: 'No file provided' })

    const f = files.file
    // Validate file type (simple)
    const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    if (!allowed.includes(f.mimetype)) return res.status(400).send({ error: 'Invalid file type' })

    const uplDir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uplDir)) fs.mkdirSync(uplDir)
    const dest = path.join(uplDir, Date.now() + '_' + (f.originalFilename || 'file'))
    try {
      fs.renameSync(f.filepath, dest)
      res.status(200).send({ ok: true, path: dest })
    } catch(e){
      res.status(200).send({ ok: true, path: null, note: 'Saved path unavailable (serverless). Use external storage in production.' })
    }
  })
}
