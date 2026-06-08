import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Navbar/>
   
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          
          <div>
            <div className={styles.kicker}>
              <span className={styles.line}></span>
              <span>Who We Are</span>
            </div>

            <h1>
              Built on <em>Craftsmanship.</em>
            </h1>
          </div>

          <div className={styles.heroRight}>
            <p>
              Ibaad Contracting Inc is a New York–based contractor delivering
              high-quality residential and commercial construction services with
              focus on durability, precision, and honest workmanship.
            </p>

           <div className={styles.stats}>
  <div className={styles.stat}>
    <h3>10+</h3>
    <span>Years Experience</span>
  </div>

  <div className={styles.stat}>
    <h3>100+</h3>
    <span>Projects Completed</span>
  </div>

  <div className={styles.stat}>
    <h3>NYC</h3>
    <span>Service Area</span>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* STORY + WHY */}
      <section className={styles.section}>
        <div className={styles.grid2}>
          
          <div>
            <h2>
              Our <em>Story</em>
            </h2>

            <p>
              Founded with a commitment to quality and reliability, Ibaad
              Contracting Inc has grown into a trusted name across New York City.
              From small residential repairs to full-scale commercial projects,
              every job is handled with precision and pride.
            </p>

            <p>
              We believe in doing things right the first time — using quality
              materials, skilled labor, and clear communication throughout every
              stage of the project.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Why Choose Us</h3>
            <ul>
              <li>Licensed & insured in New York</li>
              <li>Experienced skilled workforce</li>
              <li>Transparent pricing</li>
              <li>High-quality materials</li>
              <li>On-time project delivery</li>
            </ul>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className={styles.section}>
        <h2 className={styles.centerTitle}>
          Our Core <em>Values</em>
        </h2>

        <div className={styles.cards3}>
          <div className={styles.smallCard}>
            <h3>Quality First</h3>
            <p>We never compromise on materials or workmanship.</p>
          </div>

          <div className={styles.smallCard}>
            <h3>Integrity</h3>
            <p>Honest pricing and clear communication always.</p>
          </div>

          <div className={styles.smallCard}>
            <h3>Reliability</h3>
            <p>We show up on time and deliver what we promise.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.section}>
        <div className={styles.grid2}>
          
          <div>
            <h2>
              Our <em>Team</em>
            </h2>
            <p>
              Our team consists of experienced professionals in roofing,
              masonry, concrete, and exterior construction.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Licensed & Insured</h3>
            <p>Fully certified for all NYC construction projects.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div>
          <h2>
            Let’s Build Your <em>Next Project</em>
          </h2>
          <p>Contact us today for a free estimate.</p>
        </div>

        <div className={styles.ctaBtns}>
          <a href="/contact" className={styles.primaryBtn}>
            Get Free Estimate
          </a>
          <a href="tel:9299449040" className={styles.secondaryBtn}>
            Call Now
          </a>
        </div>
      </section>
<Footer/>
    </main>
  );
}