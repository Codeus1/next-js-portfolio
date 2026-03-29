"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { Delaunay } from "d3-delaunay"

// ── Seeded PRNG (Linear Congruential Generator) ──
function createRandom(seed: number) {
  let current = seed
  return () => {
    current = (current * 1664525 + 1013904223) % 4294967296
    return current / 4294967296
  }
}

// ── Polygon inset (shrink toward centroid) ──
function insetPolygon(polygon: number[][], gap: number): number[][] {
  if (!polygon || polygon.length < 3) return polygon
  let cx = 0
  let cy = 0
  const len = polygon.length - 1
  for (let i = 0; i < len; i++) {
    cx += polygon[i][0]
    cy += polygon[i][1]
  }
  cx /= len
  cy /= len
  return polygon.map((p) => {
    const dx = p[0] - cx
    const dy = p[1] - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist <= gap) return [cx, cy]
    const ratio = (dist - gap) / dist
    return [cx + dx * ratio, cy + dy * ratio]
  })
}

// ── Rounded polygon SVG path ──
function getRoundedPolygonPath(polygon: number[][], roundness: number): string {
  if (!polygon || polygon.length < 3) return ""
  const points = polygon.slice(0, polygon.length - 1)
  if (roundness === 0) {
    return (
      `M ${points[0][0]},${points[0][1]} ` +
      points
        .slice(1)
        .map((p) => `L ${p[0]},${p[1]}`)
        .join(" ") +
      " Z"
    )
  }
  const factor = Math.min(Math.max(roundness, 0), 1) * 0.5
  let d = ""
  const len = points.length
  for (let i = 0; i < len; i++) {
    const curr = points[i]
    const next = points[(i + 1) % len]
    const prev = points[(i - 1 + len) % len]
    const v1x = curr[0] - prev[0]
    const v1y = curr[1] - prev[1]
    const v2x = next[0] - curr[0]
    const v2y = next[1] - curr[1]
    d +=
      (i === 0 ? "M " : " L ") +
      `${curr[0] - v1x * factor},${curr[1] - v1y * factor} ` +
      `Q ${curr[0]},${curr[1]} ${curr[0] + v2x * factor},${curr[1] + v2y * factor}`
  }
  return d + " Z"
}

interface VoronoiPatternProps {
  count?: number
  colorA?: string
  colorB?: string
  speed?: number
  lineWidth?: number
  lineColor?: string
  fill?: boolean
  roundness?: number
  gap?: number
  seed?: number
  className?: string
}

export function VoronoiPattern({
  count = 20,
  colorA = "oklch(0.45 0.15 264 / 0.35)", /* color salmon */ 
  colorB = "oklch(0.65 0.2 310 / 0.35)", /* violeta claro */
  speed = 0.1,
  lineWidth = 1,
  lineColor = "oklch(0.45 0.15 264 / 0.15)",
  fill = true,
  roundness = 0.6,
  gap = 4,
  seed = 1,
  className,
}: VoronoiPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activeWidth = size?.width ?? 0
  const activeHeight = size?.height ?? 0

  // Deterministic initial points
  const initialPoints = useMemo(() => {
    const random = createRandom(seed)
    return Array.from({ length: count }, () => ({
      x: random(),
      y: random(),
      vx: (random() - 0.5) * 2,
      vy: (random() - 0.5) * 2,
    }))
  }, [count, seed])

  const [currentPoints, setCurrentPoints] = useState(initialPoints)

  // Sync when initialPoints change
  useEffect(() => {
    setCurrentPoints(initialPoints)
  }, [initialPoints])

  // Animation loop
  useEffect(() => {
    if (speed === 0) {
      setCurrentPoints(initialPoints)
      return
    }

    // Reduce motion check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) {
      setCurrentPoints(initialPoints)
      return
    }

    let raf: number
    const loop = () => {
      const time = performance.now() / 1e3
      const timeFactor = speed * 0.2

      const wrap = (val: number) => {
        const cycle = val % 2
        const positiveCycle = cycle < 0 ? cycle + 2 : cycle
        return positiveCycle > 1 ? 2 - positiveCycle : positiveCycle
      }

      const nextPoints = initialPoints.map((p) => ({
        x: wrap(p.x + p.vx * time * timeFactor),
        y: wrap(p.y + p.vy * time * timeFactor),
        vx: 0,
        vy: 0,
      }))

      setCurrentPoints(nextPoints)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [speed, initialPoints])

  // Compute Voronoi paths
  const paths = useMemo(() => {
    if (activeWidth <= 1 || activeHeight <= 1) return []

    const pixelPoints: number[] = []
    for (const p of currentPoints) {
      pixelPoints.push(p.x * activeWidth, p.y * activeHeight)
    }
    if (pixelPoints.length < 4) return []

    try {
      const delaunay = new Delaunay(pixelPoints)
      const voronoi = delaunay.voronoi([0, 0, activeWidth, activeHeight])
      const result: string[] = []

      for (let i = 0; i < currentPoints.length; i++) {
        const polygon = voronoi.cellPolygon(i)
        if (polygon) {
          const poly = gap > 0 ? insetPolygon(polygon, gap) : polygon
          result.push(getRoundedPolygonPath(poly, roundness))
        }
      }
      return result
    } catch {
      return []
    }
  }, [currentPoints, activeWidth, activeHeight, gap, roundness])

  const renderPaths = useCallback(
    (d: string, i: number) => (
      <path
        key={i}
        d={d}
        fill={fill ? (i % 2 === 0 ? colorA : colorB) : "none"}
        stroke={lineColor}
        strokeWidth={lineWidth}
      />
    ),
    [fill, colorA, colorB, lineColor, lineWidth],
  )

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      aria-hidden="true"
    >
      {activeWidth > 0 && activeHeight > 0 && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${activeWidth} ${activeHeight}`}
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <title>Voronoi pattern</title>
          {paths.map(renderPaths)}
        </svg>
      )}
    </div>
  )
}
