'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AtmosphereScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Matte black background
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 20); // Fade out particles in distance
    
    // Tight FOV Camera
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 50);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x111111, 2); // Very dim ambient
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xc0c0c0, 2); // Chrome tinted point light from top right
    dirLight.position.set(5, 5, 2);
    scene.add(dirLight);
    
    const fillLight = new THREE.DirectionalLight(0x222222, 1);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Particles (InstancedMesh for performance)
    const particleCount = 200;
    // Rectangular mesh representing clothing tags
    const geometry = new THREE.PlaneGeometry(0.3, 0.1); 
    const material = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.8,
      roughness: 0.2,
      side: THREE.DoubleSide
    });
    
    const instancedMesh = new THREE.InstancedMesh(geometry, material, particleCount);
    
    const dummy = new THREE.Object3D();
    const speeds: { rx: number, ry: number, rz: number, y: number, x: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Random position in a volume
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2 // Mostly behind the card
      );
      
      // Random rotation
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      
      // Store random speeds for animation
      speeds.push({
        rx: (Math.random() - 0.5) * 0.5,
        ry: (Math.random() - 0.5) * 0.5,
        rz: (Math.random() - 0.5) * 0.2,
        y: (Math.random() * 0.5) + 0.2, // Drifting upwards slightly
        x: (Math.random() - 0.5) * 0.2
      });
    }
    
    scene.add(instancedMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = 0;
    
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Pause if tab is hidden
      if (document.visibilityState === 'hidden') return;
      
      const delta = (time - lastTime) * 0.001; // seconds
      lastTime = time;

      if (!prefersReducedMotion) {
        // Update particles
        for (let i = 0; i < particleCount; i++) {
          instancedMesh.getMatrixAt(i, dummy.matrix);
          dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
          
          dummy.rotation.x += speeds[i].rx * delta;
          dummy.rotation.y += speeds[i].ry * delta;
          dummy.rotation.z += speeds[i].rz * delta;
          
          dummy.position.y += speeds[i].y * delta;
          dummy.position.x += speeds[i].x * delta;
          
          // Wrap around if they go too high
          if (dummy.position.y > 10) {
            dummy.position.y = -10;
          }
          
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
        }
        instancedMesh.instanceMatrix.needsUpdate = true;

        // Damped camera movement based on mouse
        targetX = mouseX * 2; // +/- 2 degrees approx mapping
        targetY = mouseY * 2;
        
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const onWindowResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] pointer-events-none" 
      aria-hidden="true" 
    />
  );
}
