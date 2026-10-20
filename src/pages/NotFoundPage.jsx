import { ArrowUpRight, Home, Sparkles } from 'lucide-react';

export default function NotFoundPage({ onNavigate }) {
  return (
    <div className="error-page-layout">
      {/* Algorithmic Star Graphic */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(212, 255, 50, 0.1)',
          border: '1px solid rgba(212, 255, 50, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-lime)',
          marginBottom: '24px'
        }}
      >
        <Sparkles size={36} />
      </div>

      <div className="error-giant-code">
        4<span>0</span>4
      </div>

      <p className="eyebrow eyebrow-light">
        COORDINATE NOT FOUND · SPATIAL INDEX ERROR
      </p>

      <h1>This coordinate is off the grid.</h1>

      <p>
        The spatial environment or project case study you requested does not exist in our current archive. Let’s guide you back to the main stage.
      </p>

      <div className="error-actions-group">
        <button
          onClick={() => onNavigate('/')}
          className="btn btn-lime"
        >
          <Home size={18} />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => onNavigate('/#work')}
          className="btn btn-outline-light"
        >
          <span>Explore selected work</span>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}
