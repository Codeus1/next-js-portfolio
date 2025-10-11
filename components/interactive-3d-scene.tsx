"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from "@react-three/drei"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Palette, RotateCw, Shapes } from "lucide-react"

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
        return (
          <Box args={[1.5, 1.5, 1.5]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Box>
        )
      case "torus":
        return (
          <Torus args={[1, 0.4, 32, 100]}>
            <MeshDistortMaterial color={color} speed={2} distort={distort} radius={1} />
          </Torus>
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
  const [distort, setDistort] = useState(0.4)
  const [showControls, setShowControls] = useState(true)

  const shapes = ["sphere", "box", "torus"]
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
        <AnimatedShape shape={shape} color={color} distort={distort} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Interactive Controls */}
      <Card className="absolute bottom-8 left-8 p-4 space-y-4 bg-card/80 backdrop-blur-lg border-border/50 hidden md:block rounded-4xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Controles 3D</p>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowControls(!showControls)}>
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        {showControls && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Forma</label>
                <Button variant="outline" size="sm" onClick={cycleShape} className="gap-2 bg-transparent">
                  <Shapes className="w-3 h-3" />
                  {shape}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Color</label>
                <Button variant="outline" size="sm" onClick={cycleColor} className="gap-2 bg-transparent">
                  <Palette className="w-3 h-3" />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Distorsión: {distort.toFixed(2)}</label>
              <Slider
                value={[distort]}
                onValueChange={(value) => setDistort(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Arrastra para rotar • Experimenta con los controles
            </p>
          </>
        )}
      </Card>
    </>
  )
}
