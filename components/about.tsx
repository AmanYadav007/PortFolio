"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FileTextIcon } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29.jpg-KUIg21BkuysADjQcyE2uSqJZyOcsyD.jpeg"
                alt="Aman Yadav"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full flex justify-center">
              <Button className="mt-4 flex items-center gap-2" size="lg" asChild>
                <a href="https://drive.google.com/file/d/1FMH9Z9BWDcpIAwlMBEXT5VSXNWNqqbdO/view" download="Aman_Yadav_Resume.pdf">
                  <DownloadIcon className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">JavaScript Engineer & Web Solutions Expert</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Passionate Web Developer with 4+ years of experience crafting high-performance, responsive, and scalable
              applications. Skilled in React.js, JavaScript, HTML5, CSS3, and Chrome Extension Development, I specialize
              in building intuitive UI/UX, automation tools, and digital marketing solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At Accenture, I engineered modern web experiences using React, AEM, and API integrations, ensuring
              seamless functionality across devices. My expertise also includes HTML5 banner ads, email development, and
              PDF/image processing tools, enhancing digital workflows.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Beyond work, I build productivity-focused Chrome extensions and open-source projects like Quick Side Tool,
              a robust PDF manipulation app. Constantly exploring new technologies, I thrive on solving complex problems
              and optimizing user experiences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">amanry3000@gmail.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <a
                      href="https://www.linkedin.com/in/aman-yadav-9144021a3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Aman Yadav
                    </a>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Mumbai, Maharashtra, India</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">GitHub</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <a
                      href="https://github.com/AmanYadav007"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      AmanYadav007
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
