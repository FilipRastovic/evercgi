import { useCallback, useEffect, useRef, useState } from 'react'
import { GALLERY } from './gallery.js'

const CONTACT_EMAIL = 'markobokan88@gmail.com'

const SOCIAL = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/markobokan/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/evercgi/',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  },
  {
    label: 'Behance',
    url: 'https://www.behance.net/marko_bokan',
    path: 'M7.8 5.2c.8 0 1.5.1 2.1.2.6.1 1.1.3 1.6.6.4.3.8.7 1 1.2.2.5.4 1.1.4 1.8 0 .8-.2 1.4-.5 1.9-.4.5-.9.9-1.6 1.3.9.3 1.6.8 2.1 1.5.5.7.7 1.5.7 2.4 0 .8-.1 1.4-.4 2-.3.6-.7 1-1.2 1.4-.5.4-1.1.6-1.8.8-.7.2-1.3.3-2 .3H0V5.2h7.8zm-.4 5.8c.6 0 1.2-.1 1.6-.4.4-.3.6-.8.6-1.4 0-.4-.1-.7-.2-.9-.1-.2-.3-.4-.5-.5-.2-.1-.5-.2-.8-.3-.3 0-.6-.1-.9-.1H3.4V11h4zm.2 6.1c.3 0 .7 0 1-.1.3-.1.6-.2.8-.3.2-.2.4-.4.6-.6.1-.3.2-.6.2-1 0-.8-.2-1.3-.7-1.7-.4-.3-1-.5-1.8-.5H3.4v4.2h4.2zm12.1-.1c.5.5 1.2.7 2.1.7.6 0 1.2-.2 1.6-.5.5-.3.7-.7.8-1h2.8c-.4 1.4-1.1 2.4-2.1 3-.9.6-2.1.9-3.4.9-.9 0-1.8-.1-2.5-.4-.7-.3-1.4-.7-1.9-1.3-.5-.5-.9-1.2-1.2-1.9-.3-.7-.4-1.6-.4-2.4 0-.8.1-1.6.4-2.4.3-.7.7-1.4 1.2-1.9.5-.5 1.2-1 1.9-1.3.7-.3 1.6-.5 2.5-.5 1 0 1.9.2 2.6.6.7.4 1.4.9 1.8 1.6.5.7.8 1.4 1 2.3.2.9.2 1.7.2 2.6h-8.3c0 1 .3 1.8.9 2.2zm3.6-6.1c-.4-.4-1-.6-1.8-.6-.5 0-.9.1-1.3.3-.3.2-.6.4-.8.6-.2.2-.3.5-.4.8-.1.3-.1.5-.1.7h5.1c-.1-.8-.4-1.4-.7-1.8zM15.5 6.2h6.4v1.6h-6.4V6.2z',
  },
]

function Header() {
  return (
    <header className="header">
      <a href="#top" className="brand">EVERCGI</a>
      <a href="#contact" className="header-cta">Contact</a>
    </header>
  )
}

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [missing, setMissing] = useState(() => new Set())

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const images = GALLERY.filter((f) => !missing.has(f))

  return (
    <>
      <section id="top" className="gallery">
        <div className="gallery-masonry">
          {images.map((file) => (
            <div key={file} className="gallery-item" onClick={() => setLightbox(file)}>
              <img
                src={`/gallery/${file}`}
                alt=""
                loading="lazy"
                onError={() => setMissing((m) => new Set(m).add(file))}
              />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label="Close" onClick={() => setLightbox(null)}>✕</button>
          <img src={`/gallery/${lightbox}`} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const mountedAt = useRef(Date.now())

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (e.target.querySelector('input[name="website"]')?.value) return
    if (Date.now() - mountedAt.current < 2000) return
    setSubmitting(true)
    try {
      await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        body: new FormData(e.target),
      })
    } catch {
      // formsubmit failures are silent for the visitor, same as before
    }
    setSubmitted(true)
    setSubmitting(false)
  }, [])

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <h2>Contact</h2>
        <p className="contact-sub">Reach out for business inquiries using the form below.</p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Contact</h3>
            <p className="contact-note">Write your message below</p>

            {submitted ? (
              <div className="contact-success">
                <div className="tick">&#10003;</div>
                <h4>Thank you!</h4>
                <p>Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New enquiry from evercgi.com" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="hp" aria-hidden="true">
                  <label htmlFor="hp-website">Website</label>
                  <input type="text" id="hp-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" />
                </label>
                <div>
                  <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send'}</button>
                  <p className="consent">We reply within 24 hours.</p>
                </div>
              </form>
            )}
          </div>

          <div className="contact-info">
            <h3>Working Hours</h3>
            <p>Business days<br /><b>09:00 – 17:00 Central Europe</b></p>
            <div className="divider" />
            <h3>Address</h3>
            <p>Miroslava Antica 2<br />Novi Sad, Serbia</p>
            <div className="social">
              <h3>Social Media</h3>
              <div className="social-links">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <Gallery />
      <Contact />
      <footer className="footer">© {new Date().getFullYear()} EVERCGI · Marko Bokan</footer>
    </>
  )
}

