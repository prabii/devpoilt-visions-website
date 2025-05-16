
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeLaptopProps {
  className?: string;
  containerHeight?: number;
  rotationSpeed?: number;
}

const ThreeLaptop = ({
  className = "",
  containerHeight = 300,
  rotationSpeed = 0.005
}: ThreeLaptopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Laptop base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100,
      specular: 0x666666
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);

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
    scene.add(screen);

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
      gradient.addColorStop(0, '#7c3aed'); // Purple (primary color)
      gradient.addColorStop(1, '#3b82f6'); // Blue
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some "code" or patterns to simulate a website
      context.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 10; i++) {
        context.fillRect(20, 50 + (i * 30), Math.random() * 300 + 100, 10);
      }
      
      // Add Devpoilt logo text
      context.fillStyle = 'white';
      context.font = 'bold 40px Arial';
      context.textAlign = 'center';
      context.fillText('Devpoilt', canvas.width / 2, 40);
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
    scene.add(display);

    // Keyboard
    const keyboardGeometry = new THREE.PlaneGeometry(2.8, 1.6);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x222222,
      shininess: 30
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.11, 0);
    keyboard.rotation.x = -Math.PI / 2;
    scene.add(keyboard);

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
    
    // Position camera and group
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Make the whole laptop a group for easier manipulation
    const laptopGroup = new THREE.Group();
    laptopGroup.add(base);
    laptopGroup.add(screen);
    laptopGroup.add(display);
    scene.add(laptopGroup);
    
    // Animation and interaction
    let isDragging = false;
    let previousTouch = { x: 0, y: 0 };
    let previousMouse = { x: 0, y: 0 };
    
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - previousMouse.x;
      const deltaY = e.clientY - previousMouse.y;
      
      laptopGroup.rotation.y += deltaX * 0.01;
      laptopGroup.rotation.x += deltaY * 0.01;
      
      previousMouse = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - previousTouch.x;
      const deltaY = e.touches[0].clientY - previousTouch.y;
      
      laptopGroup.rotation.y += deltaX * 0.01;
      laptopGroup.rotation.x += deltaY * 0.01;
      
      previousTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
    };
    
    // Add event listeners
    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      renderer.setSize(width, containerHeight);
      camera.aspect = width / containerHeight;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotate when not being dragged
      if (!isDragging) {
        laptopGroup.rotation.y += rotationSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [containerHeight, rotationSpeed]);

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: containerHeight }} />;
};

export default ThreeLaptop;
