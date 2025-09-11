import { ArrowLeft, Calendar, Shield, Eye, Lock, Database, Users, Globe, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { _FULL_ROUTES } from '@/constants/routes';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={_FULL_ROUTES.HOME} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">Your privacy matters to us</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Calendar className="w-3 h-3 mr-1" />
              Last updated: January 15, 2025
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Lock className="w-3 h-3 mr-1" />
              GDPR Compliant
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#overview" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Privacy Overview
                </a>
                <a
                  href="#information-we-collect"
                  className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Information We Collect
                </a>
                <a href="#how-we-use" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  How We Use Information
                </a>
                <a
                  href="#information-sharing"
                  className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Information Sharing
                </a>
                <a href="#data-security" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Data Security
                </a>
                <a href="#your-rights" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Your Rights
                </a>
                <a href="#cookies" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Cookies & Tracking
                </a>
                <a href="#international" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  International Transfers
                </a>
                <a href="#children" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Children's Privacy
                </a>
                <a href="#changes" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Policy Changes
                </a>
                <a href="#contact" className="block text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Contact Us
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8 space-y-8">
                {/* Privacy Overview */}
                <section id="overview">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Your Privacy is Our Priority
                    </h2>
                    <p className="text-blue-700 mb-4">
                      At Recipedia, we believe in transparency about how we collect, use, and protect your personal
                      information. This Privacy Policy explains our practices and your rights regarding your data.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-white p-3 rounded border border-blue-200">
                        <Lock className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium text-blue-800">Secure by Design</p>
                        <p className="text-xs text-blue-600">End-to-end encryption</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-blue-200">
                        <Users className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium text-blue-800">No Data Selling</p>
                        <p className="text-xs text-blue-600">We never sell your data</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-blue-200">
                        <Settings className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium text-blue-800">Full Control</p>
                        <p className="text-xs text-blue-600">Manage your privacy</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information We Collect */}
                <section id="information-we-collect">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-blue-600" />
                    Information We Collect
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Information You Provide</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                          <strong>Account Information:</strong> Name, email address, username, password
                        </li>
                        <li>
                          <strong>Profile Information:</strong> Bio, profile picture, location, cooking preferences
                        </li>
                        <li>
                          <strong>Content:</strong> Recipes, comments, reviews, photos, cooking tips
                        </li>
                        <li>
                          <strong>Communications:</strong> Messages, support requests, feedback
                        </li>
                        <li>
                          <strong>Payment Information:</strong> Billing details for premium features (processed
                          securely)
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Information We Collect Automatically</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                          <strong>Usage Data:</strong> Pages visited, features used, time spent, interactions
                        </li>
                        <li>
                          <strong>Device Information:</strong> Browser type, operating system, device identifiers
                        </li>
                        <li>
                          <strong>Location Data:</strong> IP address, general location (with permission)
                        </li>
                        <li>
                          <strong>Cookies & Tracking:</strong> Preferences, session data, analytics
                        </li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Information from Third Parties</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>
                          <strong>Social Media:</strong> Profile information when you connect social accounts
                        </li>
                        <li>
                          <strong>Analytics Providers:</strong> Usage statistics and performance data
                        </li>
                        <li>
                          <strong>Payment Processors:</strong> Transaction confirmations and payment status
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* How We Use Information */}
                <section id="how-we-use">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2">Core Services</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Provide and maintain the platform</li>
                          <li>• Process your recipes and content</li>
                          <li>• Enable community interactions</li>
                          <li>• Provide customer support</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">Personalization</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Customize your experience</li>
                          <li>• Recommend relevant recipes</li>
                          <li>• Suggest cooking techniques</li>
                          <li>• Tailor content to your interests</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-purple-800 mb-2">Communication</h3>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Send important updates</li>
                          <li>• Notify about new features</li>
                          <li>• Respond to your inquiries</li>
                          <li>• Share cooking tips (optional)</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="font-semibold text-orange-800 mb-2">Improvement</h3>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>• Analyze usage patterns</li>
                          <li>• Improve our services</li>
                          <li>• Develop new features</li>
                          <li>• Ensure platform security</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Information Sharing */}
                <section id="information-sharing">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                    <p className="text-red-800 font-medium">
                      <span role="img" aria-label="Shield">
                        🛡️
                      </span>{' '}
                      We never sell your personal information to third parties.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Public Information</h3>
                      <p className="text-gray-700 text-sm">
                        Your profile, recipes, and comments are public by default. You can adjust privacy settings in
                        your account preferences.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Service Providers</h3>
                      <p className="text-gray-700 text-sm">
                        We share data with trusted partners who help us operate the platform (hosting, analytics,
                        payment processing) under strict confidentiality agreements.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                      <p className="text-gray-700 text-sm">
                        We may disclose information when required by law, to protect our rights, or to ensure user
                        safety and platform security.
                      </p>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Data Security */}
                <section id="data-security">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-blue-600" />
                    Data Security
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Technical Safeguards</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• SSL/TLS encryption in transit</li>
                          <li>• AES-256 encryption at rest</li>
                          <li>• Regular security audits</li>
                          <li>• Secure data centers</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Access Controls</h3>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Multi-factor authentication</li>
                          <li>• Role-based access control</li>
                          <li>• Regular access reviews</li>
                          <li>• Employee training programs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> While we implement industry-standard security measures, no system is 100%
                      secure. We encourage you to use strong passwords and enable two-factor authentication.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Your Rights */}
                <section id="your-rights">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <h3 className="font-semibold text-blue-800 mb-2">Access & Portability</h3>
                      <p className="text-sm text-blue-700">
                        Request a copy of your personal data in a portable format.
                      </p>
                    </div>

                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <h3 className="font-semibold text-green-800 mb-2">Correction</h3>
                      <p className="text-sm text-green-700">Update or correct inaccurate personal information.</p>
                    </div>

                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <h3 className="font-semibold text-red-800 mb-2">Deletion</h3>
                      <p className="text-sm text-red-700">
                        Request deletion of your personal data (right to be forgotten).
                      </p>
                    </div>

                    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                      <h3 className="font-semibold text-purple-800 mb-2">Restriction</h3>
                      <p className="text-sm text-purple-700">Limit how we process your personal information.</p>
                    </div>

                    <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                      <h3 className="font-semibold text-orange-800 mb-2">Objection</h3>
                      <p className="text-sm text-orange-700">Object to processing based on legitimate interests.</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-2">Withdraw Consent</h3>
                      <p className="text-sm text-gray-700">Withdraw consent for data processing at any time.</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      <strong>How to Exercise Your Rights:</strong> Contact us at privacy@recipedia.com or use the
                      privacy controls in your account settings. We'll respond within 30 days.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Cookies */}
                <section id="cookies">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking Technologies</h2>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                      <p className="text-gray-700 text-sm mb-2">
                        Required for basic functionality (login, security, preferences).
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Always Active
                      </Badge>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h3>
                      <p className="text-gray-700 text-sm mb-2">
                        Help us understand how you use our platform to improve your experience.
                      </p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Optional
                      </Badge>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
                      <p className="text-gray-700 text-sm mb-2">
                        Used to show you relevant content and advertisements.
                      </p>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        Optional
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm">
                      You can manage cookie preferences in your browser settings or through our cookie consent banner.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* International Transfers */}
                <section id="international">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-600" />
                    International Data Transfers
                  </h2>

                  <p className="text-gray-700 mb-4">
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    appropriate safeguards are in place:
                  </p>

                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                    <li>Adequacy decisions for approved countries</li>
                    <li>Privacy Shield certification where applicable</li>
                    <li>Regular compliance audits and assessments</li>
                  </ul>
                </section>

                <Separator />

                {/* Children's Privacy */}
                <section id="children">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 mb-2">
                      <strong>Age Requirement:</strong> Our service is intended for users 13 years and older.
                    </p>
                    <p className="text-yellow-700 text-sm">
                      We do not knowingly collect personal information from children under 13. If we become aware of
                      such collection, we will delete the information immediately.
                    </p>
                  </div>
                </section>

                <Separator />

                {/* Policy Changes */}
                <section id="changes">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>

                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy periodically. We will notify you of significant changes through:
                  </p>

                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Email notification to registered users</li>
                    <li>Prominent notice on our website</li>
                    <li>In-app notifications</li>
                    <li>Updated "Last Modified" date</li>
                  </ul>

                  <p className="text-gray-700">
                    Your continued use of the service after changes become effective constitutes acceptance of the
                    updated policy.
                  </p>
                </section>

                <Separator />

                {/* Contact Information */}
                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <p className="text-blue-800 mb-4">
                      Have questions about your privacy or this policy? We're here to help.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-2">Privacy Officer</h3>
                        <p className="text-blue-700 text-sm mb-1">Email: privacy@recipedia.com</p>
                        <p className="text-blue-700 text-sm">Response time: Within 48 hours</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-blue-800 mb-2">Mailing Address</h3>
                        <p className="text-blue-700 text-sm">
                          Recipedia Privacy Team
                          <br />
                          123 Recipe Street
                          <br />
                          Culinary City, CC 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium">Need to exercise your privacy rights?</p>
                      <p className="text-blue-700 text-sm">Contact our privacy team for assistance.</p>
                    </div>
                    <Link to={_FULL_ROUTES.CONTACT}>
                      <Button className="bg-blue-600 hover:bg-blue-700">Contact Privacy Team</Button>
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
