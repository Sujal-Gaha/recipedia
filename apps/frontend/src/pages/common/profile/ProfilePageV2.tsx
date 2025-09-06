'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  Edit,
  Calendar,
  Camera,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Bell,
  Shield,
  Eye,
  Mail,
  Smartphone,
  Lock,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const [user, setUser] = useState({
    id: '1',
    name: 'Chef Maria Rodriguez',
    username: 'maria_chef',
    email: 'maria@example.com',
    phone: '+1 (555) 123-4567',
    image: '/placeholder.svg?height=120&width=120',
    bio: 'Passionate home cook sharing family recipes passed down through generations. Specializing in Mediterranean and Latin American cuisine.',
    joinDate: 'January 2023',
    location: 'Barcelona, Spain',
    website: 'https://mariarecipes.com',
    instagram: '@mariarecipes',
    twitter: '@mariarecipes',
    facebook: 'Maria Rodriguez Chef',
    specialties: ['Mediterranean', 'Latin American', 'Vegetarian'],
    language: 'English',
    timezone: 'Europe/Madrid',
    dateFormat: 'MM/DD/YYYY',
    measurementUnit: 'metric',
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    twoFactorAuth: false,
    loginAlerts: true,
  });

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    location: user.location,
    website: user.website,
    instagram: user.instagram,
    twitter: user.twitter,
    facebook: user.facebook,
    specialties: user.specialties.join(', '),
    language: user.language,
    timezone: user.timezone,
    dateFormat: user.dateFormat,
    measurementUnit: user.measurementUnit,
  });

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data
      setUser((prev) => ({
        ...prev,
        name: editForm.name,
        username: editForm.username,
        email: editForm.email,
        phone: editForm.phone,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
        instagram: editForm.instagram,
        twitter: editForm.twitter,
        facebook: editForm.facebook,
        specialties: editForm.specialties
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        language: editForm.language,
        timezone: editForm.timezone,
        dateFormat: editForm.dateFormat,
        measurementUnit: editForm.measurementUnit,
      }));

      setIsEditDialogOpen(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast({
      title: 'Setting Updated',
      description: 'Your preference has been saved.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-600">Recipedia</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/recipes" className="text-gray-600 hover:text-orange-600">
                All Recipes
              </Link>
              <Link href="/ingredients" className="text-gray-600 hover:text-orange-600">
                Ingredient Filter
              </Link>
              <Link href="/create" className="text-gray-600 hover:text-orange-600">
                Create Recipe
              </Link>
            </nav>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.image || '/placeholder.svg'} alt={user.name} />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Joined {user.joinDate}
                      </div>
                      {user.location && (
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-2 sm:mt-0">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your profile information and preferences.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEditSubmit}>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                value={editForm.username}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
                                placeholder="Enter your username"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                value={editForm.phone}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editForm.bio}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                              placeholder="Tell us about yourself and your cooking style"
                              rows={4}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={editForm.location}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                                placeholder="City, Country"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                type="url"
                                value={editForm.website}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, website: e.target.value }))}
                                placeholder="https://yourwebsite.com"
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="specialties">Cooking Specialties</Label>
                            <Input
                              id="specialties"
                              value={editForm.specialties}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, specialties: e.target.value }))}
                              placeholder="Mediterranean, Italian, Vegetarian (comma separated)"
                            />
                          </div>

                          <div className="grid gap-4">
                            <Label>Social Media</Label>
                            <div className="grid gap-3">
                              <div className="flex items-center space-x-2">
                                <Instagram className="h-4 w-4 text-pink-600" />
                                <Input
                                  value={editForm.instagram}
                                  onChange={(e) => setEditForm((prev) => ({ ...prev, instagram: e.target.value }))}
                                  placeholder="@username"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Twitter className="h-4 w-4 text-blue-500" />
                                <Input
                                  value={editForm.twitter}
                                  onChange={(e) => setEditForm((prev) => ({ ...prev, twitter: e.target.value }))}
                                  placeholder="@username"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Facebook className="h-4 w-4 text-blue-600" />
                                <Input
                                  value={editForm.facebook}
                                  onChange={(e) => setEditForm((prev) => ({ ...prev, facebook: e.target.value }))}
                                  placeholder="Facebook Page Name"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="language">Language</Label>
                              <Select
                                value={editForm.language}
                                onValueChange={(value) => setEditForm((prev) => ({ ...prev, language: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="English">English</SelectItem>
                                  <SelectItem value="Spanish">Spanish</SelectItem>
                                  <SelectItem value="French">French</SelectItem>
                                  <SelectItem value="German">German</SelectItem>
                                  <SelectItem value="Italian">Italian</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="timezone">Timezone</Label>
                              <Select
                                value={editForm.timezone}
                                onValueChange={(value) => setEditForm((prev) => ({ ...prev, timezone: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                  <SelectItem value="Europe/London">London</SelectItem>
                                  <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                                  <SelectItem value="Europe/Paris">Paris</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="dateFormat">Date Format</Label>
                              <Select
                                value={editForm.dateFormat}
                                onValueChange={(value) => setEditForm((prev) => ({ ...prev, dateFormat: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="measurementUnit">Measurement Unit</Label>
                              <Select
                                value={editForm.measurementUnit}
                                onValueChange={(value) => setEditForm((prev) => ({ ...prev, measurementUnit: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="metric">Metric (kg, L, °C)</SelectItem>
                                  <SelectItem value="imperial">Imperial (lb, gal, °F)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="text-gray-700 mb-4">{user.bio}</p>

                {/* Specialties */}
                {user.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {user.instagram && (
                    <a
                      href={`https://instagram.com/${user.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {user.twitter && (
                    <a
                      href={`https://twitter.com/${user.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {user.facebook && (
                    <a
                      href={`https://facebook.com/${user.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your public profile information and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Language</Label>
                    <p className="text-sm text-gray-600">{user.language}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Timezone</Label>
                    <p className="text-sm text-gray-600">{user.timezone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Date Format</Label>
                    <p className="text-sm text-gray-600">{user.dateFormat}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Measurement Unit</Label>
                    <p className="text-sm text-gray-600 capitalize">{user.measurementUnit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about activity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <Label className="text-base">Email Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <Label className="text-base">Push Notifications</Label>
                    </div>
                    <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <Label className="text-base">Marketing Emails</Label>
                    </div>
                    <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <Label className="text-base">Weekly Digest</Label>
                    </div>
                    <p className="text-sm text-gray-600">Get a weekly summary of activity</p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your information and activity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Profile Visibility</Label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                      <SelectItem value="friends">Friends - Only friends can see your profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <Label className="text-base">Show Email Address</Label>
                    </div>
                    <p className="text-sm text-gray-600">Display your email on your public profile</p>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <Label className="text-base">Show Phone Number</Label>
                    </div>
                    <p className="text-sm text-gray-600">Display your phone number on your public profile</p>
                  </div>
                  <Switch
                    checked={settings.showPhone}
                    onCheckedChange={(checked) => handleSettingChange('showPhone', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <Label className="text-base">Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <Label className="text-base">Login Alerts</Label>
                      </div>
                      <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or delete your account data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
