'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import ProgressBar from '../components/progressBar'
import CtaStrip from '../components/ctaStrip'
import RevealObserver from '../components/revealObserver'
import Ticker from '../components/ticker'
import styles from './services.module.css'

// Enhanced service data with basePrice for calculator
const serviceCategories = [
  {
    id: 'cat-exterior',
    category: 'exterior residential commercial',
    num: '01',
    title: <>Exterior &amp; <em>Roofing</em></>,
    cards: [
      {
        large: true,
        badge: 'Most Requested',
        img: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Roofing',
        desc: 'Full roof replacements, repairs, and maintenance for flat and pitched roofs.',
        bullets: ['Asphalt shingle systems', 'Flat roof membranes', 'Leak detection & repair', 'Gutter installation'],
        tags: ['Residential', 'Commercial'],
        num: '01',
        priceRange: '$5,000 - $25,000',
        duration: '1-3 days',
        warranty: '10-25 years',
        basePrice: 12000,
        icon: <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
      },
      {
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Siding',
        desc: 'Vinyl, fiber cement, and wood siding installation and replacement.',
        bullets: ['Vinyl siding', 'Fiber cement boards', 'Wood siding', 'Insulated siding'],
        tags: ['Residential', 'Exterior'],
        num: '02',
        priceRange: '$8,000 - $30,000',
        duration: '3-7 days',
        warranty: '25-50 years',
        basePrice: 15000,
        icon: <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
      },
    ],
  },
  {
    id: 'cat-masonry',
    category: 'masonry residential commercial',
    num: '02',
    title: <><em>Masonry</em> &amp; Brick</>,
    cards: [
      {
        img: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Brick Repointing',
        desc: 'Restore and protect aging brick with professional mortar repointing.',
        bullets: ['Remove old mortar', 'Color-matched mortar', 'Waterproof sealing'],
        tags: ['Masonry', 'Residential'],
        num: '03',
        priceRange: '$3,000 - $12,000',
        duration: '2-5 days',
        warranty: '5-10 years',
        basePrice: 6000,
        icon: <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
      },
      {
        img: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Pavers & Concrete',
        desc: 'Driveways, sidewalks, and patios built to last.',
        bullets: ['Interlocking pavers', 'Concrete slabs', 'NYC DOT compliant sidewalks', 'Violation repairs'],
        tags: ['Concrete', 'Commercial'],
        num: '04',
        priceRange: '$2,000 - $15,000',
        duration: '1-4 days',
        warranty: '5-15 years',
        basePrice: 8000,
        icon: <path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />,
      },
      {
        img: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Painting',
        desc: 'Interior and exterior painting for residential and commercial properties.',
        bullets: ['Interior painting', 'Exterior painting', 'Commercial painting'],
        tags: ['Interior', 'Exterior'],
        num: '05',
        priceRange: '$1,500 - $10,000',
        duration: '2-5 days',
        warranty: '3-7 years',
        basePrice: 4500,
        icon: <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
      },
    ],
  },
  {
    id: 'cat-specialty',
    category: 'specialty residential commercial',
    num: '03',
    title: <><em>Specialty</em> Services</>,
    cards: [
      {
        img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Waterproofing',
        desc: 'Basement and foundation waterproofing solutions.',
        bullets: ['Basement sealing', 'Foundation repair', 'Drainage systems'],
        tags: ['Specialty', 'Residential'],
        num: '06',
        priceRange: '$2,500 - $12,000',
        duration: '2-4 days',
        warranty: '10-20 years',
        basePrice: 7000,
        icon: <path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />,
      },
      {
        img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Powerwashing',
        desc: 'Professional exterior cleaning for all surfaces.',
        bullets: ['Building facades', 'Driveways', 'Decks & patios'],
        tags: ['Maintenance', 'Commercial'],
        num: '07',
        priceRange: '$300 - $2,000',
        duration: '1-2 days',
        warranty: 'N/A',
        basePrice: 800,
        icon: <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />,
      },
      {
        img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=900',
        title: 'Window Glass',
        desc: 'Complete window glass replacement and repair services.',
        bullets: ['Residential windows', 'Commercial storefronts', 'Emergency repairs'],
        tags: ['Specialty', 'Emergency'],
        num: '08',
        priceRange: '$200 - $3,000',
        duration: '1 day',
        warranty: '1-5 years',
        basePrice: 1500,
        icon: <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
      },
    ],
  },
]

