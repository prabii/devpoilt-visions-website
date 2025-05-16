
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  density?: number;
  speed?: number;
  color?: string;
  secondaryColor?: string;
}

const ThreeBackground = ({ 
  className = "", 
  density = 100,
  speed = 0.001,
  color = "#8B5CF6",
  secondaryColor = "#EC4899"
}: ThreeBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = density;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Create a mesh representing company's logo or shape
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
      color: secondaryColor,
      shininess: 100,
      transparent: true,
      opacity: 0.7
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -5);
    scene.add(torus);
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    const mousePosition = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the particles system
      particleSystem.rotation.x += speed;
      particleSystem.rotation.y += speed;
      
      // Move the torus based on mouse position
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      torus.position.x = mousePosition.x * 0.5;
      torus.position.y = mousePosition.y * 0.5;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density, speed, color, secondaryColor]);

  return <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default ThreeBackground;
