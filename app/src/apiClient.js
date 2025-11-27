export async function getPricing(){
  const res = await fetch('/api/pricing')
  return res.json()
}

export async function submitOrder(formData){
  // formData should be a FormData instance including files
  const res = await fetch('/api/order', { method: 'POST', body: formData })
  return res.json()
}
