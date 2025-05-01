"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AwardIcon, ExternalLinkIcon } from "lucide-react"

export default function CertificatesSection() {
  const certificates = [
    {
      title: "HTML, CSS, JavaScript Essential Training",
      issuer: "LinkedIn Learning",
      date: "2022",
      category: "Web Development",
      link: "https://drive.google.com/file/d/190Su19fuphhp4Fk5Ccwv_rTm52Ij2MCL/view",
    },
    {
      title: "Advanced Program in Full Stack Software Engineering",
      issuer: "NIIT",
      date: "2021",
      category: "Full Stack Development",
      link: "https://drive.google.com/file/d/1Tnb6WdEUFEYd4dfGxR44a_X9-u56VMYN/view",
    },
    {
      title: "JPMorgan Chase Software Engineering Virtual Experience",
      issuer: "JPMorgan Chase",
      date: "2021",
      category: "Software Engineering",
      link: "https://drive.google.com/file/d/1XvueQLHaHsXNCbX6yeFcDQQAdiv2fL-s/view",
    },
    {
      title: "Accenture Virtual Experience Developer Program",
      issuer: "Accenture",
      date: "2021",
      category: "Development",
      link: "https://drive.google.com/file/d/1YSb7lgkLMg37-FN4MBlAqewyi9AY-ZqD/view",
    },
    {
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      date: "2021",
      category: "Web Design",
      link: "https://drive.google.com/file/d/1mSfvivng1BItId6EVWkifoKE4Cfcgc0B/view",
    },
    {
      title: "Goldman Sachs Engineering Virtual Experience",
      issuer: "Goldman Sachs",
      date: "2021",
      category: "Engineering",
      link: "https://drive.google.com/file/d/14roFXbA0NGsYbOKxpcD1EpSHbLbq9bny/view",
    },
  ]

  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Certificates & Achievements</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional certifications and achievements that showcase my continuous learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                      <AwardIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">{cert.title}</h3>
                      <p className="text-sm text-gray-500">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-4">
                    {cert.category}
                  </Badge>
                  
                  <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center text-sm"
                    >
                      View Certificate
                      <ExternalLinkIcon className="h-3 w-3 ml-1" />
                    </a>
  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
