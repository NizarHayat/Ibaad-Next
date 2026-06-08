'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import ProgressBar from '../components/progressBar'
import CtaStrip from '../components/ctaStrip'
import RevealObserver from '../components/revealObserver'
import style from './projects.module.css'

const projects = [
  {
    id: 1,
    category: 'roofing',
    tag: 'Roofing',
    title: 'Full Roof Replacement',
    location: 'Brooklyn',
    duration: '2 Days',
    img: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    desc: 'Complete tear-off and installation of a new asphalt shingle roofing system with improved insulation and weather protection.',
    details: [
      'Removed old damaged roofing',
      'Installed waterproof underlayment',
      'Premium shingle system installed',
      'Final inspection & cleanup completed'
    ],
    stats: {
      area: '2,400 sq ft',
      materials: 'Premium Asphalt',
      completion: 'On-time delivery'
    }
  },
  {
    id: 2,
    category: 'masonry',
    tag: 'Masonry',
    title: 'Brick Repointing',
    location: 'Queens',
    duration: '3 Days',
    img: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
    desc: 'Restored aging brick facade with full mortar repointing to prevent water damage and structural wear.',
    details: [
      'Removed deteriorated mortar',
      'Color-matched new mortar',
      'Sealed joints for durability',
      'Structure integrity verified'
    ],
    stats: {
      area: '850 linear ft',
      materials: 'Custom mortar mix',
      completion: 'Quality assured'
    }
  },
  {
    id: 3,
    category: 'concrete',
    tag: 'Concrete',
    title: 'Paver Driveway Installation',
    location: 'Bronx',
    duration: '4 Days',
    img: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
    desc: 'Custom-designed driveway using interlocking pavers for durability and modern aesthetics.',
    details: [
      'Excavation and base prep',
      'Paver layout design implemented',
      'Joint sand finishing applied',
      'Sealed for weather protection'
    ],
    stats: {
      area: '3,200 sq ft',
      materials: 'Interlocking pavers',
      completion: 'Professional finish'
    }
  }
]

const filters = ['all', 'roofing', 'masonry', 'concrete']

const projectStats = [
  { num: '150+', label: 'Projects Completed', desc: 'Successful completions' },
  { num: '25K+', label: 'Sq Ft Completed', desc: 'Square footage installed' },
  { num: '1000+', label: 'Happy Clients', desc: 'Customer satisfaction' },
  { num: '15', label: 'Years Experience', desc: 'Industry expertise' },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [openDetails, setOpenDetails] = useState<number | null>(null)

  const visibleProjects = projects.filter(
    p => activeFilter === 'all' || p.category === activeFilter
  )

  return (
    <>
      <ProgressBar />
      <Navbar />
      <RevealObserver />

      {/* HERO */}
      <section className={style['projects-hero']}>
        <div className={`${style['ph-glow']} ${style['ph-glow-b']}`}></div>
        <div className={`${style['ph-glow']} ${style['ph-glow-g']}`}></div>

        <div className={style['ph-content']}>
          <div className={style['ph-eyebrow']}>
            <div className={style['ph-line']}></div>
            <span className="eyebrow">Portfolio</span>
          </div>

          <h1 className={style['ph-title']}>
            Our Completed <em>Projects</em>
          </h1>

          <p className={style['ph-desc']}>
            Browse through our portfolio of exceptional construction and
            renovation projects delivered across the New York area.
          </p>

          <div className={style['ph-stats']}>
            {projectStats.map((stat, i) => (
              <div className={style['ph-stat']} key={i}>
                <div className={style['ph-stat-num']}>{stat.num}</div>
                <div className={style['ph-stat-label']}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER */}
      <div className={style['filter-bar']}>
        <div className={style['filter-in']}>
          <span className={style['filter-lbl']}>Filter:</span>

          {filters.map(f => (
            <button
              key={f}
              className={`${style['filter-btn']} ${
                activeFilter === f ? style.active : ''
              }`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all'
                ? 'All Projects'
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <section className={style['svc-section']}>
        <div className={style['svc-in']}>
          {visibleProjects.length > 0 ? (
            <div className={style['projects-grid']}>
              {visibleProjects.map(project => (
                <div className={style['project-card']} key={project.id}>
                  <div
                    className={style['project-img']}
                    style={{
                      backgroundImage: `url('${project.img}')`,
                    }}
                  />

                  <div className={style['project-body']}>
                    <span className={style['project-tag']}>
                      {project.tag}
                    </span>

                    <h3>{project.title}</h3>

                    <div className={style['project-meta']}>
                      <span>📍 {project.location}</span>
                      <span>⏱️ {project.duration}</span>
                    </div>

                    <p>{project.desc}</p>

                    <button
                      className={style['project-btn']}
                      onClick={() =>
                        setOpenDetails(
                          openDetails === project.id ? null : project.id
                        )
                      }
                    >
                      {openDetails === project.id
                        ? 'Hide Details'
                        : 'View Details'}
                    </button>

                    <div
                      className={`${style['project-details']} ${
                        openDetails === project.id ? style.show : ''
                      }`}
                    >
                      <ul>
                        {project.details.map((detail, j) => (
                          <li key={j}>{detail}</li>
                        ))}
                      </ul>

                      <div
                        style={{
                          marginTop: '16px',
                          paddingTop: '16px',
                          borderTop:
                            '1px solid rgba(0, 200, 150, .2)',
                        }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fit, minmax(100px, 1fr))',
                            gap: '12px',
                            fontSize: '12px',
                            color: 'var(--lb)',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                color: 'var(--gv)',
                                fontWeight: '500',
                                marginBottom: '4px',
                              }}
                            >
                              {project.stats.area}
                            </div>

                            <div>Area</div>
                          </div>

                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                color: 'var(--gv)',
                                fontWeight: '500',
                                marginBottom: '4px',
                              }}
                            >
                              {project.stats.materials}
                            </div>

                            <div>Materials</div>
                          </div>

                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                color: 'var(--gv)',
                                fontWeight: '500',
                                marginBottom: '4px',
                              }}
                            >
                              {project.stats.completion}
                            </div>

                            <div>Status</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={style['empty-state']}>
              <div className={style['empty-ico']}>📋</div>
              <h3>No Projects Found</h3>
              <p>Try adjusting your filters or view all projects.</p>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className={style['projects-stats']}>
        <div className={style['ps-in']}>
          <div className={style['ps-header']}>
            <h2 className={style['ps-title']}>
              By the <em>Numbers</em>
            </h2>
          </div>

          <div className={style['ps-grid']}>
            {projectStats.map((stat, i) => (
              <div className={style['ps-item']} key={i}>
                <div className={style['ps-num']}>{stat.num}</div>
                <div className={style['ps-label']}>{stat.label}</div>
                <div className={style['ps-desc']}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaStrip
        eyebrow="Start Your Project"
        heading={
          <>
            Let&apos;s Build
            <br />
            <em>Something Real</em>
          </>
        }
        subtext="Contact us today for a free estimate and project consultation."
      />

      <Footer />
    </>
  )
}