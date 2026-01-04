import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import PropTypes from "prop-types";

const AnimatedSphere = ({ mouseX, mouseY }) => {
  const meshRef = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Auto rotation
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = time * 0.05;

    // Mouse interaction (gentle tilt)
    const targetX = mouseY.get ? mouseY.get() * 0.002 : 0;
    const targetY = mouseX.get ? mouseX.get() * 0.002 : 0;

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.1;
  });

  return (
    <Icosahedron args={[1, 4]} scale={5.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#00ffff"
        attach="material"
        distort={0}
        speed={2}
        roughness={0}
        metalness={0.4}
        wireframe={true}
        transparent={true}
        opacity={0.65}
      />
    </Icosahedron>
  );
};

AnimatedSphere.propTypes = {
  mouseX: PropTypes.object,
  mouseY: PropTypes.object,
};

const Hero3D = ({ mouseX, mouseY }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
};

Hero3D.propTypes = {
  mouseX: PropTypes.object,
  mouseY: PropTypes.object,
};

export default Hero3D;
