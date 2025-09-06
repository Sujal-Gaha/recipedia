import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageCircle, Book, Shield, CreditCard, Users, Settings } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

const faqData: FAQ[] = [
  {
    id: '1',
    question: 'How do I create my first recipe?',
    answer:
      'Creating your first recipe is easy! Navigate to the "Create Recipe" page from the main menu. Fill in the recipe details including title, description, ingredients, and step-by-step instructions. You can also add photos and tags to make your recipe more discoverable. Once you\'re satisfied with your recipe, click "Publish" to share it with the community.',
    category: 'Getting Started',
    tags: ['recipe', 'create', 'beginner'],
    helpful: 45,
    notHelpful: 2,
  },
  {
    id: '2',
    question: 'Can I save recipes from other users?',
    answer:
      'Yes! You can save any recipe to your personal collection by clicking the bookmark icon on the recipe page. Saved recipes will appear in your "My Recipes" section under the "Saved" tab. You can organize your saved recipes into custom collections for better organization.',
    category: 'Recipes',
    tags: ['save', 'bookmark', 'collection'],
    helpful: 38,
    notHelpful: 1,
  },
  {
    id: '3',
    question: 'How do I reset my password?',
    answer:
      'To reset your password, go to the login page and click "Forgot Password". Enter your email address and we\'ll send you a secure link to reset your password. The link will expire after 24 hours for security reasons. If you don\'t receive the email, check your spam folder or contact our support team.',
    category: 'Account',
    tags: ['password', 'reset', 'security'],
    helpful: 52,
    notHelpful: 3,
  },
  {
    id: '4',
    question: 'Is my personal information secure?',
    answer:
      'We take your privacy and security very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent. You can read our full Privacy Policy for detailed information about how we protect and use your data.',
    category: 'Privacy & Security',
    tags: ['privacy', 'security', 'data'],
    helpful: 67,
    notHelpful: 0,
  },
  {
    id: '5',
    question: 'How does the premium subscription work?',
    answer:
      'Our premium subscription gives you access to exclusive features like unlimited recipe storage, advanced search filters, priority customer support, and ad-free browsing. You can choose between monthly ($9.99) or yearly ($99.99) plans. Cancel anytime with no penalties.',
    category: 'Billing',
    tags: ['premium', 'subscription', 'billing'],
    helpful: 29,
    notHelpful: 5,
  },
  {
    id: '6',
    question: 'Can I share recipes on social media?',
    answer:
      "Yes! Every recipe has built-in social sharing buttons for Facebook, Twitter, Instagram, and Pinterest. You can also copy the recipe link to share anywhere. When someone clicks your shared link, they'll see a beautiful preview of the recipe with the main image and description.",
    category: 'Sharing',
    tags: ['social', 'share', 'link'],
    helpful: 41,
    notHelpful: 2,
  },
];

const categories = [
  { name: 'All', icon: Book, count: faqData.length },
  { name: 'Getting Started', icon: Users, count: faqData.filter((f) => f.category === 'Getting Started').length },
  { name: 'Recipes', icon: MessageCircle, count: faqData.filter((f) => f.category === 'Recipes').length },
  { name: 'Account', icon: Settings, count: faqData.filter((f) => f.category === 'Account').length },
  {
    name: 'Privacy & Security',
    icon: Shield,
    count: faqData.filter((f) => f.category === 'Privacy & Security').length,
  },
  { name: 'Billing', icon: CreditCard, count: faqData.filter((f) => f.category === 'Billing').length },
  { name: 'Sharing', icon: Users, count: faqData.filter((f) => f.category === 'Sharing').length },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleHelpful = (id: string, helpful: boolean) => {
    // In a real app, this would make an API call
    console.log(`FAQ ${id} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to common questions about Recipedia. Can't find what you're looking for? Contact our support
            team.
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.name)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{faq.category}</Badge>
                          {faq.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedItems.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t pt-4">
                              <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>

                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">Was this helpful?</div>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => handleHelpful(faq.id, true)}
                                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                                  >
                                    <span role="img" aria-label="Thumbs up">
                                      👍
                                    </span>{' '}
                                    Yes ({faq.helpful})
                                  </button>
                                  <button
                                    onClick={() => handleHelpful(faq.id, false)}
                                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                  >
                                    <span role="img" aria-label="Thumbs down">
                                      👎
                                    </span>{' '}
                                    No ({faq.notHelpful})
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or browse different categories.</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </motion.div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </Button>
                <Button variant="outline" size="lg">
                  Browse Help Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
