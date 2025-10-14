import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import {type EmblaOptionsType} from 'embla-carousel'

// import './base.css'
// import './sandbox.css'
import './embla.css'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  duration: 30,
  active: true
}
const SLIDE_COUNT = 50
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Carousel() {
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}
// const App: React.FC = () => (
//   <>
//     <Header />
//     <EmblaCarousel slides={SLIDES} options={OPTIONS} />
//     <Footer />
//   </>
// )

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
