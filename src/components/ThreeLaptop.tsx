
import LaptopDisplay from './three/LaptopDisplay';

interface ThreeLaptopProps {
  className?: string;
  containerHeight?: number;
  rotationSpeed?: number;
}

// This component is kept for backward compatibility
const ThreeLaptop = (props: ThreeLaptopProps) => {
  return <LaptopDisplay {...props} />;
};

export default ThreeLaptop;
