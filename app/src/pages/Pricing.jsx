import React, {useEffect, useState} from 'react'
import { getPricing } from '../apiClient'

export default function Pricing(){
  const [pricing, setPricing] = useState([])
  useEffect(()=>{ getPricing().then(p=>setPricing(p)) },[])
  return (
    <div>
      <h2>Pricing</h2>
      <table className='pricing'>
        <thead><tr><th>Service</th><th>Price Range</th></tr></thead>
        <tbody>
          {pricing.map((r,i)=>(<tr key={i}><td>{r.service}</td><td>{r.range}</td></tr>))}
        </tbody>
      </table>
    </div>
  )
}
