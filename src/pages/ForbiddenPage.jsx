import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';

export default function ForbiddenPage({ onNavigate }) {
  return (
    <div className="error-page-layout">
      {/* Decorative Security Icon */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(43, 89, 255, 0.15)',
          border: '1px solid rgba(43, 89, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-cobalt-bright)',
          marginBottom: '24px'
        }}
      >
        <ShieldAlert size={36} />
      </div>

      <div className="error-giant-code">
        4<span>0</span>3
      </div>

      <p className="eyebrow eyebrow-cobalt">
        ACCESS RESTRICTED · BACKSTAGE ENVIRONMENT
      </p>

      <h1>Restricted production zone.</h1>

      <p>
        Access to this backstage portal is reserved for authenticated Algoryxz technical directors and registered enterprise production partners. Confidential spatial run-sheets and client telemetry are protected.
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
          onClick={() => window.history.back()}
          className="btn btn-outline-light"
        >
          <ArrowLeft size={18} />
          <span>Go back</span>
        </button>
      </div>
    </div>
  );
}
