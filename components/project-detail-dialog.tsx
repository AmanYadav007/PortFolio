import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon, ShoppingBagIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProjectDetailDialogProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    demoLink: string
    githubLink: string
    details: string
    features: string[]
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectDetailDialog({ project, open, onOpenChange }: ProjectDetailDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">{project.description}</DialogDescription>
        </DialogHeader>
        <div className="relative h-48 w-full rounded-md overflow-hidden my-4">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <p>{project.details}</p>
          <div>
            <h4 className="font-medium mb-2">Key Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {project.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" asChild>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button asChild>
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                {project.demoLink.includes("chromewebstore") ? (
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
  )
}
