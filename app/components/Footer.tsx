import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="foot-in">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="logo">
              <span className="lt">Ibaad <b>Contracting Inc</b></span>
            </div>
            <p>
              Licensed &amp; insured residential and commercial home improvement
              contractor serving New York City and surrounding areas.
            </p>
          </div>
          <div className="foot-links">
            <div className="fcol">
              <h5>Services</h5>
              <Link href="/services">Roofing</Link>
              <Link href="/services">Siding</Link>
              <Link href="/services">Masonry</Link>
              <Link href="/services">Pavers</Link>
            </div>
            <div className="fcol">
              <h5>More Services</h5>
              <Link href="/services">Painting</Link>
              <Link href="/services">Powerwashing</Link>
              <Link href="/services">Waterproofing</Link>
              <Link href="/services">Sidewalk</Link>
            </div>
            <div className="fcol">
              <h5>Specialty</h5>
              <Link href="/services">Brick Repointing</Link>
              <Link href="/services">Brick Replacement</Link>
              <Link href="/services">Concrete</Link>
              <Link href="/services">Window Glass</Link>
            </div>
            <div className="fcol">
              <h5>Contact</h5>
              <a href="tel:9299449040">929-944-9040</a>
              <a href="mailto:ibaadcontractingcorp@gmail.com">Email Us</a>
              <Link href="/contact">Free Estimate</Link>
              <span style={{ fontSize: 13, color: 'var(--wm)' }}>NYC &amp; Metro Area</span>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <span className="foot-copy">
            © 2025 Ibaad Contracting Inc. All rights reserved. Licensed &amp; Insured.
          </span>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="X / Twitter">
              <i className="fab fa-x-twitter" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="mailto:ibaadcontractingcorp@gmail.com" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}