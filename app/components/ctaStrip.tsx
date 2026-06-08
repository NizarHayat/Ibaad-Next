import Link from 'next/link'

interface CtaStripProps {
  eyebrow: string
  heading: React.ReactNode
  subtext: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaStrip({
  eyebrow,
  heading,
  subtext,
  primaryLabel = 'Get Free Estimate',
  primaryHref = '/contact',
  secondaryLabel = 'Call Now',
  secondaryHref = 'tel:9299449040',
}: CtaStripProps) {
  return (
    <section className="cta-strip">
      
      {/* Background Effects */}
      <div className="cta-bg" />
      <div className="cta-grid" />

      {/* Corner Decorations */}
      <div className="cta-corner cta-tl" />
      <div className="cta-corner cta-tr" />
      <div className="cta-corner cta-bl" />
      <div className="cta-corner cta-br" />

      <div className="cta-in">
        
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          {eyebrow}
        </div>

        <h2>{heading}</h2>
        <p>{subtext}</p>

        <div className="cta-acts">
          <Link href={primaryHref} className="btn btn-p">
            {primaryLabel}
          </Link>
          <a href={secondaryHref} className="btn btn-ghost">
            {secondaryLabel}
          </a>
        </div>

        {/* Optional Contact Info */}
        <div className="cta-contacts">
          <div>
            <div className="cc-lbl">CALL US</div>
            <div className="cc-val">929-944-9040</div>
          </div>
          <div>
            <div className="cc-lbl">EMAIL</div>
            <div className="cc-val">ibaadcontractingcorp@gmail.com</div>
          </div>
        </div>

      </div>
    </section>
  )
}