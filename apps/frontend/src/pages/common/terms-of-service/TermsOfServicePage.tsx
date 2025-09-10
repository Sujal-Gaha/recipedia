import { ArrowLeft, Calendar, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { _FULL_ROUTES } from '@/constants/routes';

export const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={_FULL_ROUTES.HOME} className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-2">Last updated: January 15, 2024</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Calendar className="w-3 h-3 mr-1" />
            Effective Date: January 15, 2024
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#acceptance" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  1. Acceptance of Terms
                </a>
                <a href="#description" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  2. Description of Service
                </a>
                <a
                  href="#user-accounts"
                  className="block text-sm text-orange-600 hover:text-orange-700 hover:underline"
                >
                  3. User Accounts
                </a>
                <a href="#user-content" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  4. User Content
                </a>
                <a
                  href="#prohibited-uses"
                  className="block text-sm text-orange-600 hover:text-orange-700 hover:underline"
                >
                  5. Prohibited Uses
                </a>
                <a
                  href="#intellectual-property"
                  className="block text-sm text-orange-600 hover:text-orange-700 hover:underline"
                >
                  6. Intellectual Property
                </a>
                <a href="#privacy" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  7. Privacy Policy
                </a>
                <a href="#disclaimers" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  8. Disclaimers
                </a>
                <a href="#limitation" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  9. Limitation of Liability
                </a>
                <a href="#termination" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  10. Termination
                </a>
                <a href="#changes" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  11. Changes to Terms
                </a>
                <a href="#contact" className="block text-sm text-orange-600 hover:text-orange-700 hover:underline">
                  12. Contact Information
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8 space-y-8">
                {/* Introduction */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h2 className="text-xl font-semibold text-orange-800 mb-3">Welcome to Recipedia</h2>
                  <p className="text-orange-700">
                    These Terms of Service ("Terms") govern your use of Recipedia, a recipe sharing and cooking
                    community platform. By accessing or using our service, you agree to be bound by these Terms.
                  </p>
                </div>

                {/* Section 1 */}
                <section id="acceptance">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      By accessing and using Recipedia ("the Service"), you accept and agree to be bound by the terms
                      and provision of this agreement. If you do not agree to abide by the above, please do not use this
                      service.
                    </p>
                    <p className="text-gray-700">
                      These Terms apply to all visitors, users, and others who access or use the Service, including
                      users who contribute content, information, and other materials or services on the Service.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 2 */}
                <section id="description">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">Recipedia is a web-based platform that allows users to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>Share and discover recipes</li>
                      <li>Create and manage ingredient databases</li>
                      <li>Connect with other cooking enthusiasts</li>
                      <li>Rate and review recipes</li>
                      <li>Build personal recipe collections</li>
                      <li>Access cooking tips and techniques</li>
                    </ul>
                    <p className="text-gray-700">
                      The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue any
                      aspect of the Service at any time.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 3 */}
                <section id="user-accounts">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      To access certain features of the Service, you must create an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your account information</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                    <p className="text-gray-700">
                      You must be at least 13 years old to create an account. Users under 18 must have parental consent.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 4 */}
                <section id="user-content">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      You retain ownership of content you submit to Recipedia. However, by posting content, you grant
                      us:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>
                        A worldwide, non-exclusive, royalty-free license to use, display, and distribute your content
                      </li>
                      <li>The right to modify content for technical or editorial purposes</li>
                      <li>Permission to use your content in promotional materials</li>
                    </ul>
                    <p className="text-gray-700 mb-4">You represent and warrant that:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>You own or have the right to use all content you submit</li>
                      <li>Your content does not infringe on third-party rights</li>
                      <li>Your content is accurate and not misleading</li>
                      <li>Your content complies with applicable laws and regulations</li>
                    </ul>
                  </div>
                </section>

                <Separator />

                {/* Section 5 */}
                <section id="prohibited-uses">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">You may not use the Service to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Post harmful, offensive, or inappropriate content</li>
                      <li>Spam or send unsolicited communications</li>
                      <li>Impersonate others or provide false information</li>
                      <li>Interfere with the Service's operation</li>
                      <li>Collect user data without permission</li>
                      <li>Use automated systems to access the Service</li>
                    </ul>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-red-800 font-medium">
                        <span role="img" aria-label="Warning">
                          ⚠️
                        </span>{' '}
                        Violation of these terms may result in account suspension or termination.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Section 6 */}
                <section id="intellectual-property">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      The Service and its original content, features, and functionality are owned by Recipedia and are
                      protected by international copyright, trademark, patent, trade secret, and other intellectual
                      property laws.
                    </p>
                    <p className="text-gray-700">
                      Our trademarks and trade dress may not be used in connection with any product or service without
                      our prior written consent.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 7 */}
                <section id="privacy">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy Policy</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                      the Service, to understand our practices.
                    </p>
                    <Link
                      to={_FULL_ROUTES.PRIVACY_POLICY}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Read our Privacy Policy
                    </Link>
                  </div>
                </section>

                <Separator />

                {/* Section 8 */}
                <section id="disclaimers">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES,
                      EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                      NON-INFRINGEMENT.
                    </p>
                    <p className="text-gray-700">
                      We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects
                      will be corrected.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 9 */}
                <section id="limitation">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      IN NO EVENT SHALL RECIPEDIA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                      PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL.
                    </p>
                    <p className="text-gray-700">
                      Our total liability shall not exceed the amount paid by you for the Service in the twelve months
                      preceding the claim.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 10 */}
                <section id="termination">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      We may terminate or suspend your account and access to the Service immediately, without prior
                      notice, for conduct that we believe violates these Terms or is harmful to other users, us, or
                      third parties.
                    </p>
                    <p className="text-gray-700">
                      You may terminate your account at any time by contacting us. Upon termination, your right to use
                      the Service will cease immediately.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 11 */}
                <section id="changes">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      We reserve the right to modify these Terms at any time. We will notify users of significant
                      changes via email or through the Service.
                    </p>
                    <p className="text-gray-700">
                      Your continued use of the Service after changes become effective constitutes acceptance of the new
                      Terms.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Section 12 */}
                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms, please contact us:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-2">
                        <strong>Email:</strong> legal@recipedia.com
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Address:</strong> 123 Recipe Street, Culinary City, CC 12345
                      </p>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-800 font-medium">Questions about these terms?</p>
                      <p className="text-orange-700 text-sm">We're here to help clarify anything you need.</p>
                    </div>
                    <Link to={_FULL_ROUTES.CONTACT}>
                      <Button className="bg-orange-600 hover:bg-orange-700">Contact Us</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
