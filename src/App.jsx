import { useState } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <main className="bg-[#050505] min-h-screen text-white relative cursor-none selection:bg-red-600 selection:text-white">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Cursor />
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
