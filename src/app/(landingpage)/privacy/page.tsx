import Link from "next/link"
import { Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="mb-4">
          Legal
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last Updated: July 19, 2025</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          This Privacy Policy describes how your personal information is collected, used, and shared when you use
          ngumpul.in.
        </p>
      </div>

      {/* Privacy Content */}
      <div className="space-y-12">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
          <div className="prose max-w-none">
            <ul className="space-y-4">
              <li>
                <strong>Account Information:</strong> When you create an account, we collect your name, email address,
                and password.
              </li>
              <li>
                <strong>Submitted Assignments:</strong> We collect the assignments and any related content submitted by
                students as instructed by their educators. This may include text, documents, images, and other file
                formats.
              </li>
              <li>
                <strong>Usage Information:</strong> We collect information about how you interact with our services.
                This includes data on the features you use and the time, frequency, and duration of your activities. We
                use tools like PostHog for product analytics.
              </li>
              <li>
                <strong>Technical Information:</strong> We collect technical information from your browser, computer, or
                mobile device when you access the service, such as your IP address, device type, and browser type.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          <div className="prose max-w-none">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="space-y-2 mt-4">
              <li>
                <strong>To Provide and Improve Our Service:</strong> To operate, maintain, and enhance the features of
                ngumpul.in, including processing assignments with our Agentic AI, detecting plagiarism, and clustering
                submissions.
              </li>
              <li>
                <strong>Communication:</strong> To communicate with you about your account and our services, including
                responding to your inquiries submitted via Formspree.
              </li>
              <li>
                <strong>Security:</strong> To monitor and prevent any security breaches.
              </li>
              <li>
                <strong>Analytics:</strong> To understand how our users interact with our platform so we can improve the
                user experience.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">3. Data Sharing and Disclosure</h2>
          <div className="prose max-w-none">
            <p>
              We do not sell your personal information. We may share your information with third-party service providers
              who perform services on our behalf, such as:
            </p>
            <ul className="space-y-2 mt-4">
              <li>
                <strong>Supabase:</strong> For database hosting and management.
              </li>
              <li>
                <strong>Vercel:</strong> For web hosting.
              </li>
              <li>
                <strong>Formspree:</strong> For managing contact form submissions.
              </li>
              <li>
                <strong>PostHog:</strong> For product analytics.
              </li>
            </ul>
            <p className="mt-4">
              These third parties are obligated to protect your information and are restricted from using it for any
              other purpose.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">4. Data Security</h2>
          <div className="prose max-w-none">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Security Measures</p>
                <p className="text-blue-800 text-sm mt-1">
                  We implement a variety of security measures to maintain the safety of your personal information. Our
                  technology stack, which includes Supabase, Drizzle ORM, and Docker, is chosen with security in mind.
                  However, no electronic transmission or storage of information is ever completely secure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">5. Data Retention</h2>
          <div className="prose max-w-none">
            <p>
              We will retain your information for as long as your account is active or as needed to provide you with
              services. We may also retain and use your information to comply with our legal obligations, resolve
              disputes, and enforce our agreements.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights</h2>
          <div className="prose max-w-none">
            <p>
              You have the right to access, correct, or delete your personal information. You can manage your account
              information through your settings or by contacting us directly.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">7. Changes to This Privacy Policy</h2>
          <div className="prose max-w-none">
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page and updating the "Last Updated" date.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">8. Contact Us</h2>
          <div className="prose max-w-none">
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 p-8 bg-blue-50 rounded-lg text-center space-y-4">
        <h3 className="text-xl font-semibold">Questions about our Privacy Policy?</h3>
        <p className="text-muted-foreground">
          We're committed to protecting your privacy and being transparent about our data practices.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
