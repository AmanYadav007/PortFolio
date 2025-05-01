"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react"

export default function Experience() {
  const workExperience = [
    {
      title: "JavaScript Support Engineer II",
      company: "Blis",
      period: "March 2025 - Present",
      location: "Mumbai, Maharashtra, India",
      responsibilities: [
        "Campaign Support & Troubleshooting: Assist in the setup, debugging, and optimization of RTB advertising campaigns.",
        "Technical Issue Resolution: Address JIRA tickets, resolve campaign discrepancies, and debug tracking issues.",
        "Ad Tech Integration: Lead certification processes and integrations with third-party ad technologies.",
        "Collaboration with Engineering: Work closely with developers to test new features and troubleshoot platform issues.",
        "Creative & Tracking Support: Assist the creative team in building and hosting ad creatives.",
        "Database & API Management: Work with MySQL/PostgreSQL and handle REST API integrations.",
      ],
      techStack:
        "JavaScript, PHP, HTML, Shell Scripting, MySQL, PostgreSQL, REST APIs, HTTP/HTTPS protocols, Linux/Unix/Windows OS, GitHub/GitLab, JIRA",
    },
    {
      title: "Web Developer",
      company: "Accenture",
      period: "December 2021 - March 2025",
      location: "Mumbai, Maharashtra, India",
      responsibilities: [
        "Leveraged Adobe Experience Manager (AEM) to efficiently publish and maintain web content.",
        "Developed web and mobile experiences using pre-defined component libraries.",
        "Designed and developed engaging HTML5 banner ads for cross-platform marketing campaigns.",
        "Built dynamic and interactive banners using GSAP & animation tools.",
        "Optimized banner performance by analyzing campaign data and implementing design improvements.",
        "Integrated dynamic content & audience targeting into HTML5 banners.",
        "Conducted A/B testing on creative variations, identifying high-performing designs.",
        "Ensured compliance with Google Ads and DoubleClick standards.",
      ],
      techStack: "HTML5, CSS3, JavaScript, GSAP, Adobe Creative Suite, AEM, Workfront",
    },
    {
      title: "Consultant (Data crawler)",
      company: "Merkle",
      period: "December 2020 - July 2021",
      location: "Mumbai, Maharashtra, India",
      responsibilities: [
        "Contributed to the HP LFP project team.",
        "Conducted quality checks on data and extracted/scraped data from ecommerce websites using internal tools.",
        "Collaborated with internal teams to address data quality issues.",
        "Performed data reconciliation and utilized crawling platforms such as Selenium.",
        "Utilized HTML and CSS for scripting purposes and conducted web research for data validation.",
      ],
      techStack: "Excel, Cygwin, MySQL, Crawler, HTML, CSS, Selenium",
    },
  ]

  const education = [
    {
      degree: "Postgraduate Degree, Computer Science",
      institution: "RAMNIRANJAN JHUNJHUNWALA COLLEGE",
      period: "2020 - 2022",
    },
    {
      degree: "Bachelor's Degree, Computer Science",
      institution: "SAKET GYANPEETHS SAKET COLLEGE OF MANAGEMENT, THANE",
      period: "2017 - 2020",
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Experience & Education</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <BriefcaseIcon className="h-6 w-6 mr-2 text-primary" />
              <h3 className="text-2xl font-bold">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between flex-col sm:flex-row">
                        <span>
                          {job.title} at {job.company}
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                          {job.period}
                        </span>
                      </CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 mb-4">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium">Tech Stack:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{job.techStack}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div>
              <div className="flex items-center mb-6">
                <GraduationCapIcon className="h-6 w-6 mr-2 text-primary" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <div className="space-y-4 mb-10">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-bold">{edu.degree}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
