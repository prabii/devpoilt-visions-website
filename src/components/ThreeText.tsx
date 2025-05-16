
import Text3D from './three/Text3D';

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

// This component is kept for backward compatibility
const ThreeText = (props: ThreeTextProps) => {
  return <Text3D {...props} />;
};

export default ThreeText;
