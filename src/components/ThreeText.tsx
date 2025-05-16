
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeTextProps {
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

const ThreeText = ({
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
}: ThreeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
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

    // Create 3D text
    const loader = new THREE.FontLoader();
    let textMesh: THREE.Mesh;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
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
      
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(position[0], position[1], position[2]);
      textMesh.rotation.set(rotation[0], rotation[1], rotation[2]);
      scene.add(textMesh);
      
      // Position camera
      camera.position.z = 5;

      // Add interactivity for mouse controls if enabled
      if (interactive) {
        containerRef.current?.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        containerRef.current?.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
      }

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Only auto-rotate if not being dragged
        if (!isDragging) {
          textMesh.rotation.y += rotationSpeed;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
    });

    // Mouse and touch event handlers
    function handleMouseDown(e: MouseEvent) {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDragging || !textMesh) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      textMesh.rotation.y += deltaMove.x * 0.005;
      textMesh.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    }

    function handleMouseUp() {
      isDragging = false;
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isDragging || !textMesh || e.touches.length !== 1) return;
      
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      textMesh.rotation.y += deltaMove.x * 0.005;
      textMesh.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      // Prevent page scrolling when interacting with the 3D object
      e.preventDefault();
    }

    function handleTouchEnd() {
      isDragging = false;
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      renderer.setSize(width, containerHeight);
      camera.aspect = width / containerHeight;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (interactive) {
        containerRef.current?.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        containerRef.current?.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      scene.clear();
      renderer.dispose();
    };
  }, [text, size, height, color, containerHeight, position, rotation, interactive, rotationSpeed]);

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: containerHeight }} />;
};

export default ThreeText;
