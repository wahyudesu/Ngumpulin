
import Link from "next/link"
import { ArrowLeft, Users, Target, Lightbulb, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutUs() {
  const stats = [
    { label: "Educators Served", value: "150+", icon: Users },
    { label: "Assignments Processed", value: "10K+", icon: Target },
    { label: "Universities", value: "25+", icon: Award },
    { label: "Countries", value: "5+", icon: Lightbulb },
  ]

  const values = [
    {
      title: "Innovation in Education",
      description: "We believe technology should enhance, not replace, the human element in education.",
      icon: Lightbulb,
    },
    {
      title: "Academic Integrity",
      description: "Supporting educators in maintaining high standards of academic honesty and originality.",
      icon: Award,
    },
    {
      title: "Educator Empowerment",
      description: "Giving teachers more time to focus on what matters most - teaching and mentoring students.",
      icon: Users,
    },
    {
      title: "Continuous Improvement",
      description: "Always evolving our platform based on educator feedback and educational best practices.",
      icon: Target,
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-16">
          {/* Title Section */}
          <div className="text-center space-y-4 mt-10">
            <Badge variant="outline" className="mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Empowering Educators with AI</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ngumpulin was born from a simple observation: educators spend too much time on administrative tasks and
              not enough time doing what they love most - teaching and inspiring students.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, Ngumpulin emerged from the recognition that educators across Indonesia and beyond
                  were struggling with the increasing administrative burden of modern education.
                </p>
                <p>
                  Our team of educators and technologists came together with a shared vision: to create intelligent
                  tools that would give teachers back their most precious resource - time.
                </p>
                <p>
                  Today, we're proud to serve over 150 educators across 25+ universities, helping them streamline
                  assignment collection, detect plagiarism, and provide meaningful feedback to their students.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/Logo.svg?height=400&width=600"
                alt="Team working on education technology"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To revolutionize education by providing intelligent, AI-powered tools that enhance the teaching
                experience, maintain academic integrity, and ultimately improve learning outcomes for students
                worldwide.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at Ngumpulin.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{value.title}</h3>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold">Ready to Transform Your Teaching?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Join hundreds of educators who are already saving time and improving their teaching experience with
              Ngumpulin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
