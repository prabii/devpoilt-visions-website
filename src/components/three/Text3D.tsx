
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { setupScene, setupRenderer, handleResize } from '@/utils/threeUtils';

interface Text3DProps {
  text: string;
  size?: number;
  height?: number;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  className?: string;
  containerHeight?: number;
  interactive?: boolean;
  rotationSpeed?: number;
}

const Text3D = ({
  text,
  size = 0.5,
  height = 0.2,
  color = "#7c3aed",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  className = "",
  containerHeight = 200,
  interactive = true,
  rotationSpeed = 0.01
}: Text3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  const textMeshRef = useRef<THREE.Mesh | null>(null);
  
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
    
    // Create 3D text
    const loader = new THREE.FontLoader();
    
    // Use a remote font
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      const textGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      textGeometry.center();
      
      // Create material with improved appearance
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0x111111,
        shininess: 30,
        reflectivity: 1
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(position[0], position[1], position[2]);
      textMesh.rotation.set(rotation[0], rotation[1], rotation[2]);
      scene.add(textMesh);
      textMeshRef.current = textMesh;
      
      // Position camera
      camera.position.z = 5;
    });

    // Add interactivity for mouse controls if enabled
    if (interactive) {
      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setPreviousPosition({
          x: e.clientX,
          y: e.clientY
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !textMeshRef.current) return;
        
        const deltaMove = {
          x: e.clientX - previousPosition.x,
          y: e.clientY - previousPosition.y
        };

        textMeshRef.current.rotation.y += deltaMove.x * 0.005;
        textMeshRef.current.rotation.x += deltaMove.y * 0.005;

        setPreviousPosition({
          x: e.clientX,
          y: e.clientY
        });
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
        if (!isDragging || !textMeshRef.current || e.touches.length !== 1) return;
        
        const deltaMove = {
          x: e.touches[0].clientX - previousPosition.x,
          y: e.touches[0].clientY - previousPosition.y
        };

        textMeshRef.current.rotation.y += deltaMove.x * 0.005;
        textMeshRef.current.rotation.x += deltaMove.y * 0.005;

        setPreviousPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });

        // Prevent page scrolling when interacting with the 3D object
        e.preventDefault();
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
      };
      
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      containerRef.current.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Only auto-rotate if not being dragged
      if (!isDragging && textMeshRef.current) {
        textMeshRef.current.rotation.y += rotationSpeed;
      }
      
      renderer.render(scene, camera);
      return animationId;
    };
    
    const animationId = animate();
    
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
    
    // Cleanup
    return () => {
      if (interactive && containerRef.current) {
        const newContainer = containerRef.current;
        newContainer.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        newContainer.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
      
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, [text, size, height, color, containerHeight, position, rotation, interactive, rotationSpeed, isDragging]);

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: containerHeight }} />;
};

export default Text3D;
