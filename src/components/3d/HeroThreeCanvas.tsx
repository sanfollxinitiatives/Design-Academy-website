import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroThreeCanvasProps {
  interactiveMode?: 'iridescent' | 'wireframe' | 'particles';
}

export default function HeroThreeCanvas({ interactiveMode = 'iridescent' }: HeroThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x7615d9, 3.5); // Brand Purple
    dirLight1.position.set(5, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xef146b, 3.0); // Brand Pink
    dirLight2.position.set(-6, -4, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffb51c, 2.5, 15); // Brand Orange
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    const tealLight = new THREE.PointLight(0x22b8a5, 2.2, 12); // Brand Teal
    tealLight.position.set(4, -3, 2);
    scene.add(tealLight);

    // 3D Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Center Hero Torus Knot (Brand symbol for creativity & interconnected craft)
    const torusGeometry = new THREE.TorusKnotGeometry(1.35, 0.42, 140, 24, 2, 3);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.35,
      ior: 1.5,
      wireframe: interactiveMode === 'wireframe'
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.set(2.4, 0.2, 0);
    group.add(torusMesh);

    // 2. Floating Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.85, 0);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x7615d9,
      roughness: 0.2,
      metalness: 0.7,
      wireframe: interactiveMode === 'wireframe'
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(-3.2, 1.8, -1.2);
    group.add(icoMesh);

    // 3. Floating Chromatic Ring / Torus
    const ringGeometry = new THREE.TorusGeometry(0.9, 0.08, 16, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb51c,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: interactiveMode === 'wireframe'
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(-2.6, -1.9, 0.5);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 4. Floating Octahedron (Accent Teal)
    const octaGeometry = new THREE.OctahedronGeometry(0.65, 0);
    const octaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22b8a5,
      roughness: 0.15,
      metalness: 0.4,
      clearcoat: 0.8
    });
    const octaMesh = new THREE.Mesh(octaGeometry, octaMaterial);
    octaMesh.position.set(3.8, -2.2, -0.8);
    group.add(octaMesh);

    // 5. Floating Sphere (Accent Pink)
    const sphereGeometry = new THREE.SphereGeometry(0.55, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xef146b,
      roughness: 0.2,
      metalness: 0.8
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(0.2, 2.6, -1.5);
    group.add(sphereMesh);

    // 6. Particle Constellation Field
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0x7615d9),
      new THREE.Color(0xef146b),
      new THREE.Color(0x3e6fd8),
      new THREE.Color(0x22b8a5),
      new THREE.Color(0xffb51c)
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse & Scroll interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width || window.innerWidth;
        const newHeight = entry.contentRect.height || window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const scrollFactor = scrollRef.current * 0.0012;

      // Rotate and float elements
      torusMesh.rotation.x = elapsedTime * 0.35 + scrollFactor;
      torusMesh.rotation.y = elapsedTime * 0.45 + mouseRef.current.x * 0.8;
      torusMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.15 - scrollFactor * 0.6;

      icoMesh.rotation.x = elapsedTime * 0.5;
      icoMesh.rotation.y = elapsedTime * 0.7;
      icoMesh.position.y = 1.8 + Math.sin(elapsedTime + 1.2) * 0.2;

      ringMesh.rotation.z = elapsedTime * 0.6;
      ringMesh.rotation.x = Math.PI / 3 + mouseRef.current.y * 0.4;
      ringMesh.position.y = -1.9 + Math.cos(elapsedTime * 0.9) * 0.18;

      octaMesh.rotation.y = elapsedTime * 0.8;
      octaMesh.rotation.z = elapsedTime * 0.4;
      octaMesh.position.y = -2.2 + Math.sin(elapsedTime * 1.1) * 0.14;

      sphereMesh.position.y = 2.6 + Math.cos(elapsedTime * 0.7) * 0.15;

      // Subtle group parallax
      group.rotation.y = mouseRef.current.x * 0.25;
      group.rotation.x = -mouseRef.current.y * 0.2;

      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = scrollFactor * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometry and materials
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      octaGeometry.dispose();
      octaMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [interactiveMode]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    />
  );
}
