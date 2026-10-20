import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !mountRef.current) return;

    const container = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Three.js scene setup with cinematic atmospheric haze
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a0d, 0.014);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 26);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful fallback if WebGL is unavailable
      return;
    }

    // -------------------------------------------------------------
    // SCENE A & B: Topographic Contour Terrain Grid (Landscape)
    // -------------------------------------------------------------
    const terrainGeo = new THREE.PlaneGeometry(140, 120, 48, 40);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      // Generate natural undulating mountain contours with algorithmic ridges
      const elevation =
        Math.sin(vx * 0.07) * Math.cos(vy * 0.07) * 4.2 +
        Math.sin(vx * 0.16 + vy * 0.08) * 2.1 +
        Math.cos(vx * 0.03) * 3.0;
      posAttr.setZ(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0x1a2232,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.position.set(0, -9, -20);
    scene.add(terrainMesh);

    // -------------------------------------------------------------
    // Signature Algorithmic Polyhedral Wireframe Matrix (Brand Icon)
    // -------------------------------------------------------------
    const polyGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff32, // Electric acid-lime
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(11.5, 1.5, 0);
    scene.add(polyMesh);

    // Inner Cobalt Core Octahedron
    const innerGeo = new THREE.OctahedronGeometry(2.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x2b59ff, // Electric cobalt
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    polyMesh.add(innerMesh);

    // Outer Geodesic Halo Ring
    const haloGeo = new THREE.TorusGeometry(6.4, 0.035, 12, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff32,
      transparent: true,
      opacity: 0.22
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 3;
    polyMesh.add(haloMesh);

    // Secondary calibration orbital ring
    const halo2Geo = new THREE.TorusGeometry(8.0, 0.02, 12, 64);
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: 0x4f75ff,
      transparent: true,
      opacity: 0.18
    });
    const halo2Mesh = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2Mesh.rotation.y = Math.PI / 4;
    polyMesh.add(halo2Mesh);

    // -------------------------------------------------------------
    // SCENE C & D: Spatial Architectural Portals & Engineered Framework
    // -------------------------------------------------------------
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    const portalPositionsZ = [-10, -32, -54, -76, -98, -120];
    const portalWidth = 26;
    const portalHeight = 18;
    const portalY = -1;

    // Build portal frame wireframes with high-clarity architectural definition
    const portalMat = new THREE.LineBasicMaterial({
      color: 0x364862,
      transparent: true,
      opacity: 0.65
    });

    const laserLineMatLime = new THREE.LineBasicMaterial({
      color: 0xd4ff32,
      transparent: true,
      opacity: 0.75
    });

    const laserLineMatCobalt = new THREE.LineBasicMaterial({
      color: 0x3b6aff,
      transparent: true,
      opacity: 0.72
    });

    const portalGeometries = [];

    portalPositionsZ.forEach((pz, idx) => {
      const hw = portalWidth / 2;
      const h = portalHeight;
      const y0 = portalY;
      const y1 = portalY + h;

      // Construct portal outline + structural cross-bracing
      const points = [
        // Outer arch
        new THREE.Vector3(-hw, y0, pz), new THREE.Vector3(-hw, y1, pz),
        new THREE.Vector3(-hw, y1, pz), new THREE.Vector3(hw, y1, pz),
        new THREE.Vector3(hw, y1, pz), new THREE.Vector3(hw, y0, pz),
        // Ground runner
        new THREE.Vector3(-hw, y0, pz), new THREE.Vector3(hw, y0, pz),
        // Upper truss reinforcement
        new THREE.Vector3(-hw, y1 - 2.5, pz), new THREE.Vector3(hw, y1 - 2.5, pz),
        // Diagonal corner struts
        new THREE.Vector3(-hw, y1 - 4, pz), new THREE.Vector3(-hw + 4, y1, pz),
        new THREE.Vector3(hw, y1 - 4, pz), new THREE.Vector3(hw - 4, y1, pz)
      ];

      const pGeo = new THREE.BufferGeometry().setFromPoints(points);
      portalGeometries.push(pGeo);
      const lines = new THREE.LineSegments(pGeo, portalMat);
      portalGroup.add(lines);

      // Accentuate selected portals with laser scenography accents
      if (idx % 2 === 0) {
        const laserPoints = [
          new THREE.Vector3(-hw, y1, pz), new THREE.Vector3(hw, y1, pz)
        ];
        const lGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
        portalGeometries.push(lGeo);
        const lMesh = new THREE.LineSegments(lGeo, laserLineMatLime);
        portalGroup.add(lMesh);
      } else {
        const laserPoints = [
          new THREE.Vector3(-hw, y0, pz), new THREE.Vector3(-hw, y1, pz),
          new THREE.Vector3(hw, y0, pz), new THREE.Vector3(hw, y1, pz)
        ];
        const lGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
        portalGeometries.push(lGeo);
        const lMesh = new THREE.LineSegments(lGeo, laserLineMatCobalt);
        portalGroup.add(lMesh);
      }
    });

    // Longitudinal Laser Guide Rails (extending down the full architectural corridor)
    const railPoints = [
      new THREE.Vector3(-portalWidth / 2, portalY + portalHeight, 10),
      new THREE.Vector3(-portalWidth / 2, portalY + portalHeight, -130),
      new THREE.Vector3(portalWidth / 2, portalY + portalHeight, 10),
      new THREE.Vector3(portalWidth / 2, portalY + portalHeight, -130),
      new THREE.Vector3(-8, portalY, 10),
      new THREE.Vector3(-8, portalY, -130),
      new THREE.Vector3(8, portalY, 10),
      new THREE.Vector3(8, portalY, -130)
    ];
    const railGeo = new THREE.BufferGeometry().setFromPoints(railPoints);
    const railMat = new THREE.LineBasicMaterial({
      color: 0x4f75ff,
      transparent: true,
      opacity: 0.45
    });
    const rails = new THREE.LineSegments(railGeo, railMat);
    portalGroup.add(rails);

    // -------------------------------------------------------------
    // Atmospheric Dust & Luminous Embers Field
    // -------------------------------------------------------------
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.2) * 30 - 4;
      positions[i * 3 + 2] = Math.random() * -140 + 20;
      particleScales[i] = Math.random() * 0.9 + 0.3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circular soft glow texture
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
      size: 1.35,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.72
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // Cinematic Organic Atmospheric Mist Layer (Drifting volumetric clouds)
    // -------------------------------------------------------------
    const mistGroup = new THREE.Group();
    scene.add(mistGroup);

    // Create a high-quality procedural soft cloud/mist texture with midnight, cobalt, and lime undertones
    const mistCanvas = document.createElement('canvas');
    mistCanvas.width = 128;
    mistCanvas.height = 128;
    const mCtx = mistCanvas.getContext('2d');
    const mGrad = mCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    mGrad.addColorStop(0, 'rgba(79, 117, 255, 0.42)'); // Electric cobalt heart
    mGrad.addColorStop(0.35, 'rgba(212, 255, 50, 0.18)'); // Subtle acid lime fringe
    mGrad.addColorStop(0.7, 'rgba(248, 247, 244, 0.08)'); // Alabaster mist edge
    mGrad.addColorStop(1, 'rgba(9, 10, 13, 0)');
    mCtx.fillStyle = mGrad;
    mCtx.beginPath();
    mCtx.arc(64, 64, 64, 0, Math.PI * 2);
    mCtx.fill();

    const mistTexture = new THREE.CanvasTexture(mistCanvas);
    const mistGeo = new THREE.PlaneGeometry(55, 35);
    const mistPlanes = [];
    const mistConfigs = [
      { x: -8, y: -3, z: 8, scale: 1.0, opacity: 0.32 },
      { x: 10, y: 1, z: -25, scale: 1.25, opacity: 0.28 },
      { x: -6, y: 3, z: -58, scale: 1.4, opacity: 0.26 },
      { x: 7, y: 0, z: -90, scale: 1.3, opacity: 0.28 },
      { x: -3, y: -2, z: -115, scale: 1.5, opacity: 0.25 }
    ];

    mistConfigs.forEach((cfg, idx) => {
      const mMat = new THREE.MeshBasicMaterial({
        map: mistTexture,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const mMesh = new THREE.Mesh(mistGeo, mMat);
      mMesh.position.set(cfg.x, cfg.y, cfg.z);
      mMesh.scale.set(cfg.scale, cfg.scale, 1);
      mistGroup.add(mMesh);
      mistPlanes.push({ mesh: mMesh, mat: mMat, base: cfg, speed: 0.12 + idx * 0.04 });
    });

    // -------------------------------------------------------------
    // Scroll Progress & Motion Damping (Zero-allocation animation loop)
    // -------------------------------------------------------------
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateScrollProgress = () => {
      const scrollMax = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollProgress = Math.min(Math.max(window.scrollY / scrollMax, 0), 1);
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    const handleResize = () => {
      if (!renderer) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateScrollProgress();
    };
    window.addEventListener('resize', handleResize);

    // Performance loop controls
    let isTabActive = !document.hidden;
    let isRunning = false;
    let animationFrameId = null;
    let loopStartedAt = null;
    let accumulatedElapsed = 0;

    const stopLoop = () => {
      if (isRunning && loopStartedAt !== null) {
        accumulatedElapsed += (performance.now() - loopStartedAt) * 0.001;
      }
      loopStartedAt = null;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      isRunning = false;
    };

    // Preallocated vectors for camera interpolation
    const targetCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    const animate = () => {
      animationFrameId = null;
      if (!isTabActive) {
        stopLoop();
        return;
      }

      const elapsed = accumulatedElapsed + (performance.now() - loopStartedAt) * 0.001;

      // Smooth scroll interpolation
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.055;

      // Smooth mouse parallax damping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Coordinate camera journey through the 4 scenes:
      // Scene A (p = 0.0 - 0.18): Hero mountain landscape
      // Scene B (p = 0.18 - 0.40): Transition into algorithmic structure
      // Scene C (p = 0.40 - 0.70): Spatial Architecture portals & frameworks
      // Scene D (p = 0.70 - 1.00): Light and Experience finale in Proposal
      const p = smoothScrollProgress;

      // Compute camera path along corridor
      targetCamPos.x = targetX * 1.8 + Math.sin(p * Math.PI * 2) * 2.2;
      targetCamPos.y = 1.5 + p * 3.5 - targetY * 1.0;
      targetCamPos.z = 26 - p * 115; // Glides from z=26 down to z=-89

      camera.position.lerp(targetCamPos, 0.08);

      // Camera look-at point advances ahead
      targetLookAt.x = targetX * 0.6;
      targetLookAt.y = 1.0 + Math.sin(p * Math.PI) * 1.5;
      targetLookAt.z = targetCamPos.z - 35;

      currentLookAt.lerp(targetLookAt, 0.08);
      camera.lookAt(currentLookAt);

      // Algorithmic Polyhedron motion and spatial trajectory
      // As user scrolls, the polyhedron shifts from upper-right hero to framing the entrance
      polyMesh.position.x = 11.5 * (1 - p * 1.2) + Math.sin(elapsed * 0.3) * 0.5;
      polyMesh.position.y = 1.5 + Math.sin(elapsed * 0.5) * 0.8 + p * 2.0;
      polyMesh.position.z = -p * 60;

      polyMesh.rotation.x = elapsed * 0.12 + p * 1.5;
      polyMesh.rotation.y = elapsed * 0.16 + targetX * 0.15;
      innerMesh.rotation.z = -elapsed * 0.22;
      haloMesh.rotation.z = elapsed * 0.08;
      halo2Mesh.rotation.x = -elapsed * 0.06;

      // Subtle atmospheric breathing on wireframe materials
      polyMat.opacity = 0.28 + Math.sin(elapsed * 1.4) * 0.08;
      haloMat.opacity = 0.18 + Math.cos(elapsed * 1.1) * 0.06;
      laserLineMatLime.opacity = 0.45 + Math.sin(elapsed * 2.0) * 0.2;
      laserLineMatCobalt.opacity = 0.4 + Math.cos(elapsed * 1.8) * 0.18;

      // Terrain parallax & organic breathing
      terrainMesh.position.y = -9 + Math.sin(elapsed * 0.2) * 0.3 - p * 2.0;
      terrainMat.opacity = Math.max(0.12, 0.38 - p * 0.25); // Fades gently as architecture takes over

      // Atmospheric particles gentle drift
      particles.rotation.y = elapsed * 0.015 + targetX * 0.08;
      particles.rotation.x = Math.sin(elapsed * 0.01) * 0.05;

      // Organic drifting atmospheric mist layers responding to time and scroll progress
      mistPlanes.forEach((item, idx) => {
        const driftX = Math.sin(elapsed * item.speed + idx * 1.5) * 2.8;
        const driftY = Math.cos(elapsed * (item.speed * 0.8) + idx) * 1.2;
        item.mesh.position.x = item.base.x + driftX + targetX * 1.2;
        item.mesh.position.y = item.base.y + driftY;
        item.mesh.rotation.z = Math.sin(elapsed * 0.08 + idx) * 0.06;

        // Subtle breathing opacity calibrated across the journey
        const distFromCam = Math.abs(camera.position.z - item.mesh.position.z);
        const proximityFactor = THREE.MathUtils.clamp(1 - distFromCam / 60, 0.4, 1.3);
        item.mat.opacity = item.base.opacity * proximityFactor * (0.85 + Math.sin(elapsed * 1.2 + idx) * 0.15);
      });

      renderer.render(scene, camera);

      if (isTabActive) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        stopLoop();
      }
    };

    const startLoop = () => {
      if (!isRunning && isTabActive) {
        isRunning = true;
        loopStartedAt = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Thorough WebGL resource disposal
      terrainGeo.dispose();
      terrainMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      halo2Geo.dispose();
      halo2Mat.dispose();
      portalMat.dispose();
      laserLineMatLime.dispose();
      laserLineMatCobalt.dispose();
      railGeo.dispose();
      railMat.dispose();
      portalGeometries.forEach((g) => g.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      texture.dispose();
      mistGeo.dispose();
      mistTexture.dispose();
      mistPlanes.forEach((item) => item.mat.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="cinematic-canvas-container" aria-hidden="true" />;
}
