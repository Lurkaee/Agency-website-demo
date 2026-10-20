import { useState } from 'react';
import { ArrowUpRight, Check, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import KineticHeading from './KineticHeading';
import RollingDigits from './RollingDigits';
import SectionGlyph from './SectionGlyph';

export default function ProposalSection({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    event_type: '',
    event_date: '',
    guests: '',
    budget: '',
    brief: '',
    honeypot: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot field.');
      return;
    }

    // Client-side validations
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please provide your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid work email address.');
      return;
    }

    if (!formData.company.trim()) {
      setErrorMessage('Please provide your company or organisation name.');
      return;
    }

    if (!formData.event_type) {
      setErrorMessage('Please select the type of experience you are planning.');
      return;
    }

    if (!formData.brief.trim() || formData.brief.trim().length < 10) {
      setErrorMessage('Please provide details about your vision (at least 10 characters).');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please acknowledge the privacy policy to proceed.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate verified client proposal processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Launch celebratory confetti burst in Algoryxz palette
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#090a0d', '#d4ff32', '#2b59ff', '#ffffff']
        });
      } catch {
        // Confetti fallback
      }
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      event_type: '',
      event_date: '',
      guests: '',
      budget: '',
      brief: '',
      honeypot: '',
      consent: false
    });
    setIsSubmitted(false);
  };

  return (
    <section className="section-wrapper proposal-section" id="proposal" aria-labelledby="proposal-headline">
      <div className="proposal-container">
        {/* Left Side: Editorial Prompt */}
        <div className="proposal-intro">
          <div>
            <p className="eyebrow eyebrow-light"><RollingDigits value="06" delay={0.24} /> / INITIATE A COLLABORATION <SectionGlyph light /></p>
            <KineticHeading
              id="proposal-headline"
              className="proposal-intro-title"
              lines={[
                { text: 'Let’s architect' },
                { text: 'something' },
                { text: 'iconic.', accent: true }
              ]}
            />

            <p className="proposal-copy-lead">
              Have a monumental concept? An upcoming product reveal?<br />
              Or an ambition to reinvent your brand summit? We welcome your brief.
            </p>
          </div>

          <div className="proposal-usp-box">
            <span className="eyebrow eyebrow-light">YOUR STRATEGIC VISION. OUR SPATIAL RIGOR.</span>
            <p>
              Share your parameters and our executive production directors will formulate an initial structural scope and technical feasibility assessment. No generic packages.
            </p>
          </div>
        </div>

        {/* Right Side: Form or Confirmation Card */}
        <div className="proposal-form-card">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="proposal-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
              <div className="form-header-row">
                <span className="form-title">Parameters & Brief Details</span>
                <span className="form-required-hint">* Required fields</span>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  style={{
                    background: 'rgba(255, 59, 48, 0.15)',
                    border: '1px solid #ff3b30',
                    color: '#ff8a80',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    marginBottom: '20px'
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="form-grid-2col">
                <div className="field-group">
                  <label htmlFor="proposal-name">Your name *</label>
                  <input
                    id="proposal-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Alex Taylor"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-email">Work email *</label>
                  <input
                    id="proposal-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="alex@enterprise.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-company">Company / Organisation *</label>
                  <input
                    id="proposal-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    required
                    placeholder="Your company or studio"
                    className="form-input"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-phone">Direct phone</label>
                  <input
                    id="proposal-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+44 or international format"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-type">What are we creating? *</label>
                  <select
                    id="proposal-type"
                    name="event_type"
                    required
                    className="form-select"
                    value={formData.event_type}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select an experience format</option>
                    <option value="Brand Activation & Spatial Experience">Brand Activation & Spatial Experience</option>
                    <option value="Product Launch & Kinetic Reveal">Product Launch & Kinetic Reveal</option>
                    <option value="Global Summit & Keynote Symposium">Global Summit & Keynote Symposium</option>
                    <option value="Executive Gala & Corporate Experience">Executive Gala & Corporate Experience</option>
                    <option value="Custom Experiential Brief">Custom Experiential Brief</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-date">Target timeline / date</label>
                  <input
                    id="proposal-date"
                    type="date"
                    name="event_date"
                    className="form-input"
                    value={formData.event_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-guests">Estimated guests / delegates</label>
                  <input
                    id="proposal-guests"
                    type="number"
                    name="guests"
                    min="1"
                    max="100000"
                    placeholder="e.g. 250"
                    className="form-input"
                    value={formData.guests}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="proposal-budget">Indicative budget range</label>
                  <select
                    id="proposal-budget"
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select an investment tier</option>
                    <option value="Under 50,000">Under 50,000</option>
                    <option value="50,000 – 100,000">50,000 – 100,000</option>
                    <option value="100,000 – 250,000">100,000 – 250,000</option>
                    <option value="250,000+">250,000+</option>
                    <option value="Custom / To be discussed">Custom / To be discussed</option>
                  </select>
                </div>
              </div>

              {/* Big Idea Brief */}
              <div className="field-group" style={{ marginTop: '20px' }}>
                <label htmlFor="proposal-brief">Describe your vision & spatial requirements *</label>
                <textarea
                  id="proposal-brief"
                  name="brief"
                  required
                  rows={3}
                  placeholder="Strategic objectives, intended sensory atmosphere, spatial scale, or anything we should know…"
                  className="form-textarea"
                  value={formData.brief}
                  onChange={handleChange}
                />
              </div>

              {/* Honeypot field for bot deterrence */}
              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="proposal-website">Leave this field blank</label>
                <input
                  id="proposal-website"
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Consent checkbox */}
              <div className="consent-row">
                <input
                  id="proposal-consent"
                  type="checkbox"
                  name="consent"
                  required
                  className="consent-checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <label htmlFor="proposal-consent" className="consent-label">
                  I agree to the{' '}
                  <a
                    href="/privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/privacy');
                    }}
                  >
                    privacy policy
                  </a>{' '}
                  and consent to Algoryxz Agency & Co. contacting me regarding this project enquiry. *
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="proposal-submit-btn"
              >
                <span>{isSubmitting ? 'Verifying brief parameters…' : 'Transmit Brief'}</span>
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </button>

              <p className="form-security-footer">
                Strategic exploration to initiate dialogue. No obligation or booking fees required.
              </p>
              </motion.form>
            ) : (
              <motion.div
                key="proposal-success"
                className="proposal-success-box"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="success-badge-circle">
                  <Check size={36} strokeWidth={2.5} />
                </div>
                <p className="eyebrow eyebrow-light" style={{ marginBottom: '8px' }}>
                  BRIEF TRANSMITTED · LOCAL CONFIRMATION
                </p>
                <h3 className="success-headline">Thank you, {formData.name.split(' ')[0]}</h3>
                <p className="success-copy">
                  Parameters recorded for your <strong>{formData.event_type}</strong> brief for <strong>{formData.company}</strong>.
                </p>

                {/* Transparent submission notice */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--line-dark)',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-xs)',
                    maxWidth: '480px',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left'
                  }}
                >
                  <Info size={18} style={{ color: 'var(--accent-lime)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-light-subtle)' }}>
                    Transparency notice: This is a client-side prototype. No remote backend endpoint is connected yet; your parameters were validated locally in-session.
                  </span>
                </div>

                <div style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={handleReset}
                    className="btn btn-outline-light"
                    style={{ fontSize: '0.75rem', padding: '12px 20px' }}
                  >
                    Submit another brief
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
