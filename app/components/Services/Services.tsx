'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './services.module.css'
import {
  Home,
  Paintbrush,
  Wrench,
  Droplets,
  Building2,
  Hammer,
  SprayCan,
  Layers,
  Wind,
  Square,
  Shield,
  SquareArrowDown,
  
} from 'lucide-react'

const services = [
  {
    id: '01',
    title: 'Roofing',
    desc: 'Full roof installations, repairs, and replacements using high-quality materials. Flat and pitched roofs.',
    tags: ['Residential', 'Commercial'],
    icon: Home,
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  },
  {
    id: '02',
    title: 'Siding',
    desc: 'Professional siding installation and repair with premium finishes. Vinyl, fiber cement, and wood siding.',
    tags: ['Residential', 'Commercial', 'Exterior'],
    icon: Building2,
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  },
  {
    id: '03',
    title: 'Pavers',
    desc: 'Beautiful driveways, patios, and walkways for modern homes. Interlocking pavers and brick pavers.',
    tags: ['Residential', 'Driveways'],
    icon: Layers,
    image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
  },
  {
    id: '04',
    title: 'Painting',
    desc: 'Interior and exterior painting services with attention to detail. Residential and commercial.',
    tags: ['Residential', 'Commercial', 'Painting'],
    icon: Paintbrush,
    image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg',
  },
  {
    id: '05',
    title: 'Masonry',
    desc: 'Expert masonry work including brick, stone, and block construction.',
    tags: ['Residential', 'Commercial', 'Masonry'],
    icon: Hammer,
    image: 'https://images.pexels.com/photos/207142/pexels-photo-207142.jpeg',
  },
  {
    id: '06',
    title: 'Sidewalk',
    desc: 'NYC DOT compliant sidewalk installation, repair, and violation removal.',
    tags: ['Concrete', 'Commercial', 'NYC'],
    icon: Square,
    image: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
  },
  {
    id: '07',
    title: 'Powerwashing',
    desc: 'High-pressure cleaning services for all exterior surfaces. Building facades, driveways, and more.',
    tags: ['Exterior', 'Maintenance'],
    icon: SprayCan,
    image: 'https://images.pexels.com/photos/4488194/pexels-photo-4488194.jpeg',
  },
  {
    id: '08',
    title: 'Waterproofing',
    desc: 'Basement, foundation, and exterior waterproofing solutions.',
    tags: ['Residential', 'Commercial', 'Specialty'],
    icon: Droplets,
    image: 'https://images.pexels.com/photos/2850347/pexels-photo-2850347.jpeg',
  },
  {
    id: '09',
    title: 'Brick Repointing',
    desc: 'Restore and protect aging brick with professional mortar repointing.',
    tags: ['Masonry', 'Residential', 'Commercial'],
    icon: Wrench,
    image: 'https://images.pexels.com/photos/207142/pexels-photo-207142.jpeg',
  },
  {
    id: '10',
    title: 'Brick Replacement',
    desc: 'Full brick replacement for damaged or deteriorated masonry.',
    tags: ['Masonry', 'Residential', 'Commercial'],
    icon: Hammer,
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
  },
  {
    id: '11',
    title: 'Concrete Replacement',
    desc: 'Full concrete slab replacement for driveways, walkways, and foundations.',
    tags: ['Concrete', 'Residential', 'Commercial'],
    icon: Square,
    image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
  },
  {
    id: '12',
    title: 'Window Square Replacement',
    desc: 'Complete window Square replacement and repair services for all property types.',
    tags: ['Residential', 'Commercial', 'Emergency'],
    icon: SquareArrowDown,
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
  },
]

// Extract all unique tags
const allTags = Array.from(new Set(services.flatMap((svc) => svc.tags))).sort()
const filterOptions = ['All Services', ...allTags]

interface ServicesProps {
  activeFilter?: string
}

export default function Services({ activeFilter: heroFilter }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState('All Services')

  // sync with hero filter if provided
  useEffect(() => {
    if (heroFilter && heroFilter !== 'All Services') {
      // Map hero filter to service tag
      let mappedFilter = heroFilter
      if (heroFilter === 'exterior') mappedFilter = 'Exterior'
      if (heroFilter === 'masonry') mappedFilter = 'Masonry'
      if (heroFilter === 'concrete') mappedFilter = 'Concrete'
      if (heroFilter === 'specialty') mappedFilter = 'Specialty'
      if (heroFilter === 'commercial') mappedFilter = 'Commercial'
      if (heroFilter === 'residential') mappedFilter = 'Residential'
      
      if (allTags.includes(mappedFilter)) {
        setActiveFilter(mappedFilter)
      }
    }
  }, [heroFilter])

  const filteredServices = useMemo(() => {
    if (activeFilter === 'All Services') {
      return services
    }
    return services.filter((svc) => svc.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="services-section" className={styles.services} aria-label="Our Services">
      <div className={styles.svcIn}>
        {/* TOP SECTION */}
        <div className={styles.svcTop}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What We Do
            </div>
            <h2>
              Complete Home <br />
              Improvement <br />
              <em>Services</em>
            </h2>
          </div>
          <p>
            From your roof to your sidewalk, we handle everything with quality craftsmanship 
            and professional expertise. With over 15 years of experience, we deliver exceptional 
            results on every project — residential and commercial.
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className={styles.filterSection} aria-label="Service filters">
          <div className={styles.filterLabel}>Filter:</div>
          <div className={styles.filterButtons} role="group">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`${styles.filterBtn} ${
                  activeFilter === option ? styles.filterBtnActive : ''
                }`}
                onClick={() => setActiveFilter(option)}
                aria-pressed={activeFilter === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className={styles.svcGrid} role="list">
          {filteredServices.map((svc) => {
            const Icon = svc.icon
            return (
              <article
                key={svc.id}
                className={styles.svcCard}
                style={
                  {
                    '--bg-image': `url(${svc.image})`,
                  } as React.CSSProperties
                }
                role="listitem"
                tabIndex={0}
              >
                {/* SERVICE NUMBER */}
                <div className={styles.svcNo} aria-hidden="true">
                  {svc.id}
                </div>

                {/* SERVICE ICON */}
                <div className={styles.svcIco} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* SERVICE TITLE */}
                <h3>{svc.title}</h3>

                {/* SERVICE DESCRIPTION */}
                <p>{svc.desc}</p>

                {/* SERVICE TAGS */}
                <div className={styles.svcTags} aria-label={`Categories: ${svc.tags.join(', ')}`}>
                  {svc.tags.map((tag) => (
                    <span key={tag} className={styles.svcTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BACKGROUND NUMBER */}
                <div className={styles.svcBg} aria-hidden="true">
                  {svc.id}
                </div>
              </article>
            )
          })}
        </div>

        {/* NO RESULTS MESSAGE */}
        {filteredServices.length === 0 && (
          <div className={styles.noResults}>
            <p>No services found for "{activeFilter}". Try another category.</p>
          </div>
        )}
      </div>
    </section>
  )
}