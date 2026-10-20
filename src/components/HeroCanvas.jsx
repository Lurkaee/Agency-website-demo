import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful fallback if WebGL is unavailable
      return;
    }

    // Geometry 1: Primary Algorithmic Polyhedral Wireframe Matrix
    const polyGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff32, // Electric acid-lime
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(11.5, 1, 0);
    scene.add(polyMesh);

    // Inner Cobalt Core Sphere
    const innerGeo = new THREE.OctahedronGeometry(2.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x2b59ff, // Electric cobalt
      wireframe: true,
      transparent: true,
      opacity: 0.42
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    polyMesh.add(innerMesh);

    // Outer Geodesic Halo Ring (architectural orbital boundary)
    const haloGeo = new THREE.TorusGeometry(6.4, 0.035, 12, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff32,
      transparent: true,
      opacity: 0.2
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 3;
    polyMesh.add(haloMesh);

    // Geometry 2: Floating Algorithmic Data Points (Luminous volumetric field)
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      scales[i] = Math.random() * 0.9 + 0.3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom gradient circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(212, 255, 50, 1)');
    grad.addColorStop(0.35, 'rgba(43, 89, 255, 0.7)');
    grad.addColorStop(0.85, 'rgba(10, 15, 30, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    const particleMat = new THREE.PointsMaterial({
      size: 1.15,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction & smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Performance Management: Pause rendering when off-screen or tab hidden
    let isVisible = true;
    let isTabActive = !document.hidden;

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop with clock and adaptive frame execution
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Only execute updates and WebGL draw calls when visible in viewport and tab is focused
      if (!isVisible || !isTabActive) return;

      const elapsed = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate particles and wireframe mesh
      particles.rotation.y = elapsed * 0.02 + targetX * 0.15;
      particles.rotation.x = Math.sin(elapsed * 0.015) * 0.08 - targetY * 0.12;

      polyMesh.rotation.x = elapsed * 0.12;
      polyMesh.rotation.y = elapsed * 0.18 + targetX * 0.2;
      innerMesh.rotation.z = -elapsed * 0.25;
      haloMesh.rotation.z = elapsed * 0.09;

      // Delicate subtle breathing illumination on wireframe
      polyMat.opacity = 0.28 + Math.sin(elapsed * 1.5) * 0.08;
      haloMat.opacity = 0.16 + Math.cos(elapsed * 1.2) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      polyGeo.dispose();
      polyMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-background-canvas" aria-hidden="true" />;
}
