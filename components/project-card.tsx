"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon, InfoIcon, ShoppingBagIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    demoLink: string
    githubLink: string
  }
  index: number
  onDetailsClick: () => void
}

export default function ProjectCard({ project, index, onDetailsClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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
          <Button variant="outline" size="sm" onClick={onDetailsClick}>
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
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                <GithubIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