const faqs = [
  { q: 'Do you offer free estimates for all services?', a: 'Yes — every estimate is completely free and comes with no obligation. We visit your property, assess the work needed, and provide a detailed written quote. Call 929-944-9040 or use our contact form to schedule yours.' },
  { q: 'Are you licensed and insured in New York?', a: "Absolutely. Ibaad Contracting Inc is fully licensed by the State of New York and carries comprehensive liability insurance and workers' compensation coverage. We're happy to provide proof of insurance upon request." },
  { q: 'What areas do you serve?', a: 'We serve all five boroughs of New York City — Manhattan, Brooklyn, Queens, The Bronx, and Staten Island — as well as surrounding metro areas including Long Island, Westchester, and parts of New Jersey.' },
  { q: 'How long does a typical roofing or siding project take?', a: 'Project timelines vary based on scope and size. A typical residential roof replacement takes 1–3 days. Siding projects usually take 3–7 days for a full house.' },
  { q: 'Can you handle NYC DOT sidewalk violations?', a: "Yes. We specialize in NYC DOT-compliant sidewalk repair and replacement. We'll handle everything from the repair work to ensuring it meets DOT standards." },
  { q: 'Do you do residential and commercial work?', a: 'Yes — we work on both residential properties (single-family homes, townhouses, co-ops, condos) and commercial properties (office buildings, retail, multi-unit residential).' },
  { q: 'What payment methods do you accept?', a: 'We accept cash, checks, all major credit cards, and offer flexible financing options for larger projects. We typically require a deposit to begin work, with the balance due upon completion.' },
  { q: 'Do you provide warranties on your work?', a: 'Yes. All our work comes with comprehensive warranties that vary by service — ranging from 1 year to 25 years. Material warranties from manufacturers are also included where applicable.' },
]

