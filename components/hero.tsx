"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Utility to generate random numbers
const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  // Detect theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener("change", handleChange)

    const handleCustomThemeChange = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    }
    window.addEventListener("themeChange", handleCustomThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("themeChange", handleCustomThemeChange)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    // Set initial size based on container dimensions
    const updateRendererSize = () => {
      const container = containerRef.current!
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    updateRendererSize()

    // Nebula background with swirling effect
    const nebulaGeometry = new THREE.SphereGeometry(20, 64, 64)
    const nebulaShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(theme === "dark" ? 0x1e3a8a : 0x0d1f4d) }, // Deep blue
        uColor2: { value: new THREE.Color(theme === "dark" ? 0x8b5cf6 : 0x4c1d95) }, // Purple accent
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vPosition;
        void main() {
          float angle = atan(vPosition.y, vPosition.x);
          float radius = length(vPosition.xy);
          float swirl = sin(radius * 5.0 - uTime * 0.5 + angle * 3.0) * 0.5 + 0.5;
          float noise = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
          float t = sin(uTime * 0.3 + noise + swirl) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, t);
          gl_FragColor = vec4(color, 0.6);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
    })
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaShaderMaterial)
    scene.add(nebula)

    // Starfield
    const starCount = 500
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starTwinkle = new Float32Array(starCount)

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = randomInRange(-15, 15)
      starPositions[i + 1] = randomInRange(-15, 15)
      starPositions[i + 2] = randomInRange(-15, 15)
      starSizes[i / 3] = randomInRange(0.02, 0.1)
      starTwinkle[i / 3] = randomInRange(0, Math.PI * 2)
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute("twinkle", new THREE.BufferAttribute(starTwinkle, 1))

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute float twinkle;
        varying float vTwinkle;
        void main() {
          vTwinkle = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying float vTwinkle;
        void main() {
          float brightness = sin(uTime + vTwinkle) * 0.5 + 0.5;
          gl_FragColor = vec4(1.0, 1.0, 1.0, brightness * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Particle system with glowing trails
    const particleCount = 1500
    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const trailLengths = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = randomInRange(-8, 8)
      positions[i + 1] = randomInRange(-8, 8)
      positions[i + 2] = randomInRange(-8, 8)
      colors[i] = theme === "dark" ? 0.6 : 0.4
      colors[i + 1] = theme === "dark" ? 0.8 : 0.6
      colors[i + 2] = theme === "dark" ? 1.0 : 0.8
      velocities[i] = randomInRange(-0.03, 0.03)
      velocities[i + 1] = randomInRange(-0.03, 0.03)
      velocities[i + 2] = randomInRange(-0.03, 0.03)
      sizes[i / 3] = randomInRange(0.05, 0.2)
      trailLengths[i / 3] = randomInRange(0.1, 0.5)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    particlesGeometry.setAttribute("trailLength", new THREE.BufferAttribute(trailLengths, 1))

    const particlesShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3() },
      },
      vertexShader: `
        attribute float size;
        attribute float trailLength;
        varying vec3 vColor;
        varying float vTrailLength;
        uniform float uTime;
        void main() {
          vColor = color;
          vTrailLength = trailLength;
          vec3 pos = position;
          pos += sin(uTime + position.x) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTrailLength;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float glow = 1.0 - dist / 0.5;
          float trailFade = mix(1.0, 0.2, dist / vTrailLength);
          gl_FragColor = vec4(vColor * glow, trailFade * 0.9);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesShaderMaterial)
    scene.add(particles)

    // Line connections with glow
    const lineMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(theme === "dark" ? 0x60a5fa : 0x2563eb) },
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vPosition;
        void main() {
          gl_FragColor = vec4(uColor, 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
    const linesGroup = new THREE.Group()
    scene.add(linesGroup)

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const mouseSphere = new THREE.Vector3()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === "dark" ? 0.7 : 0.9)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, theme === "dark" ? 1 : 1.2, 10)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    // Camera
    camera.position.z = 5

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Resize handler
    const handleResize = () => {
      updateRendererSize()
    }

    window.addEventListener("resize", handleResize)

    // Update colors when theme changes
    const updateThemeColors = () => {
      nebulaShaderMaterial.uniforms.uColor1.value.set(theme === "dark" ? 0x1e3a8a : 0x0d1f4d)
      nebulaShaderMaterial.uniforms.uColor2.value.set(theme === "dark" ? 0x8b5cf6 : 0x4c1d95)
      const colors = particlesGeometry.attributes.color.array as Float32Array
      for (let i = 0; i < particleCount * 3; i += 3) {
        colors[i] = theme === "dark" ? 0.6 : 0.4
        colors[i + 1] = theme === "dark" ? 0.8 : 0.6
        colors[i + 2] = theme === "dark" ? 1.0 : 0.8
      }
      particlesGeometry.attributes.color.needsUpdate = true
      lineMaterial.uniforms.uColor.value.set(theme === "dark" ? 0x60a5fa : 0x2563eb)
      ambientLight.intensity = theme === "dark" ? 0.7 : 0.9
      pointLight.intensity = theme === "dark" ? 1 : 1.2
    }

    updateThemeColors()

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Update nebula
      nebulaShaderMaterial.uniforms.uTime.value = elapsedTime

      // Update stars
      starMaterial.uniforms.uTime.value = elapsedTime
      const starTwinkle = starGeometry.attributes.twinkle.array as Float32Array
      for (let i = 0; i < starCount; i++) {
        starTwinkle[i] += 0.05
      }
      starGeometry.attributes.twinkle.needsUpdate = true

      // Update particle positions
      const positions = particlesGeometry.attributes.position.array as Float32Array
      const colors = particlesGeometry.attributes.color.array as Float32Array
      const sizes = particlesGeometry.attributes.size.array as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        // Boundary check with smooth bounce
        if (Math.abs(positions[i]) > 8) velocities[i] *= -0.9
        if (Math.abs(positions[i + 1]) > 8) velocities[i + 1] *= -0.9
        if (Math.abs(positions[i + 2]) > 8) velocities[i + 2] *= -0.9

        // Color shifting
        colors[i] = (theme === "dark" ? 0.6 : 0.4) + 0.3 * Math.sin(elapsedTime + positions[i])
        colors[i + 1] = (theme === "dark" ? 0.8 : 0.6) + 0.2 * Math.cos(elapsedTime + positions[i + 1])
        colors[i + 2] = theme === "dark" ? 1.0 : 0.8

        // Size pulsing
        sizes[i / 3] = 0.1 + 0.05 * Math.sin(elapsedTime + positions[i])
      }

      particlesGeometry.attributes.position.needsUpdate = true
      particlesGeometry.attributes.color.needsUpdate = true
      particlesGeometry.attributes.size.needsUpdate = true
      particlesShaderMaterial.uniforms.uTime.value = elapsedTime

      // Update mouse sphere position
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.ray.origin.clone().add(raycaster.ray.direction.multiplyScalar(5))
      mouseSphere.copy(intersects)
      particlesShaderMaterial.uniforms.uMouse.value = mouseSphere

      // Update connections
      linesGroup.children.forEach((child) => linesGroup.remove(child))
      const maxDistance = 0.7
      for (let i = 0; i < particleCount; i++) {
        const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
        // Gravitational mouse interaction
        const distanceToMouse = p1.distanceTo(mouseSphere)
        if (distanceToMouse < 1.0) {
          const pullFactor = 0.03 / (distanceToMouse + 0.01)
          const direction = mouseSphere.clone().sub(p1).normalize()
          velocities[i * 3] += direction.x * pullFactor
          velocities[i * 3 + 1] += direction.y * pullFactor
          velocities[i * 3 + 2] += direction.z * pullFactor
        }

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])
          const distance = p1.distanceTo(p2)
          if (distance < maxDistance) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([p1, p2])
            const line = new THREE.Line(lineGeometry, lineMaterial)
            linesGroup.add(line)
          }
        }
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Update colors on theme change
    const handleThemeChange = () => {
      updateThemeColors()
    }

    window.addEventListener("themeChange", handleThemeChange)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("themeChange", handleThemeChange)
      scene.remove(particles, linesGroup, nebula, stars)
      particlesGeometry.dispose()
      particlesShaderMaterial.dispose()
      lineMaterial.dispose()
      nebulaGeometry.dispose()
      nebulaShaderMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      renderer.dispose()
    }
  }, [theme])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden w-full">
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Hi, I'm <span className="text-primary">Aman Yadav</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 text-gray-700 dark:text-gray-300">
            JavaScript Engineer | Web Solutions Expert
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg max-w-full sm:max-w-xl lg:max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
            Crafting high-performance, responsive, and scalable web applications with 4+ years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="sm" className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button size="sm" className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base" variant="outline" asChild>
              <a href="#experience">View Experience</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" />
        </a>
      </div>
    </section>
  )
}