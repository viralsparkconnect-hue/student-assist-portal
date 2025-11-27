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
          <button onClick={()=>setRoute('home')}>Home</button>
          <button onClick={()=>setRoute('services')}>Services</button>
          <button onClick={()=>setRoute('pricing')}>Pricing</button>
          <button onClick={()=>setRoute('contact')}>Contact</button>
        </nav>
      </header>
      <main className='container'>
        {route==='home' && <Home/>}
        {route==='services' && <Services/>}
        {route==='pricing' && <Pricing/>}
        {route==='contact' && <Contact/>}
      </main>
      <footer className='footer'>© AcademicSupport Demo</footer>
    </div>
  )
}
