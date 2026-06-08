// 'use client'

// import styles from './process.module.css'

// export default function Process() {
//   return (
//     <section className={styles.process}>
//       <div className={styles.procIn}>
        
//         {/* Header */}
//         <div className={styles.procHdr}>
//           <div>
//             <div className="eyebrow" style={{ marginBottom: 12 }}>
//               How We Work
//             </div>
//             <h2>
//               Our <em>Process</em>
//             </h2>
//           </div>

//           <p>
//             A simple, transparent process designed to make your home improvement
//             project stress-free from start to finish.
//           </p>
//         </div>

//         {/* Track */}
//         <div className={styles.procTrack}>
//           <div className={styles.procLine}></div>
//           <div className={styles.procLineActive}></div>

//           {/* Step 1 */}
//           <div className={`${styles.procStep} ${styles.done}`}>
//             <div className={styles.procNode}>
//               <svg viewBox="0 0 24 24">
//                 <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
//               </svg>
//             </div>
//             <div className={styles.procN}>01 / Contact</div>
//             <div className={styles.procT}>Call or Email Us</div>
//             <div className={styles.procD}>
//               Reach us to discuss your project.
//             </div>
//           </div>

//           {/* Step 2 */}
//           <div className={`${styles.procStep} ${styles.done}`}>
//             <div className={styles.procNode}>
//               <svg viewBox="0 0 24 24">
//                 <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12"/>
//               </svg>
//             </div>
//             <div className={styles.procN}>02 / Estimate</div>
//             <div className={styles.procT}>Free Site Visit</div>
//             <div className={styles.procD}>
//               We assess and give a free estimate.
//             </div>
//           </div>

//           {/* Step 3 */}
//           <div className={`${styles.procStep} ${styles.active}`}>
//             <div className={styles.procNode}>
//               <svg viewBox="0 0 24 24">
//                 <path d="M9 12h3.75M9 15h3.75M9 18h3.75"/>
//               </svg>
//             </div>
//             <div className={styles.procN}>03 / Proposal</div>
//             <div className={styles.procT}>Review & Approve</div>
//             <div className={styles.procD}>
//               Approve proposal and schedule work.
//             </div>
//           </div>

//           {/* Step 4 */}
//           <div className={styles.procStep}>
//             <div className={styles.procNode}>
//               <svg viewBox="0 0 24 24">
//                 <path d="M11.42 15.17L17.25 21"/>
//               </svg>
//             </div>
//             <div className={styles.procN}>04 / Build</div>
//             <div className={styles.procT}>Work Begins</div>
//             <div className={styles.procD}>
//               Our team starts construction.
//             </div>
//           </div>

//           {/* Step 5 */}
//           <div className={styles.procStep}>
//             <div className={styles.procNode}>
//               <svg viewBox="0 0 24 24">
//                 <path d="M9 12.75L11.25 15 15 9.75"/>
//               </svg>
//             </div>
//             <div className={styles.procN}>05 / Complete</div>
//             <div className={styles.procT}>Final Walkthrough</div>
//             <div className={styles.procD}>
//               We ensure everything is perfect.
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useEffect } from 'react'
import styles from './process.module.css'

const steps = [
  {
    id: '01',
    title: 'Contact',
    subtitle: 'Call or Email Us',
    desc: 'Reach us at 929-944-9040 or email ibaadcontractingcorp@gmail.com to discuss your project.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    status: 'done',
  },
  {
    id: '02',
    title: 'Estimate',
    subtitle: 'Free Site Visit',
    desc: 'We visit your property, assess the scope of work, and provide a detailed free estimate — no obligation.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
    status: 'done',
  },
  {
    id: '03',
    title: 'Proposal',
    subtitle: 'Review & Approve',
    desc: 'We present a clear, itemized proposal. Once approved, we schedule your project promptly.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    status: 'active',
  },
  {
    id: '04',
    title: 'Build',
    subtitle: 'Work Begins',
    desc: 'Our skilled crew gets to work using quality materials, keeping your property clean and safe throughout.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75" />
      </svg>
    ),
    status: '',
  },
  {
    id: '05',
    title: 'Complete',
    subtitle: 'Final Walkthrough',
    desc: 'We do a final walkthrough with you to ensure everything meets your expectations before we call it done.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    status: '',
  },
]

export default function Process() {
  useEffect(() => {
    const el = document.getElementById('procLine')
    if (el) {
      setTimeout(() => {
        el.style.width = '60%'
      }, 300)
    }
  }, [])

  return (
    <section className={styles.process}>
      <div className={styles.procIn}>
        <div className={styles.procHdr}>
          <div>
            <div className={styles.eyebrow}>How We Work</div>
            <h2>
              Our <em>Process</em>
            </h2>
          </div>

          <p>
            A simple, transparent process designed to make your home improvement project stress-free
            from start to finish.
          </p>
        </div>

        <div className={styles.procTrack}>
          <div className={styles.procLine} />
          <div className={styles.procLineActive} id="procLine" />

          {steps.map((step) => (
            <div
              key={step.id}
              className={`${styles.procStep} ${
                step.status === 'active'
                  ? styles.active
                  : step.status === 'done'
                  ? styles.done
                  : ''
              }`}
            >
              <div className={styles.procNode}>{step.icon}</div>

              <div className={styles.procN}>{step.id} / {step.title}</div>
              <div className={styles.procT}>{step.subtitle}</div>
              <div className={styles.procD}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}