'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  // { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navI}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.lt}>
              Ibaad <b>Contracting Inc</b>
            </span>
          </Link>

          {/* Nav Links */}
          <div 
            className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}
            id="navMenu"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? styles.active : ''}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section: Phone + Button */}
          <div className={styles.navR}>
            <a href="tel:9299449040" className={styles.navTel}>
              929 · 944 · 9040
            </a>
            <Link href="/contact" className={`${styles.btn} ${styles.btnP}`}>
              Free Estimate
            </Link>
          </div>

          {/* Hamburger Toggle */}
          <button
            className={`${styles.navToggle} ${menuOpen ? styles.active : ''}`}
            id="navToggle"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`${styles.navOverlay} ${menuOpen ? styles.active : ''}`}
        onClick={closeMenu}
        role="presentation"
      />
    </>
  )
}