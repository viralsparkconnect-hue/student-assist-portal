import React from 'react'

export default function Services(){
  const services = [
    {
      icon: '📚',
      title: 'Assignment Help',
      description: 'Complete assignment solutions for 12th, UG, PG students across all subjects and courses'
    },
    {
      icon: '⚙️',
      title: 'Engineering Projects',
      description: 'Technical project reports, implementation, and documentation for all engineering branches'
    },
    {
      icon: '🎓',
      title: 'PhD Research',
      description: 'Synopsis writing, literature review, data analysis, and complete thesis support'
    },
    {
      icon: '💻',
      title: 'Coding Projects',
      description: 'Full-stack development, mobile apps, data structures, algorithms, and technical implementations'
    },
    {
      icon: '📊',
      title: 'MBA Projects',
      description: 'Case studies, market analysis, business plans, and strategic management reports'
    },
    {
      icon: '📄',
      title: 'PPT & Formatting',
      description: 'Professional presentations, document formatting, and academic writing polish'
    },
    {
      icon: '🔬',
      title: 'Lab Reports',
      description: 'Detailed experimental analysis, observations, and scientific documentation'
    },
    {
      icon: '📖',
      title: 'Research Papers',
      description: 'Journal-ready research papers, conference papers, and publication support'
    }
  ]

  return (
    <div>
      <div className='hero' style={{marginBottom: '32px'}}>
        <h1>Our Services</h1>
        <p>Comprehensive academic support tailored to your needs</p>
      </div>

      <div className='card'>
        <h2>What We Offer</h2>
        <div className='services-grid'>
          {services.map((service, index) => (
            <div key={index} className='service-card'>
              <div className='service-icon'>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='card' style={{marginTop: '24px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'}}>
        <h2>📋 Our Process</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', marginBottom: '12px'}}>1️⃣</div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>Submit</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Share your requirements</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', marginBottom: '12px'}}>2️⃣</div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>Quote</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Get instant pricing</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', marginBottom: '12px'}}>3️⃣</div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>Work</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Experts start working</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', marginBottom: '12px'}}>4️⃣</div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#2d3748'}}>Deliver</h3>
            <p style={{color: '#718096', fontSize: '14px'}}>Receive quality work</p>
          </div>
        </div>
      </div>
    </div>
  )
}
