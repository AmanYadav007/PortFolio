"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon, InfoIcon, ShoppingBagIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "Quick Side Tool",
      description: "A React-based PDF manipulation tool for large documents",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quicksidetool-MCii9VXckdYoyLQxDZWmRMdxxGSF0V.png",
      tags: ["React", "JavaScript", "Tailwind"],
      demoLink: "https://chromewebstore.google.com/detail/quick-side-tool/ednlokciemgblchidkhbhhndphgjkoip",
      githubLink: "https://github.com/AmanYadav007/QuickSideTool",
      details:
        "Quick Side Tool is a powerful PDF manipulation tool designed to handle large documents (500+ pages) efficiently. It provides a user-friendly interface for various PDF operations, enhancing productivity for users who work with PDF documents regularly.",
      features: [
        "Built with React for a responsive and interactive UI",
        "Implemented chunked processing for handling large documents",
        "Drag-and-drop functionality for easy file uploads",
        "Real-time previews of PDF documents",
        "Optimized for performance with large files",
      ],
    },
    {
      id: 2,
      title: "Image Resizer",
      description: "A browser-based image resizer with real-time previews",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-resize-Cytsxx0GXLg239AhZSCuhr63ggI8ye.png",
      tags: ["JavaScript", "HTML5", "CSS3"],
      demoLink: "https://chromewebstore.google.com/detail/image-resizer/bmooadknflpjeaagpaaclbcgdpgglagn",
      githubLink: "https://github.com/AmanYadav007/image-resizer-v1",
      details:
        "Image Resizer is a browser-based tool that allows users to quickly and easily resize images without leaving their browser. With an intuitive interface and real-time preview functionality, it streamlines the image resizing process for users of all technical levels.",
      features: [
        "Drag-and-drop interface for easy image uploads",
        "Real-time previews of resized images",
        "Multiple output format options",
        "Batch processing capabilities",
        "Trusted by over 300+ users",
      ],
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in web development, browser
            extensions, and digital tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                    <InfoIcon className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                        {project.demoLink.includes("chromewebstore") ? (
                          <ShoppingBagIcon className="h-4 w-4" />
                        ) : (
                          <ExternalLinkIcon className="h-4 w-4" />
                        )}
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <div className="relative h-64 w-full rounded-md overflow-hidden my-4">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-4">
                <p>{selectedProject.details}</p>
                <div>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" asChild>
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                      {selectedProject.demoLink.includes("chromewebstore") ? (
                        <>
                          <ShoppingBagIcon className="h-4 w-4 mr-2" />
                          Chrome Store
                        </>
                      ) : (
                        <>
                          <ExternalLinkIcon className="h-4 w-4 mr-2" />
                          Live Demo
                        </>
                      )}
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
