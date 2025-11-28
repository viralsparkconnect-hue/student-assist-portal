import React from 'react'
import Home from './pages/Home'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'

export default function App(){
  const [route, setRoute] = React.useState('home')
  
  return (
    <div className='app'>
      <header className='topbar'>
        <div className='logo'>AcademicSupport</div>
        <nav>
          <button 
            onClick={() => setRoute('home')} 
            className={route === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button 
            onClick={() => setRoute('services')} 
            className={route === 'services' ? 'active' : ''}
          >
            Services
          </button>
          <button 
            onClick={() => setRoute('pricing')} 
            className={route === 'pricing' ? 'active' : ''}
          >
            Pricing
          </button>
          <button 
            onClick={() => setRoute('contact')} 
            className={route === 'contact' ? 'active' : ''}
          >
            Contact
          </button>
        </nav>
      </header>
      <main className='container'>
        {route === 'home' && <Home/>}
        {route === 'services' && <Services/>}
        {route === 'pricing' && <Pricing/>}
        {route === 'contact' && <Contact/>}
      </main>
      <footer className='footer'>
        © 2024 AcademicSupport Demo | Professional Academic Assistance
      </footer>
    </div>
  )
}
