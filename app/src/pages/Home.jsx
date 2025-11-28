import React from 'react'
import OrderForm from '../components/OrderForm'

export default function Home(){
  return (
    <div>
      <div className='hero'>
        <h1>Get Expert Academic Help</h1>
        <p>Professional assignment assistance, research support, and project guidance for students and working professionals across India</p>
        
        <div className='hero-stats'>
          <div className='stat-item'>
            <span className='stat-number'>5000+</span>
            <span className='stat-label'>Projects Completed</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>98%</span>
            <span className='stat-label'>Client Satisfaction</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>24/7</span>
            <span className='stat-label'>Support Available</span>
          </div>
        </div>
      </div>

      <div className='card'>
        <h2>📝 Place Your Order</h2>
        <p style={{color: '#718096', marginBottom: '24px'}}>Fill out the form below and our experts will get back to you within 2 hours</p>
        <OrderForm/>
      </div>

      <div className='card' style={{background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', border: '2px solid rgba(102, 126, 234, 0.2)'}}>
        <h2>✨ Why Choose Us?</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '20px'}}>
          <div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>🎓 Expert Team</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>PhD scholars and industry professionals</p>
          </div>
          <div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>⚡ Fast Delivery</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Quick turnaround on all projects</p>
          </div>
          <div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>💯 Original Work</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Plagiarism-free guaranteed content</p>
          </div>
          <div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>🔒 Confidential</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Your privacy is our priority</p>
          </div>
        </div>
      </div>
    </div>
  )
}
