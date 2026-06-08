'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import ProgressBar from '../components/progressBar'
import CtaStrip from '../components/ctaStrip'
import RevealObserver from '../components/revealObserver'
import styles from './contact.module.css'

interface FormState {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

interface SubmissionStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })

  const [submitStatus, setSubmitStatus] = useState<SubmissionStatus>({
    type: 'idle',
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // CRITICAL: Prevent default form submission (stops GET request)
    e.preventDefault()
    e.stopPropagation()

    console.log('=== FORM SUBMIT HANDLER ===')
    console.log('Form data:', formData)
    console.log('Making POST request to /api/contact')

    setSubmitStatus({ type: 'loading' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)

      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (!response.ok) {
        throw new Error(
          responseData.error || `Server error: ${response.status}`
        )
      }

      // ✅ Success!
      console.log('✅ Form submitted successfully!')

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you! We received your request and will contact you within 24 hours.',
      })

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      })

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: 'idle' })
      }, 5000)
    } catch (error) {
      console.error('❌ Form submission failed:', error)

      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again or call us at 929-944-9040.'

      setSubmitStatus({
        type: 'error',
        message: errorMsg,
      })

      // Auto-hide error after 6 seconds
      setTimeout(() => {
        setSubmitStatus({ type: 'idle' })
      }, 6000)
    }
  }

  return (
    <>
      <ProgressBar />
      <Navbar />
      <RevealObserver />

      {/* HERO SECTION */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroIn}>
          <div>
            <div className={styles.phKicker}>
              <div className={styles.phKickerLine}></div>
              <span className={styles.eyebrow}>Get In Touch</span>
            </div>
            <h1 className={styles.heroTitle}>
              Start Your<br />
              <em>Project.</em>
            </h1>
          </div>

          <div className={styles.phRight}>
            <p>
              Whether you need roofing, masonry, siding, or full exterior work
              — reach out today. We'll assess your property and provide a
              detailed, no-obligation estimate.
            </p>

            <div className={styles.phStats}>
              <div>
                <div className={styles.phStatN}>24/7</div>
                <div className={styles.phStatL}>Support</div>
              </div>
              <div>
                <div className={styles.phStatN}>Free</div>
                <div className={styles.phStatL}>Estimates</div>
              </div>
              <div>
                <div className={styles.phStatN}>NYC</div>
                <div className={styles.phStatL}>Service Area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.svcSection}>
        <div className={`${styles.svcIn} ${styles.contactGrid}`}>
          {/* FORM SECTION */}
          <div className={styles.reveal}>
            <div className={styles.catHdr}>
              <span className={styles.catNum}>01</span>
              <h2 className={styles.catTitle}>
                Request a <em>Free Estimate</em>
              </h2>
              <div className={styles.catLine}></div>
            </div>

            {submitStatus.type === 'success' ? (
              <div
                className={styles.svcCard}
                style={{
                  marginTop: 20,
                  backgroundColor: '#d4edda',
                  borderLeft: '4px solid #28a745',
                }}
              >
                <div className={styles.svcBody}>
                  <h3 style={{ color: '#155724', marginTop: 0 }}>✅ Thank You!</h3>
                  <p style={{ color: '#155724', margin: 0 }}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {submitStatus.type === 'error' && (
                  <div
                    style={{
                      marginBottom: 20,
                      padding: 15,
                      backgroundColor: '#f8d7da',
                      borderLeft: '4px solid #dc3545',
                      borderRadius: 4,
                    }}
                  >
                    <p style={{ color: '#721c24', margin: 0 }}>
                      ❌ {submitStatus.message}
                    </p>
                  </div>
                )}

                <form
                  className={styles.contactForm}
                  onSubmit={handleFormSubmit}
                  noValidate
                >
                  {/* Name Field */}
                  <div className={styles.formRow}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={submitStatus.type === 'loading'}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className={styles.formRow}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={submitStatus.type === 'loading'}
                    />
                  </div>

                  {/* Email Field */}
                  <div className={styles.formRow}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={submitStatus.type === 'loading'}
                    />
                  </div>

                  {/* Service Select */}
                  <div className={styles.formRow}>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      disabled={submitStatus.type === 'loading'}
                    >
                      <option value="">Select Service</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Siding">Siding</option>
                      <option value="Masonry">Masonry</option>
                      <option value="Concrete / Sidewalk">
                        Concrete / Sidewalk
                      </option>
                      <option value="Painting">Painting</option>
                      <option value="Waterproofing">Waterproofing</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div className={styles.formRow}>
                    <textarea
                      name="message"
                      placeholder="Describe your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={submitStatus.type === 'loading'}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    className={styles.submitBtn}
                    type="submit"
                    disabled={submitStatus.type === 'loading'}
                  >
                    {submitStatus.type === 'loading'
                      ? '⏳ Submitting...'
                      : 'Submit Request'}
                    <span className={styles.arr}></span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* CONTACT INFO SECTION */}
          <div className={styles.reveal}>
            <div className={styles.catHdr}>
              <span className={styles.catNum}>02</span>
              <h2 className={styles.catTitle}>
                Contact <em>Details</em>
              </h2>
              <div className={styles.catLine}></div>
            </div>

            <div className={styles.svcCard} style={{ marginBottom: 20 }}>
              <div className={styles.svcBody}>
                <h3>Call Us</h3>
                <p>Speak directly with our team.</p>
                <a href="tel:9299449040" className={styles.svcCtaLink}>
                  929-944-9040
                </a>
              </div>
            </div>

            <div className={styles.svcCard} style={{ marginBottom: 20 }}>
              <div className={styles.svcBody}>
                <h3>Email</h3>
                <p>Send us your project details.</p>
                <a
                  href="mailto:ibaadcontractingcorp@gmail.com"
                  className={styles.svcCtaLink}
                >
                  ibaadcontractingcorp@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.svcCard}>
              <div className={styles.svcBody}>
                <h3>Service Area</h3>
                <p>
                  New York City &amp; surrounding metro areas including
                  Brooklyn, Queens, Bronx, Manhattan, Staten Island.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <CtaStrip
        eyebrow="Quick Contact"
        heading={
          <>
            Need Immediate <em>Help?</em>
          </>
        }
        subtext="Call us now for urgent repairs or same-day service availability."
        primaryLabel="Call Now"
        primaryHref="tel:9299449040"
        secondaryLabel="Email Us"
        secondaryHref="mailto:ibaadcontractingcorp@gmail.com"
      />

      <Footer />
    </>
  )
}