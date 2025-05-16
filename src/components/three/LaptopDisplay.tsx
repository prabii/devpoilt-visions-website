
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupScene, setupRenderer, handleResize } from '@/utils/threeUtils';

interface LaptopDisplayProps {
  className?: string;
  containerHeight?: number;
  rotationSpeed?: number;
  displayText?: string;
  displayGradientStart?: string;
  displayGradientEnd?: string;
}

const LaptopDisplay = ({
  className = "",
  containerHeight = 300,
  rotationSpeed = 0.005,
  displayText = "Devpoilt",
  displayGradientStart = "#7c3aed", 
  displayGradientEnd = "#3b82f6"
}: LaptopDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopGroupRef = useRef<THREE.Group | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  
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
    containerRef.current.appendChild(renderer.domElement);
    
    // Create laptop model
    const laptopGroup = createLaptopModel(displayText, displayGradientStart, displayGradientEnd);
    scene.add(laptopGroup);
    laptopGroupRef.current = laptopGroup;
    
    // Position camera
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Setup event handlers
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setPreviousPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !laptopGroupRef.current) return;
      
      const deltaX = e.clientX - previousPosition.x;
      const deltaY = e.clientY - previousPosition.y;
      
      laptopGroupRef.current.rotation.y += deltaX * 0.01;
      laptopGroupRef.current.rotation.x += deltaY * 0.01;
      
      setPreviousPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setPreviousPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !laptopGroupRef.current || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - previousPosition.x;
      const deltaY = e.touches[0].clientY - previousPosition.y;
      
      laptopGroupRef.current.rotation.y += deltaX * 0.01;
      laptopGroupRef.current.rotation.x += deltaY * 0.01;
      
      setPreviousPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    // Add event listeners
    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
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
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Auto-rotate when not being dragged
      if (!isDragging && laptopGroupRef.current) {
        laptopGroupRef.current.rotation.y += rotationSpeed;
      }
      
      renderer.render(scene, camera);
      return animationId;
    };
    
    const animationId = animate();
    
    // Cleanup
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resizeHandler);
      
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, [containerHeight, rotationSpeed, displayText, displayGradientStart, displayGradientEnd, isDragging]);

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: containerHeight }} />;
};

// Helper function to create laptop model
const createLaptopModel = (
  displayText: string,
  gradientStart: string,
  gradientEnd: string
) => {
  // Create a group to hold the laptop parts
  const laptopGroup = new THREE.Group();
  
  // Laptop base (bottom part)
  const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
  const baseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x333333,
    shininess: 100,
    specular: 0x666666
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  laptopGroup.add(base);

  // Laptop screen (top part)
  const screenGeometry = new THREE.BoxGeometry(3, 0.1, 2);
  const screenMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x333333,
    shininess: 100,
    specular: 0x666666
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 0.8, -0.9);
  screen.rotation.x = -Math.PI / 4; // Tilt the screen
  laptopGroup.add(screen);

  // Screen display
  const displayGeometry = new THREE.PlaneGeometry(2.8, 1.8);
  
  // Create canvas for screen texture
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  
  if (context) {
    // Fill with gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, gradientStart); 
    gradient.addColorStop(1, gradientEnd);
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some "code" or patterns to simulate a website
    context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 10; i++) {
      context.fillRect(20, 50 + (i * 30), Math.random() * 300 + 100, 10);
    }
    
    // Add logo text
    context.fillStyle = 'white';
    context.font = 'bold 40px Arial';
    context.textAlign = 'center';
    context.fillText(displayText, canvas.width / 2, 40);
  }
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  const displayMaterial = new THREE.MeshBasicMaterial({ 
    map: texture,
    side: THREE.DoubleSide
  });
  
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 0.81, -0.9);
  display.rotation.x = -Math.PI / 4; // Match screen tilt
  laptopGroup.add(display);

  // Keyboard
  const keyboardGeometry = new THREE.PlaneGeometry(2.8, 1.6);
  const keyboardMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x222222,
    shininess: 30
  });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.position.set(0, 0.11, 0);
  keyboard.rotation.x = -Math.PI / 2;
  laptopGroup.add(keyboard);

  // Add keyboard keys (simplified)
  const keySize = 0.2;
  const keyGeometry = new THREE.BoxGeometry(keySize, 0.05, keySize);
  const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
  
  for (let x = -6; x <= 6; x++) {
    for (let z = -3; z <= 3; z++) {
      if (Math.random() > 0.2) { // Create some gaps for realism
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(x * (keySize * 1.1), 0.15, z * (keySize * 1.1));
        base.add(key);
      }
    }
  }
  
  return laptopGroup;
};

export default LaptopDisplay;
