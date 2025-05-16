
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupScene, setupRenderer, handleResize } from '@/utils/threeUtils';

interface Text3DBackgroundProps {
  text?: string;
  color?: string;
  secondaryColor?: string;
  className?: string;
  containerHeight?: number;
  speed?: number;
}

const Text3DBackground = ({
  text = "Devpoilt",
  color = "#7c3aed",
  secondaryColor = "#3b82f6",
  className = "",
  containerHeight = 300,
  speed = 0.002
}: Text3DBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene, camera, and renderer
    const scene = setupScene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerHeight, 
      0.1, 
      1000
    );
    const renderer = setupRenderer(containerRef.current.clientWidth, containerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Create particles system
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    
    const colorObj1 = new THREE.Color(color);
    const colorObj2 = new THREE.Color(secondaryColor);
    
    for (let i = 0; i < particleCount; i++) {
      // Create a cloud-like formation
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 3 - 3; // Push particles behind text
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Randomize particle sizes
      sizes[i] = Math.random() * 0.1 + 0.05;
      
      // Interpolate between two colors
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().lerpColors(colorObj1, colorObj2, mixRatio);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle material with custom shader
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create floating text plane
    const textPlane = createFloatingElements(text, color, secondaryColor);
    scene.add(textPlane);
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    const resizeHandler = () => {
      if (!containerRef.current) return;
      handleResize(
        camera, 
        renderer,
        containerRef.current.clientWidth,
        containerHeight
      );
    };
    
    window.addEventListener('resize', resizeHandler);
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      frame++;
      
      // Animate particle system
      particleSystem.rotation.y = frame * speed * 0.1;
      
      // Wave-like motion for particles
      const positions = particles.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const time = frame * 0.01;
        const offset = i * 0.01;
        
        // Add subtle movement to particles
        positions[ix + 1] += Math.sin(time + offset) * 0.003;
        positions[ix] += Math.cos(time + offset) * 0.002;
      }
      particles.attributes.position.needsUpdate = true;
      
      // Animate text plane
      if (textPlane) {
        textPlane.rotation.y = Math.sin(frame * 0.002) * 0.1;
        textPlane.rotation.x = Math.sin(frame * 0.001) * 0.05;
      }
      
      renderer.render(scene, camera);
      return animationId;
    };
    
    const animationId = animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', resizeHandler);
      
      // Clean up THREE.js resources
      particles.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [text, color, secondaryColor, containerHeight, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 -z-10 ${className}`} 
      style={{ height: containerHeight }} 
    />
  );
};

// Helper function to create floating elements
const createFloatingElements = (text: string, primaryColor: string, secondaryColor: string) => {
  // Create a group for our elements
  const group = new THREE.Group();
  
  // Create several floating geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.OctahedronGeometry(0.2, 0),
    new THREE.TetrahedronGeometry(0.3, 0),
    new THREE.IcosahedronGeometry(0.2, 0),
    new THREE.DodecahedronGeometry(0.2, 0),
    new THREE.TorusKnotGeometry(0.2, 0.05, 64, 8)
  ];
  
  for (let i = 0; i < 15; i++) {
    const geomIndex = i % geometries.length;
    const geometry = geometries[geomIndex].clone();
    
    // Create gradient material
    const color = i % 2 === 0 ? primaryColor : secondaryColor;
    const material = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.7,
      shininess: 30
    });
    
    const shape = new THREE.Mesh(geometry, material);
    
    // Position shapes in a scattered pattern
    shape.position.x = (Math.random() - 0.5) * 6;
    shape.position.y = (Math.random() - 0.5) * 3;
    shape.position.z = (Math.random() - 0.5) * 2 - 2;
    
    // Random initial rotation
    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;
    
    // Store initial position for animation
    shape.userData = {
      initialX: shape.position.x,
      initialY: shape.position.y,
      initialZ: shape.position.z,
      xFactor: Math.random() * 0.02 - 0.01,
      yFactor: Math.random() * 0.02 - 0.01,
      zFactor: Math.random() * 0.01 - 0.005,
      rotationSpeed: Math.random() * 0.01 + 0.002
    };
    
    shapes.push(shape);
    group.add(shape);
  }
  
  // Animate shapes
  const animateElements = () => {
    const time = Date.now() * 0.001;
    
    shapes.forEach((shape, i) => {
      const data = shape.userData;
      
      // Floating motion
      shape.position.x = data.initialX + Math.sin(time * (0.5 + data.xFactor)) * 0.3;
      shape.position.y = data.initialY + Math.cos(time * (0.5 + data.yFactor)) * 0.3;
      shape.position.z = data.initialZ + Math.sin(time * (0.5 + data.zFactor)) * 0.2;
      
      // Rotation
      shape.rotation.x += data.rotationSpeed;
      shape.rotation.y += data.rotationSpeed * 0.8;
    });
  };
  
  // Start animation loop
  const animate = () => {
    animateElements();
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return group;
};

export default Text3DBackground;
