import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CINEMA_SLIDES } from '../data/agencyData';

export default function CinemaModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CINEMA_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CINEMA_SLIDES.length) % CINEMA_SLIDES.length);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, nextSlide, prevSlide]);

  // Slideshow auto-advance timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, nextSlide, currentIndex]);

  if (!isOpen) return null;

  const currentSlide = CINEMA_SLIDES[currentIndex];

  return (
    <div
      className="cinema-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Algoryxz Agency & Co. creative experience reel"
    >
      <button
        onClick={onClose}
        className="cinema-close-btn"
        aria-label="Close photo preview"
      >
        <X size={22} />
      </button>

      {/* Main Viewport */}
      <div className="cinema-viewport">
        <img
          key={currentSlide.src}
          src={currentSlide.src}
          alt={currentSlide.title}
          className="cinema-slide-image"
        />
        <div className="cinema-slide-vignette" />
      </div>

      {/* Slide Information */}
      <div className="cinema-info-panel">
        <span className="eyebrow eyebrow-light">
          {currentSlide.category} · 0{currentIndex + 1} OF 0{CINEMA_SLIDES.length}
        </span>
        <h2>{currentSlide.title}</h2>
        <p>{currentSlide.subtitle}</p>
      </div>

      {/* Progress Bars */}
      <div className="cinema-timeline-progress">
        {CINEMA_SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            className="cinema-track"
            onClick={() => setCurrentIndex(idx)}
            style={{ cursor: 'pointer' }}
            title={slide.title}
          >
            <div
              className="cinema-track-fill"
              style={{
                width:
                  idx < currentIndex
                    ? '100%'
                    : idx === currentIndex
                    ? '100%'
                    : '0%',
                transition:
                  idx === currentIndex && isPlaying
                    ? 'width 4.5s linear'
                    : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Play Controls Bar */}
      <div className="cinema-controls-bar">
        <button
          onClick={prevSlide}
          className="cinema-nav-arrow"
          aria-label="Previous preview photo"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="cinema-play-toggle"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
        </button>

        <button
          onClick={nextSlide}
          className="cinema-nav-arrow"
          aria-label="Next preview photo"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
