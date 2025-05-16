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
}

const ThreeText = ({
  text,
  size = 0.5,
  height = 0.2,
  color = "#7c3aed",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  className = "",
  containerHeight = 200
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
      
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        specular: 0x111111,
        shininess: 30
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(position[0], position[1], position[2]);
      textMesh.rotation.set(rotation[0], rotation[1], rotation[2]);
      scene.add(textMesh);
      
      // Position camera
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      
      animate();
    });
    
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
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [text, size, height, color, containerHeight, position, rotation]);

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: containerHeight }} />;
};

export default ThreeText;