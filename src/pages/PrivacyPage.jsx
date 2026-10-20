import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage({ onNavigate }) {
  const returnToProposal = (e) => {
    e.preventDefault();
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById('proposal');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="page-container">
      <article className="privacy-article">
        <p className="eyebrow" style={{ color: 'var(--accent-lime-deep)' }}>
          ALGORYXZ AGENCY & CO. · DATA PROTOCOLS
        </p>
        <h1>Privacy policy.</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-ink)', lineHeight: '1.8', marginBottom: '32px' }}>
          When you share a project brief with Algoryxz Agency & Co., you are trusting our collective with your parameters. Here is how information submitted through this platform is handled with uncompromising transparency.
        </p>

        <section className="privacy-section-block">
          <h2>What we collect</h2>
          <p>
            The proposal form collects your name, professional work email, company or studio name, and any optional direct telephone number, event date, guest count, and indicative budget tier you provide. It also captures your experience category, your written project brief, and your explicit consent to be contacted. Please avoid transmitting sensitive personal information in your initial brief.
          </p>
        </section>

        <section className="privacy-section-block">
          <h2>How we use it</h2>
          <p>
            Your parameters are utilized exclusively by our executive production directors to evaluate your spatial requirements, review feasibility, and prepare an intelligent response or proposal. Submitting an enquiry never subscribes you to automated marketing spam or initiates a financial transaction.
          </p>
        </section>

        <section className="privacy-section-block">
          <h2>Storage and access</h2>
          <p>
            Briefs are transmitted securely and processed strictly to operate this advisory service. Enquiries are not publicly visible and cannot be accessed or modified by other site visitors. No stakeholder information is ever sold, leased, or distributed to third-party commercial brokers.
          </p>
        </section>

        <section className="privacy-section-block">
          <h2>Your choices</h2>
          <p>
            You retain the right to request access to, correction of, or permanent deletion of any information you have submitted to Algoryxz Agency & Co. To exercise this right, submit a note stating that your request concerns privacy, accompanied by the email address associated with your original submission. You may also instruct our collective to discontinue communications at any time.
          </p>
        </section>

        <section className="privacy-section-block">
          <h2>Digital assets and browser telemetry</h2>
          <p>
            Visual assets are distributed via global content delivery networks, and typography is rendered securely via Google Fonts. Standard technical telemetry (such as anonymous IP headers) is processed by network providers during asset dispatch. This website does not employ invasive behavioural trackers or require user authentication to submit an experiential brief.
          </p>
        </section>

        <div style={{ marginTop: '40px' }}>
          <a
            href="/#proposal"
            className="text-link"
            onClick={returnToProposal}
          >
            <ArrowLeft size={18} />
            <span>Back to your project brief</span>
          </a>
        </div>
      </article>
    </div>
  );
}
