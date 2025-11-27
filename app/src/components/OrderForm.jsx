import React, {useState} from 'react'
import { submitOrder } from '../apiClient'

export default function OrderForm(){
  const [form, setForm] = useState({name:'', email:'', course:'', subject:'', deadline:'', whatsapp:'', description:''})
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  function onChange(e){
    setForm(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  async function onSubmit(e){
    e.preventDefault()
    setStatus('Submitting...')

    const fd = new FormData()
    for(const k in form) fd.append(k, form[k])
    if(file) fd.append('file', file)
    // simple client-side validation
    if(!form.name || !form.email || !form.subject){ setStatus('Please fill required fields'); return }
    const res = await submitOrder(fd)
    if(res && res.ok){
      setStatus('Order received: ' + res.orderId)
    } else {
      setStatus('Error: ' + (res.error || 'unknown'))
    }
  }

  return (
    <form onSubmit={onSubmit} className='order-form'>
      <input name='name' placeholder='Full name' value={form.name} onChange={onChange} required/>
      <input name='email' placeholder='Email' value={form.email} onChange={onChange} required/>
      <input name='course' placeholder='Course (e.g. B.Tech)' value={form.course} onChange={onChange}/>
      <input name='subject' placeholder='Subject' value={form.subject} onChange={onChange} required/>
      <input name='deadline' type='date' value={form.deadline} onChange={onChange}/>
      <input name='whatsapp' placeholder='WhatsApp number' value={form.whatsapp} onChange={onChange}/>
      <textarea name='description' placeholder='Brief description' value={form.description} onChange={onChange}></textarea>
      <label>Attach file (pdf/images): <input type='file' accept='.pdf,image/*' onChange={e=>setFile(e.target.files[0])}/></label>
      <button type='submit'>Submit Order</button>
      <div className='status'>{status}</div>
    </form>
  )
}
