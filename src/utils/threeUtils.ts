
import * as THREE from 'three';

// Shared utilities for Three.js components

// Handle window resize for Three.js scenes
export const handleResize = (
  camera: THREE.PerspectiveCamera, 
  renderer: THREE.WebGLRenderer,
  containerWidth: number,
  containerHeight: number
) => {
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(containerWidth, containerHeight);
};

// Setup basic scene with lighting
export const setupScene = () => {
  const scene = new THREE.Scene();
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Add point light for better highlights
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 0, 5);
  scene.add(pointLight);
  
  return scene;
};

// Setup renderer with common settings
export const setupRenderer = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  
  return renderer;
};

// Create interaction handlers for mouse/touch control of 3D objects
export const createInteractionHandlers = (
  object: THREE.Object3D | null,
  setIsDragging: (isDragging: boolean) => void,
  setPreviousPosition: (position: { x: number, y: number }) => void
) => {
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setPreviousPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!object) return;
    
    const deltaMove = {
      x: e.clientX - previousPosition.x,
      y: e.clientY - previousPosition.y
    };

    object.rotation.y += deltaMove.x * 0.005;
    object.rotation.x += deltaMove.y * 0.005;

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
    if (!object || e.touches.length !== 1) return;
    
    const deltaMove = {
      x: e.touches[0].clientX - previousPosition.x,
      y: e.touches[0].clientY - previousPosition.y
    };

    object.rotation.y += deltaMove.x * 0.005;
    object.rotation.x += deltaMove.y * 0.005;

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
  
  let previousPosition = { x: 0, y: 0 };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
