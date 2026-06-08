'use client'

import { useState, useCallback, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import ProgressBar from '../components/progressBar'
import CtaStrip from '../components/ctaStrip'
import RevealObserver from '../components/revealObserver'
import styles from './gallery.module.css'

const galleryItems = [
  {
    src: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    label: 'Roof Replacement',
    category: 'roofing',
    description: 'Complete residential roof replacement with premium shingles'
  },
  {
    src: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
    label: 'Brick Work',
    category: 'masonry',
    description: 'Custom brickwork and masonry restoration'
  },
  {
    src: 'https://images.pexels.com/photos/2455119/pexels-photo-2455119.jpeg',
    label: 'Paver Installation',
    category: 'concrete',
    description: 'Professional paver installation for driveways and patios'
  },
  {
    src: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg',
    label: 'Interior Painting',
    category: 'painting',
    description: 'High-quality interior and exterior painting services'
  },
  {
    src: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    label: 'Siding Work',
    category: 'roofing',
    description: 'Durable siding installation and repair'
  },
  {
    src: 'https://images.pexels.com/photos/11540554/pexels-photo-11540554.jpeg',
    label: 'Concrete Work',
    category: 'concrete',
    description: 'Concrete foundation and sidewalk work'
  },
  {
    src: 'https://images.pexels.com/photos/8853521/pexels-photo-8853521.jpeg',
    label: 'Roofing Inspection',
    category: 'roofing',
    description: 'Comprehensive roof inspection and assessment'
  },
  {
    src: 'https://images.pexels.com/photos/36146010/pexels-photo-36146010.jpeg',
    label: 'Stone Facade',
    category: 'masonry',
    description: 'Premium stone facade installation and finishing'
  },
  {
    src: 'https://images.pexels.com/photos/19367458/pexels-photo-19367458.jpeg',
    label: 'Outdoor Patio',
    category: 'concrete',
    description: 'Custom concrete patio construction'
  },
  {
    src: 'https://images.pexels.com/photos/17014386/pexels-photo-17014386.jpeg',
    label: 'Exterior Paint',
    category: 'painting',
    description: 'Weather-resistant exterior painting'
  },
  {
    src: 'https://images.pexels.com/photos/5691521/pexels-photo-5691521.jpeg',
    label: 'Window Installation',
    category: 'roofing',
    description: 'Professional window replacement services'
  },
  {
    src: 'https://images.pexels.com/photos/12547818/pexels-photo-12547818.jpeg',
    label: 'Retaining Wall',
    category: 'masonry',
    description: 'Structural retaining wall construction'
  },
]

const filters = ['all', 'roofing', 'masonry', 'concrete', 'painting']

export default function GalleryPage() {
  const [active, setActive] = useState('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const visible = galleryItems.filter(
    item => active === 'all' || item.category === active
  )

  // Handle filter change
  const handleFilterChange = useCallback((filter: string) => {
    setActive(filter)
    setSelectedIndex(null)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 100)
  }, [])

  // Lightbox navigation
  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(prev =>
        prev === 0 ? visible.length - 1 : (prev ?? 0) - 1
      )
    }
  }, [selectedIndex, visible.length])

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(prev =>
        prev === visible.length - 1 ? 0 : ((prev ?? 0) + 1)
      )
    }
  }, [selectedIndex, visible.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case 'ArrowLeft':
          handlePrev()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          setSelectedIndex(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, handlePrev, handleNext])

  const currentItem = selectedIndex !== null ? visible[selectedIndex] : null

  return (
    <>
      <ProgressBar />
      <Navbar />
      <RevealObserver />

      {/* HERO SECTION - Similar to Contact Page */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroIn}>
          {/* Left Side - Title */}
          <div>
            <div className={styles.phKicker}>
              <div className={styles.phKickerLine}></div>
              <span className={styles.eyebrow}>Our Work</span>
            </div>
            <h1 className={styles.heroTitle}>
              Project<br />
              <em>Gallery.</em>
            </h1>
          </div>

          {/* Right Side - Description & Stats */}
          <div className={styles.phRight}>
            <p>
              Explore our portfolio of completed projects across roofing, masonry, concrete, and
              exterior work throughout New York City. Each project reflects our commitment to
              quality craftsmanship and customer satisfaction.
            </p>

            <div className={styles.phStats}>
              <div>
                <div className={styles.phStatN}>100+</div>
                <div className={styles.phStatL}>Projects</div>
              </div>
              <div>
                <div className={styles.phStatN}>5★</div>
                <div className={styles.phStatL}>Rating</div>
              </div>
              <div>
                <div className={styles.phStatN}>NYC</div>
                <div className={styles.phStatL}>Serving</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.filterIn}>
          <span className={styles.filterLbl}>Filter by:</span>
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn}${active === f ? ` ${styles.active}` : ''}`}
              onClick={() => handleFilterChange(f)}
              aria-pressed={active === f}
            >
              {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* GALLERY GRID */}
      <section className={styles.svcSection}>
        <div className={styles.svcIn}>
          {visible.length > 0 ? (
            <div className={styles.galleryGrid}>
              {visible.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.galleryItem}${isLoading ? ` ${styles.loading}` : ''}`}
                  onClick={() => setSelectedIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedIndex(i)
                    }
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <div className={styles.galleryOverlay}>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              <div className={styles.emptyState}>
                <h3>No projects found</h3>
                <p>Try adjusting your filter to see more of our work</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedIndex !== null && currentItem && (
        <div className={styles.modal} onClick={() => setSelectedIndex(null)}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.src}
              alt={currentItem.label}
              className={styles.modalImage}
            />

            {/* Close Button */}
            <button
              className={styles.modalClose}
              onClick={() => setSelectedIndex(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            <button
              className={`${styles.modalNav} ${styles.modalPrev}`}
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className={`${styles.modalNav} ${styles.modalNext}`}
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>

            {/* Image Info */}
            <div className={styles.modalInfo}>
              <div>
                <div className={styles.modalLabel}>{currentItem.label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(200,220,245,0.7)', marginTop: '4px' }}>
                  {currentItem.description}
                </div>
              </div>
              <div className={styles.modalCounter}>
                {selectedIndex + 1} / {visible.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA STRIP */}
      <CtaStrip
        eyebrow="Your Project Next?"
        heading={<>Let&apos;s Build<br /><em>Something Great</em></>}
        subtext="Contact us today to start your project with a free estimate."
      />

      <Footer />
    </>
  )
}