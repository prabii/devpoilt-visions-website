
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { setupScene, setupRenderer, handleResize, createInteractionHandlers } from '@/utils/threeUtils';

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
    const loader = new FontLoader();
    
    // Use a remote font
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      const textGeometry = new TextGeometry(text, {
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
    let interactionHandlers: ReturnType<typeof createInteractionHandlers> | undefined;
    
    if (interactive) {
      interactionHandlers = createInteractionHandlers(
        textMeshRef.current,
        setIsDragging,
        setPreviousPosition
      );
      
      containerRef.current.addEventListener('mousedown', interactionHandlers.handleMouseDown);
      document.addEventListener('mousemove', interactionHandlers.handleMouseMove);
      document.addEventListener('mouseup', interactionHandlers.handleMouseUp);
      containerRef.current.addEventListener('touchstart', interactionHandlers.handleTouchStart, { passive: false });
      document.addEventListener('touchmove', interactionHandlers.handleTouchMove, { passive: false });
      document.addEventListener('touchend', interactionHandlers.handleTouchEnd);
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
      if (interactive && containerRef.current && interactionHandlers) {
        const newContainer = containerRef.current;
        newContainer.removeEventListener('mousedown', interactionHandlers.handleMouseDown);
        document.removeEventListener('mousemove', interactionHandlers.handleMouseMove);
        document.removeEventListener('mouseup', interactionHandlers.handleMouseUp);
        newContainer.removeEventListener('touchstart', interactionHandlers.handleTouchStart);
        document.removeEventListener('touchmove', interactionHandlers.handleTouchMove);
        document.removeEventListener('touchend', interactionHandlers.handleTouchEnd);
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
