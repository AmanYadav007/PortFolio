"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Code2Icon,
  LayoutIcon,
  DatabaseIcon,
  BrainIcon,
  SearchIcon,
  PuzzleIcon,
  GlobeIcon,
  SettingsIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      name: "Frontend Development",
      icon: <LayoutIcon className="h-6 w-6" />,
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "React.js", level: 90 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Three.js", level: 85 },
      ],
    },
    {
      name: "Backend & Tools",
      icon: <DatabaseIcon className="h-6 w-6" />,
      skills: [
        { name: "MySQL/PostgreSQL", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "Git/GitHub", level: 85 },
        { name: "JIRA", level: 80 },
      ],
    },
    {
      name: "Specialized Skills",
      icon: <BrainIcon className="h-6 w-6" />,
      skills: [
        { name: "HTML5 Ad Development", level: 90 },
        { name: "Chrome Extension Development", level: 85 },
        { name: "Adobe Experience Manager (AEM)", level: 80 },
        { name: "GSAP Animations", level: 85 },
      ],
    },
    {
      name: "Optimization & Performance",
      icon: <SearchIcon className="h-6 w-6" />,
      skills: [
        { name: "Image Optimization", level: 90 },
        { name: "Search Engine Optimization (SEO)", level: 85 },
        { name: "Performance Optimization", level: 85 },
        { name: "Responsive Design", level: 90 },
      ],
    },
  ]

  const technicalSkills = [
    { name: "JavaScript", icon: <Code2Icon className="h-5 w-5" /> },
    { name: "React.js", icon: <GlobeIcon className="h-5 w-5" /> },
    { name: "HTML5", icon: <LayoutIcon className="h-5 w-5" /> },
    { name: "CSS3", icon: <PaletteIcon className="h-5 w-5" /> },
    { name: "Three.js", icon: <PuzzleIcon className="h-5 w-5" /> },
    { name: "MySQL", icon: <DatabaseIcon className="h-5 w-5" /> },
    { name: "PostgreSQL", icon: <DatabaseIcon className="h-5 w-5" /> },
    { name: "REST APIs", icon: <SettingsIcon className="h-5 w-5" /> },
    { name: "Git/GitHub", icon: <TerminalIcon className="h-5 w-5" /> },
    { name: "GSAP", icon: <PuzzleIcon className="h-5 w-5" /> },
    { name: "AEM", icon: <LayoutIcon className="h-5 w-5" /> },
    { name: "SEO", icon: <SearchIcon className="h-5 w-5" /> },
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold">Technical Skills</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Technologies and tools I work with</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {technicalSkills.map((skill, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">{skill.icon}</div>
                <span className="text-sm font-medium">{skill.name}</span>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
