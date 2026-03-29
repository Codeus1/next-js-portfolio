"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus, Octahedron, Cylinder, TorusKnot, Ring, Tetrahedron, Icosahedron, Dodecahedron } from "@react-three/drei"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Palette, SlidersHorizontal, Shapes } from "lucide-react"

function AnimatedShape({ shape, color, distort }: { shape: string; color: string; distort: number }) {
  const ShapeComponent = () => {
    switch (shape) {
      case "sphere":
        return (
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Sphere>
        )
      case "box":
        // Añadimos segmentos a la caja para que la distorsión se aplique bien en las caras
        return (
          <Box args={[1.5, 1.5, 1.5, 16, 16, 16]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Box>
        )
      case "torus":
        return (
          <Torus args={[1, 0.4, 32, 100]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Torus>
        )
      case "rhombus":
        // Octaedro sin detalle adicional simula un diamante/rombo en 3D
        return (
          <Octahedron args={[1.2, 0]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Octahedron>
        )
      case "trapezium":
        // Cilindro de 4 lados escalado asimétricamente para simular trapecio
        return (
          <Cylinder args={[0.6, 1.2, 1, 4, 32]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Cylinder>
        )
      case "trapezoid":
        // Variación del trapecio
        return (
          <Cylinder args={[0.3, 1.4, 1.2, 4, 32]} scale={[1.2, 1, 0.8]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Cylinder>
        )
      case "ellipse":
        // Esfera achatada para parecerse a un óvalo/elipse
        return (
          <Sphere args={[1, 64, 64]} scale={[1.5, 0.8, 1]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Sphere>
        )
      case "torus-knot":
        return (
          <TorusKnot args={[0.7, 0.25, 100, 16]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </TorusKnot>
        )
      case "ring":
        return (
          <Ring args={[0.5, 1.2, 64]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Ring>
        )
      case "tetrahedron":
        return (
          <Tetrahedron args={[1.4, 0]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Tetrahedron>
        )
      case "icosahedron":
        return (
          <Icosahedron args={[1.2, 0]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Icosahedron>
        )
      case "polyhedron":
        return (
          <Dodecahedron args={[1.2, 0]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Dodecahedron>
        )
      default:
        return null
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <ShapeComponent />
    </Float>
  )
}

export function Interactive3DScene() {
  const [shape, setShape] = useState("sphere")
  const [color, setColor] = useState("#6366f1")
  const [distort, setDistort] = useState(0.6)
  const [showControls, setShowControls] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      setReduceMotion(mq.matches)
      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
      mq.addEventListener?.("change", handler)
      return () => mq.removeEventListener?.("change", handler)
    }
  }, [])

  const shapes = [
    "sphere", "box", "torus", "rhombus", "trapezium", "trapezoid",
    "ellipse", "torus-knot", "ring", "tetrahedron", "icosahedron", "polyhedron"
  ]
  const colors = ["#6366f1", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"]

  const cycleShape = () => {
    const currentIndex = shapes.indexOf(shape)
    const nextIndex = (currentIndex + 1) % shapes.length
    setShape(shapes[nextIndex])
  }

  const cycleColor = () => {
    const currentIndex = colors.indexOf(color)
    const nextIndex = (currentIndex + 1) % colors.length
    setColor(colors[nextIndex])
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        {reduceMotion ? (
          // Render static when reduce motion is enabled
          <group>
            <AnimatedShape shape={shape} color={color} distort={0} />
          </group>
        ) : (
          <>
            <AnimatedShape shape={shape} color={color} distort={distort} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </>
        )}
      </Canvas>

      {/* Interactive Controls */}
      <Card className="absolute bottom-8 left-8 p-4 space-y-4 bg-card/80 backdrop-blur-lg 
      border-border/50 hidden md:block rounded-4xl"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium px-2">3D Controls</p>
          <Button
            className="hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
            variant="ghost"
            size="icon"
            onClick={() => setShowControls(!showControls)}
            aria-pressed={showControls}
            aria-label={showControls ? "Hide controls" : "Show controls"}
            title={showControls ? "Hide controls" : "Show controls"}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {showControls && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Shape</label>
                <Button variant="outline" size="sm" onClick={cycleShape} className="cursor-pointer gap-2 bg-transparent hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary transition-colors">
                  <Shapes className="w-3 h-3" />
                  {shape}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Color</label>
                <Button variant="outline" size="sm" onClick={cycleColor} className="cursor-pointer gap-2 bg-transparent hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary transition-colors">
                  <Palette className="w-3 h-3" />
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label id="distortion-label" className="text-xs text-muted-foreground">Distortion: {distort.toFixed(2)}</label>
              <Slider
                aria-labelledby="distortion-label"
                value={[distort]}
                onValueChange={(value) => setDistort(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Drag to rotate • Experiment with the controls
            </p>
          </>
        )}
      </Card>
    </>
  )
}
