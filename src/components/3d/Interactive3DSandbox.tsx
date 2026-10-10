import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Box, Disc, Gem, Sun } from 'lucide-react';

type GeometryType = 'torusKnot' | 'cube' | 'prism' | 'sphere';
type MaterialType = 'iridescent' | 'chrome' | 'glass' | 'clay';

export default function Interactive3DSandbox() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGeometry, setActiveGeometry] = useState<GeometryType>('torusKnot');
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>('iridescent');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lightColor, setLightColor] = useState<string>('#7615d9');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(new THREE.Color(lightColor), 3.5);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const fillLight = new THREE.DirectionalLight(0xef146b, 2.0);
    fillLight.position.set(-4, -3, 2);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xffb51c, 1.8, 10);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    // Helper to generate geometry
    const getGeometry = (type: GeometryType) => {
      switch (type) {
        case 'cube':
          return new THREE.BoxGeometry(1.6, 1.6, 1.6);
        case 'prism':
          return new THREE.ConeGeometry(1.2, 1.8, 5);
        case 'sphere':
          return new THREE.IcosahedronGeometry(1.2, 2);
        case 'torusKnot':
        default:
          return new THREE.TorusKnotGeometry(0.9, 0.32, 120, 20);
      }
    };

    // Helper to generate material
    const getMaterial = (type: MaterialType) => {
      switch (type) {
        case 'chrome':
          return new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.95,
            roughness: 0.05,
          });
        case 'glass':
          return new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.9,
            ior: 1.5,
            thickness: 1.2,
          });
        case 'clay':
          return new THREE.MeshStandardMaterial({
            color: 0x34323a,
            metalness: 0.1,
            roughness: 0.85,
          });
        case 'iridescent':
        default:
          return new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.3,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transmission: 0.35,
            ior: 1.6,
          });
      }
    };

    const mesh = new THREE.Mesh(getGeometry(activeGeometry), getMaterial(activeMaterial));
    scene.add(mesh);
    meshRef.current = mesh;

    // Mouse drag interaction
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !meshRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && meshRef.current && !isDraggingRef.current) {
        meshRef.current.rotation.y += delta * 0.6;
        meshRef.current.rotation.x += delta * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update geometry & material when state changes
  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.geometry.dispose();

    switch (activeGeometry) {
      case 'cube':
        meshRef.current.geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        break;
      case 'prism':
        meshRef.current.geometry = new THREE.ConeGeometry(1.2, 1.8, 5);
        break;
      case 'sphere':
        meshRef.current.geometry = new THREE.IcosahedronGeometry(1.2, 2);
        break;
      case 'torusKnot':
      default:
        meshRef.current.geometry = new THREE.TorusKnotGeometry(0.9, 0.32, 120, 20);
        break;
    }
  }, [activeGeometry]);

  useEffect(() => {
    if (!meshRef.current) return;

    if (Array.isArray(meshRef.current.material)) {
      meshRef.current.material.forEach((m) => m.dispose());
    } else {
      meshRef.current.material.dispose();
    }

    switch (activeMaterial) {
      case 'chrome':
        meshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.05,
        });
        break;
      case 'glass':
        meshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.9,
          ior: 1.5,
          thickness: 1.2,
        });
        break;
      case 'clay':
        meshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0x34323a,
          metalness: 0.1,
          roughness: 0.85,
        });
        break;
      case 'iridescent':
      default:
        meshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.3,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transmission: 0.35,
          ior: 1.6,
        });
        break;
    }
  }, [activeMaterial]);

  useEffect(() => {
    if (dirLightRef.current) {
      dirLightRef.current.color = new THREE.Color(lightColor);
    }
  }, [lightColor]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0e0e16]/95 via-[#08080d]/90 to-[#0e0e16]/95 backdrop-blur-xl shadow-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef146b] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
            Interactive 3D Design Sandbox
          </span>
        </div>
        <span className="font-mono text-[11px] text-white/50 hidden sm:inline-block">
          Drag to Orbit · Real-time WebGL
        </span>
      </div>

      {/* 3D Viewport */}
      <div className="relative h-72 sm:h-96 w-full cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />
        <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-white/70 bg-[#050505]/80 px-2.5 py-1 rounded-md border border-white/10 shadow-sm backdrop-blur-sm">
          Click & drag to rotate object
        </div>
      </div>

      {/* Controls Panel */}
      <div className="p-5 border-t border-white/10 bg-[#0c0c14]/90 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Geometry selector */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/50 mb-2 font-semibold">
              3D Shape
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#151522] p-1 rounded-xl border border-white/5">
              {[
                { id: 'torusKnot', label: 'Torus', icon: Sparkles },
                { id: 'cube', label: 'Cube', icon: Box },
                { id: 'prism', label: 'Prism', icon: Gem },
                { id: 'sphere', label: 'Sphere', icon: Disc },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeGeometry === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveGeometry(item.id as GeometryType)}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-xs font-mono transition-all ${
                      active
                        ? 'bg-white text-[#050505] shadow-sm font-bold scale-[1.02]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-3.5 h-3.5 mb-1" />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material selector */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/50 mb-2 font-semibold">
              Material Shading
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#151522] p-1 rounded-xl border border-white/5">
              {[
                { id: 'iridescent', label: 'Glossy' },
                { id: 'glass', label: 'Glass' },
                { id: 'chrome', label: 'Chrome' },
                { id: 'clay', label: 'Matte' },
              ].map((item) => {
                const active = activeMaterial === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMaterial(item.id as MaterialType)}
                    className={`py-2 px-1 rounded-lg text-[10.5px] font-mono text-center transition-all ${
                      active
                        ? 'bg-gradient-brand text-white shadow-sm font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Studio Light & Auto-spin */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-white/50 mb-2 font-semibold">
              Lighting & Spin
            </label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 bg-[#151522] p-1 rounded-xl flex-1 justify-around border border-white/5">
                {[
                  { color: '#7615d9', title: 'Purple' },
                  { color: '#ef146b', title: 'Pink' },
                  { color: '#3e6fd8', title: 'Blue' },
                  { color: '#ffb51c', title: 'Orange' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => setLightColor(item.color)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      lightColor === item.color ? 'scale-125 ring-2 ring-offset-1 ring-white' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: item.color }}
                    title={item.title}
                  />
                ))}
              </div>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2.5 rounded-xl border font-mono text-xs flex items-center gap-1.5 transition-all ${
                  autoRotate
                    ? 'bg-[#7615d9] text-white border-[#7615d9]'
                    : 'bg-white/5 text-white border-white/15 hover:border-white/40'
                }`}
                title="Toggle Auto Rotate"
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
