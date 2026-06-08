'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
// import Navbar from './Navbar'
// import Footer from './Footer'
import ProgressBar from "./progressBar"
import Services from './Services/Services'
import Process from './Process/process'
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── HERO SLIDESHOW ── */
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLElement>('.hero-slide')
    let current = 0
    const next = () => {
      slides[current].classList.remove('active')
      current = (current + 1) % slides.length
      slides[current].classList.add('active')
    }
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [])

  /* ── PARALLAX GLOW ── */
  useEffect(() => {
    const glowB = document.querySelector<HTMLElement>('.hero-glow-b')
    const glowG = document.querySelector<HTMLElement>('.hero-glow-g')
    const onScroll = () => {
      const sy = window.scrollY
      if (glowB) glowB.style.transform = `translateY(${sy * 0.25}px)`
      if (glowG) glowG.style.transform = `translateY(${sy * 0.18}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── CANVAS ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.innerWidth < 768) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, nodes: any[] = [], mX = -999, mY = -999, raf = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      nodes = []
      const spacing = 90
      const cols = Math.floor(W / spacing) + 1
      const rows = Math.floor(H / spacing) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + spacing / 2
          const y = r * spacing + spacing / 2
          nodes.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const t = Date.now() * 0.0005
      nodes.forEach(n => {
        const dx = n.x - mX, dy = n.y - mY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180 && dist > 0) {
          const force = ((180 - dist) / 180) * 18
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }
        n.vx += (n.ox - n.x) * 0.04
        n.vy += (n.oy - n.y) * 0.04
        n.vx *= 0.82; n.vy *= 0.82
        n.x += n.vx; n.y += n.vy
        n.x += Math.sin(t * 0.7 + n.oy * 0.012) * 0.3
        n.y += Math.cos(t * 0.9 + n.ox * 0.01) * 0.3
      })
      nodes.forEach((n, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(255,116,48,${(1 - d / 110) * 0.12})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
        const dm = Math.sqrt((n.x - mX) ** 2 + (n.y - mY) ** 2)
        const glow = Math.max(0, 1 - dm / 200) * 0.5
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = glow > 0.3
          ? `rgba(0,200,150,${0.15 + glow * 0.35})`
          : `rgba(255,116,48,${0.12 + glow * 0.3})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize(); draw()
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); setTimeout(() => { resize(); draw() }, 100) })
    const mm = (e: MouseEvent) => { mX = e.clientX; mY = e.clientY }
    document.addEventListener('mousemove', mm)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('mousemove', mm) }
  }, [])

  /* ── REVEAL ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <ProgressBar />
      {/* <Navbar /> */}

      {/* HERO */}
      <section className="hero">
        <div className="hero-slide hs1 active" />
        <div className="hero-slide hs2" />
        <div className="hero-slide hs3" />
        <div className="hero-slide hs4" />
        <canvas ref={canvasRef} id="heroCanvas" />
        <div className="hero-noise" />
        <div className="hero-vignette" />
        <div className="hero-glow-b" />
        <div className="hero-glow-g" />
        <div className="hero-coord">40°42′N · 74°00′W · New York City</div>

        <div className="hero-body">
          <div className="hero-kicker">
            <div className="kicker-line" />
            <span className="eyebrow">Licensed &amp; Insured · Residential &amp; Commercial</span>
          </div>
          <h1 className="hero-h">
            <span className="l1">Home</span>
            <span className="l2"><em>Improvement</em></span>
            <span className="l3">Experts<span style={{ color: 'var(--gv)' }}>.</span></span>
          </h1>

          <div className="hero-foot">
            <div className="hf-block">
              <div className="hf-val">12<span>+</span></div>
              <div className="hf-lbl">Services Offered</div>
              <div className="hf-desc">From roofing to window glass replacement</div>
            </div>
            <div className="hf-block">
              <div className="hf-val">100<span>%</span></div>
              <div className="hf-lbl">Licensed &amp; Insured</div>
              <div className="hf-desc">Fully certified for your peace of mind</div>
            </div>
            <div className="hf-block hf-actions">
              <a href="tel:9299449040" className="btn btn-p" style={{ fontSize: 13, padding: '14px 30px', width: 'fit-content' }}>
                Call 929-944-9040 <span className="arr" />
              </a>
              <Link href="/services" className="btn btn-ghost" style={{ fontSize: 13, padding: '14px 30px', width: 'fit-content' }}>
                Our Services
              </Link>
            </div>
          </div>
        </div>

        <div className="scroll-ind">
          <div className="scroll-line-v" />
          <span className="scroll-lbl">SCROLL</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="t-track">
          {[
            'Siding', 'Licensed & Insured', 'Pavers', 'Free Estimates',
            'Roofing', 'Residential & Commercial', 'Painting', '929-944-9040',
            'Masonry', 'Brick Repointing', 'Sidewalk', 'Powerwashing',
            'Waterproofing', 'Brick Replacement', 'Concrete Replacement', 'Window Glass Replacement',
            // duplicate
            'Siding', 'Licensed & Insured', 'Pavers', 'Free Estimates',
            'Roofing', 'Residential & Commercial', 'Painting', '929-944-9040',
            'Masonry', 'Brick Repointing',
          ].map((item, i) => (
            <div className="t-item" key={i}>
              <span className="td" />
              {[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].includes(i)
                ? <span className="tg">{item}</span>
                : item}
            </div>
          ))}
        </div>
      </div>

      {/* TRUST / METRICS */}
      <section className="trust">
        <div className="trust-in">
          <div className="trust-top reveal">
            <div>
              <div className="eyebrow" style={{ marginBottom: 16, display: 'inline-block' }}>Why Choose Us</div>
              <h2>New York&apos;s<br />Trusted <em>Contractors</em></h2>
            </div>
            <p>
              For over a decade, Ibaad Contracting Inc has delivered residential and commercial
              construction services across New York City. We pride ourselves on quality craftsmanship,
              transparent pricing, and reliable project delivery — every single time.
            </p>
          </div>

          <div className="met-grid">
            {[
              { num: '10', sup: '+', unit: 'Years', desc: 'Serving NYC homeowners and businesses with trusted contracting services.' },
              { num: '100', sup: '+', unit: 'Projects', desc: 'Completed across all five boroughs and metro area.' },
              { num: '100', sup: '%', unit: 'Licensed', desc: 'Fully licensed and insured in New York State.' },
              { num: '0', sup: '$', unit: 'Estimates', desc: 'Every estimate is free, detailed, and obligation-free.' },
            ].map((m, i) => (
              <div className="mc reveal" key={i}>
                <div className="mc-bar" />
                <div className="mc-num">{m.num}<sup>{m.sup}</sup></div>
                <div className="mc-unit">{m.unit}</div>
                <div className="mc-desc">{m.desc}</div>
              </div>
            ))}
          </div>

          <div className="certs">
            {[
              { label: 'NY Licensed', sub: 'State of New York' },
              { label: 'Fully Insured', sub: 'Liability & Workers Comp' },
              { label: 'Free Estimates', sub: 'No Obligation' },
              { label: 'Residential & Commercial', sub: 'All Property Types' },
            ].map((c, i) => (
              <div className="cert" key={i}>
                <div className="cert-ico">
                  <svg viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="cert-n">{c.label}</div>
                  <div className="cert-s">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   <Services />

   <Process />

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="test-in">
          <div className="test-hdr reveal">
            <div className="eyebrow" style={{ marginBottom: 12, display: 'inline-block' }}>Client Voices</div>
            <h2>What Clients <em>Say</em></h2>
          </div>
          <div className="test-featured reveal">
            <div className="quot-mark">&ldquo;</div>
            <blockquote className="test-quote">
              Ibaad Contracting replaced our entire roof and did brick repointing on the front of our house.
              The crew was professional, cleaned up every day, and finished ahead of schedule.
              Incredible work — I highly recommend them.
            </blockquote>
            <div className="test-author">
              <div className="test-avatar">MR</div>
              <div>
                <div className="test-name">Maria Rodriguez</div>
                <div className="test-role">Homeowner · Brooklyn, NY</div>
              </div>
            </div>
          </div>
          <div className="test-grid">
            {[
              { initials: 'JL', quote: 'They powerwashed our entire building exterior and it looks brand new. Fast, affordable, and professional. Will definitely call them again.', name: 'James Lee', role: 'Property Manager · Queens, NY' },
              { initials: 'SK', quote: 'Ibaad fixed our sidewalk violation quickly and at a great price. They handled everything from start to finish including the DOT inspection. Very smooth process.', name: 'Sandra Kim', role: 'Homeowner · Bronx, NY' },
              { initials: 'DP', quote: 'Had all our window glass replaced after a storm. They came out the same day, gave a fair estimate, and finished the job in a few hours. Outstanding service.', name: 'David Park', role: 'Business Owner · Manhattan, NY' },
            ].map((t, i) => (
              <div className="test-card reveal" key={i}>
                <div className="tc-q">{t.quote}</div>
                <div className="tc-auth">
                  <div className="tc-av">{t.initials}</div>
                  <div>
                    <div className="tc-n">{t.name}</div>
                    <div className="tc-r">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="cta-bg" />
        <div className="cta-grid" />
        <div className="cta-corner cta-tl" />
        <div className="cta-corner cta-tr" />
        <div className="cta-corner cta-bl" />
        <div className="cta-corner cta-br" />
        <div className="cta-in reveal">
          <div className="eyebrow" style={{ display: 'inline-block', marginBottom: 22 }}>Free Estimates</div>
          <h2>Ready to<br />Improve Your<br /><em>Property?</em></h2>
          <p>
            Whether it&apos;s a roof repair, new siding, brick repointing, or anything in between —
            Ibaad Contracting Inc delivers quality work at honest prices. Call us today for your free estimate.
          </p>
          <div className="cta-acts">
            <a href="tel:9299449040" className="btn btn-p" style={{ padding: '18px 40px', fontSize: 14 }}>
              Call 929-944-9040 <span className="arr" />
            </a>
            <a href="mailto:ibaadcontractingcorp@gmail.com" className="btn btn-ghost" style={{ padding: '18px 40px', fontSize: 14 }}>
              Email Us
            </a>
          </div>
          <div className="cta-contacts">
            <div><div className="cc-lbl">Phone</div><div className="cc-val">929-944-9040</div></div>
            <div><div className="cc-lbl">Email</div><div className="cc-val">ibaadcontractingcorp@gmail.com</div></div>
            <div><div className="cc-lbl">Service Area</div><div className="cc-val">New York City &amp; Metro</div></div>
            <div><div className="cc-lbl">Estimates</div><div className="cc-val">Always Free</div></div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  )
}