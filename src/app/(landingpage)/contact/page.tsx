
"use client"

import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { FormEvent, useForm } from "@formspree/react";
import { useState } from "react"
import { SubmissionData, FieldValues } from "@formspree/core";

export default function ContactUs() {
  const [state, handleSubmit, reset] = useForm("xnnpnley")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSubmit = async (e: FormEvent | SubmissionData<FieldValues>) => {
    await handleSubmit(e);
    if (state.succeeded) {
      setIsSubmitted(true);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-12">
          {/* Title Section */}
          <div className="text-center space-y-4 mt-10">
            <Badge variant="outline" className="mb-4">
              Contact
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about Ngumpulin? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
                {isSubmitted ? (
                  <Card className="p-6 bg-green-50 border-green-200">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Send className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
                      <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" name="subject" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            required
                          />
                        </div>
                        <Button type="submit" disabled={state.submitting} className="w-full">
                          {state.submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p className="text-muted-foreground">support@ngumpul.in</p>
                          <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Office</h3>
                          <p className="text-muted-foreground">Surabaya, Indonesia</p>
                          <p className="text-sm text-muted-foreground mt-1">Serving educators worldwide</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Support Hours</h3>
                          <p className="text-muted-foreground">Monday - Friday</p>
                          <p className="text-sm text-muted-foreground mt-1">9:00 AM - 6:00 PM (WIB)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* FAQ Link */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Looking for quick answers?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check out our FAQ section for common questions about Ngumpulin.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/#faq">View FAQ</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