const processSteps = [
  { num: '01', title: 'Contact Us', desc: 'Call, email, or fill out our form to reach our team.', icon: <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /> },
  { num: '02', title: 'Site Visit', desc: 'We visit your property to assess the scope and conditions.', icon: <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /> },
  { num: '03', title: 'Free Estimate', desc: "You receive a detailed, itemized estimate — no hidden costs.", icon: <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192" /> },
  { num: '04', title: 'Work Begins', desc: 'Our skilled crew starts work on schedule with quality materials.', icon: <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877" /> },
  { num: '05', title: 'Final Walkthrough', desc: 'We walk through the completed work with you before signing off.', icon: <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
]

const filterOptions = ['all', 'exterior', 'masonry', 'specialty', 'commercial', 'residential']

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonServices, setComparisonServices] = useState<string[]>([])
  const [showCalculator, setShowCalculator] = useState(false)
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid')

  // Calculator State
  const [calcService, setCalcService] = useState('Roofing')
  const [calcProperty, setCalcProperty] = useState('Residential - Single Family')
  const [calcSize, setCalcSize] = useState(1500)
  const [calcUrgency, setCalcUrgency] = useState('Standard')

  const allServices = serviceCategories.flatMap(cat => cat.cards)

  const toggleComparison = (serviceTitle: string) => {
    setComparisonServices(prev => {
      if (prev.includes(serviceTitle)) return prev.filter(s => s !== serviceTitle)
      if (prev.length >= 3) return prev
      return [...prev, serviceTitle]
    })
  }

  // Dynamic Cost Calculator Logic
  const calculateEstimate = () => {
    const serviceData = allServices.find(s => s.title === calcService)
    const base = serviceData?.basePrice || 8000

    let multiplier = 1

    if (calcProperty.includes('Multi-Family')) multiplier = 1.65
    if (calcProperty.includes('Commercial')) multiplier = 2.3

    // Size factor
    multiplier += (calcSize - 1000) / 4000

    if (calcUrgency === 'Priority') multiplier += 0.4
    if (calcUrgency === 'Emergency') multiplier += 0.9

    const low = Math.round(base * multiplier * 0.8)
    const high = Math.round(base * multiplier * 1.4)

    return { low: Math.max(low, 500), high }
  }

  const estimate = calculateEstimate()

  return (
    <>
      <ProgressBar />
      <Navbar />
      <RevealObserver />

      {/* Hero Section */}
      <section className={styles['services-hero']}>
        <div className={styles['services-hero-bg']} />
        <div className={styles['services-hero-grid']} />
        <div className={styles['services-hero-in']}>
          <div className={styles['eyebrow']} style={{ marginBottom: 16 }}>What We Do</div>
          <h1 className={styles['services-hero-h']}>
            Complete Home<br />
            <em>Services.</em>
          </h1>
          <p className={styles['services-hero-desc']}>
            From a single brick repoint to a full roof replacement, we handle every aspect 
            of your property with craftsmanship, quality materials, and honest pricing.
          </p>
          <div className={styles['services-hero-stats']}>
            <div className={styles['shs-item']}>
              <div className={styles['shs-val']}>12<span>+</span></div>
              <div className={styles['shs-lbl']}>Services</div>
            </div>
            <div className={styles['shs-item']}>
              <div className={styles['shs-val']}>NYC</div>
              <div className={styles['shs-lbl']}>Based</div>
            </div>
            <div className={styles['shs-item']}>
              <div className={styles['shs-val']}>$0</div>
              <div className={styles['shs-lbl']}>Estimates</div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* Enhanced Filter Bar */}
      <div className={styles['filter-bar-enhanced']}>
        <div className={styles['filter-in']}>
          <div className={styles['filter-left']}>
            <span className={styles['filter-lbl']}>Filter:</span>
            {filterOptions.map(f => (
              <button
                key={f}
                className={`${styles['filter-btn']} ${activeFilter === f ? styles.active : ''}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f === 'all' ? 'All Services' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles['filter-right']}>
            <button 
              className={styles['tool-btn']}
              onClick={() => setShowComparison(!showComparison)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Compare ({comparisonServices.length}/3)
            </button>

            <button 
              className={styles['tool-btn']}
              onClick={() => setShowCalculator(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
              Calculator
            </button>

            <div className={styles['view-toggle']}>
              <button 
                className={activeView === 'grid' ? styles.active : ''}
                onClick={() => setActiveView('grid')}
                aria-label="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
              <button 
                className={activeView === 'list' ? styles.active : ''}
                onClick={() => setActiveView('list')}
                aria-label="List view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Panel */}
      {showComparison && comparisonServices.length > 0 && (
        <div className={styles['comparison-panel']}>
          <div className={styles['comparison-in']}>
            <div className={styles['comparison-hdr']}>
              <h3>Service Comparison</h3>
              <button onClick={() => setShowComparison(false)}>×</button>
            </div>
            <div className={styles['comparison-grid']}>
              {comparisonServices.map(serviceTitle => {
                const service = allServices.find(s => s.title === serviceTitle)
                if (!service) return null
                return (
                  <div key={serviceTitle} className={styles['comparison-card']}>
                    <div className={styles['comparison-card-img']} style={{ backgroundImage: `url('${service.img}')` }} />
                    <h4>{service.title}</h4>
                    <div className={styles['comparison-row']}>
                      <span className={styles['comp-lbl']}>Price Range</span>
                      <span className={styles['comp-val']}>{service.priceRange}</span>
                    </div>
                    <div className={styles['comparison-row']}>
                      <span className={styles['comp-lbl']}>Duration</span>
                      <span className={styles['comp-val']}>{service.duration}</span>
                    </div>
                    <div className={styles['comparison-row']}>
                      <span className={styles['comp-lbl']}>Warranty</span>
                      <span className={styles['comp-val']}>{service.warranty}</span>
                    </div>
                    <button 
                      className={styles['remove-comparison']}
                      onClick={() => toggleComparison(serviceTitle)}
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Cost Calculator */}
      {showCalculator && (
        <div className={styles['calculator-modal']} onClick={() => setShowCalculator(false)}>
          <div className={styles['calculator-panel']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['calculator-hdr']}>
              <h3>Quick Cost Estimator</h3>
              <button onClick={() => setShowCalculator(false)}>×</button>
            </div>
            <div className={styles['calculator-body']}>
              <div className={styles['calc-field']}>
                <label>Service Type</label>
                <select value={calcService} onChange={(e) => setCalcService(e.target.value)}>
                  {allServices.map(s => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className={styles['calc-field']}>
                <label>Property Type</label>
                <select value={calcProperty} onChange={(e) => setCalcProperty(e.target.value)}>
                  <option>Residential - Single Family</option>
                  <option>Residential - Multi-Family</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className={styles['calc-field']}>
                <label>Project Size (sq ft)</label>
                <input 
                  type="number" 
                  value={calcSize} 
                  onChange={(e) => setCalcSize(Math.max(100, parseInt(e.target.value) || 100))}
                />
              </div>

              <div className={styles['calc-field']}>
                <label>Urgency</label>
                <select value={calcUrgency} onChange={(e) => setCalcUrgency(e.target.value)}>
                  <option>Standard (1-2 weeks)</option>
                  <option>Priority (3-7 days)</option>
                  <option>Emergency (24-48 hours)</option>
                </select>
              </div>

              <div className={styles['calc-result']}>
                <div className={styles['calc-result-lbl']}>Estimated Range</div>
                <div className={styles['calc-result-val']}>
                  ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
                </div>
                <div className={styles['calc-result-note']}>
                  *This is a rough estimate. Contact us for an accurate, detailed quote.
                </div>
              </div>

              <Link href="/contact" className={styles['btn']} style={{ width: '100%', justifyContent: 'center' }}>
                Request Official Estimate
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Service Categories */}
      <section className={styles['svc-section']}>
        <div className={styles['svc-in']}>
          {serviceCategories.map(cat => {
            const hidden = activeFilter !== 'all' && !cat.category.includes(activeFilter)
            return (
              <div
                key={cat.id}
                id={cat.id}
                className={`${styles['svc-category']} ${hidden ? styles['hidden'] : styles['visible']}`}
              >
                <div className={styles['cat-hdr']}>
                  <span className={styles['cat-num']}>{cat.num}</span>
                  <h2 className={styles['cat-title']}>{cat.title}</h2>
                  <div className={styles['cat-line']} />
                </div>

                <div className={`${styles['svc-grid']} ${cat.cards.some(c => c.large) ? styles['featured'] : ''} ${styles[`view-${activeView}`]}`}>
                  {cat.cards.map((card, i) => (
                    <div key={i} className={`${styles['svc-card']} ${card.large ? styles['large'] : ''}`}>
                      {card.img && (
                        <div className={styles['svc-photo-wrap']}>
                          <div className={styles['svc-photo']} style={{ backgroundImage: `url('${card.img}')` }} />
                          <div className={styles['svc-card-overlay']} />
                          {card.badge && <div className={styles['svc-badge']}>{card.badge}</div>}
                          <button 
                            className={`compare-checkbox ${comparisonServices.includes(card.title) ? 'active' : ''}`}
                            onClick={() => toggleComparison(card.title)}
                            disabled={!comparisonServices.includes(card.title) && comparisonServices.length >= 3}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className={styles['svc-body']}>
                        <div className={styles['svc-icon-row']}>
                          <div className={styles['svc-ico']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              {card.icon}
                            </svg>
                          </div>
                          <span className={styles['svc-no-label']}>{card.num}</span>
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>

                        <div className={styles['svc-details']}>
                          <div className={styles['svc-detail-item']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{card.priceRange}</span>
                          </div>
                          <div className={styles['svc-detail-item']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{card.duration}</span>
                          </div>
                          <div className={styles['svc-detail-item']}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            <span>{card.warranty}</span>
                          </div>
                        </div>

                        <div className={styles['svc-bullets']}>
                          {card.bullets.map((b, j) => (
                            <div className={styles['svc-bullet']} key={j}>{b}</div>
                          ))}
                        </div>
                        <div className={styles['svc-tags']}>
                          {card.tags.map((t, j) => <span className={styles['svc-tag']} key={j}>{t}</span>)}
                        </div>
                        <div className={styles['svc-cta-row']}>
                          <Link href="/contact" className={styles['svc-cta-link']}>Get Estimate →</Link>
                          <span className={styles['svc-avail']}><span>●</span> Available Now</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className={styles['proc-strip']}>
        <div className={styles['proc-strip-in']}>
          <div className={[styles['proc-strip-hdr'], 'reveal'].join(' ')} data-reveal="true">
            <div className={styles['eyebrow']}>How It Works</div>
            <h2>Our Simple <em>Process</em></h2>
          </div>
          <div className={styles['proc-steps']}>
            {processSteps.map((s, i) => (
          <div
  className={styles['proc-step-item']}
  data-reveal="true"
  key={i}
>
                <div className={styles['proc-node-wrap']}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{s.icon}</svg>
                </div>
                <div className={styles['proc-sn']}>{s.num}</div>
                <div className={styles['proc-st']}>{s.title}</div>
                <div className={styles['proc-sd']}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* FAQ Section */}
{/* FAQ Section - FIXED */}
<section className={styles['faq-section']}>
  <div className={styles['faq-in']}>
    <div className={styles['faq-hdr']} data-reveal="true">
      <div className={styles['eyebrow']}>Common Questions</div>
      <h2>Services <em>FAQ</em></h2>
    </div>
    <div className={styles['faq-list']}>
      {faqs.map((faq, i) => (
        <div 
          key={i}
          className={`${styles['faq-item']} ${openFaq === i ? styles['open'] : ''}`}
        >
          <div 
            className={styles['faq-q']} 
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <span className={styles['faq-q-text']}>{faq.q}</span>
            <div className={styles['faq-icon']}>+</div>
          </div>
          <div className={styles['faq-a']}>{faq.a}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      <CtaStrip
        eyebrow="Free Estimates"
        heading={<>Ready to Get<br /><em>Started?</em></>}
        subtext="Call or email us today. We'll come to your property, assess the work, and provide a detailed free estimate — no pressure, no obligation."
        primaryLabel="Call 929-944-9040"
        primaryHref="tel:9299449040"
        secondaryLabel="Request Estimate Online"
        secondaryHref="/contact"
      />

      <Footer />
    </>
  )
}