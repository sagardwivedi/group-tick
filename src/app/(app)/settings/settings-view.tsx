"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  User,
  Bell,
  Moon,
  Shield,
  Globe,
  CreditCard,
  Users,
  LogOut,
  Trash2,
  Save,
  Upload,
  Loader2,
  Check,
  Lock,
  Mail,
  Smartphone,
  Palette,
  Eye,
  EyeOff,
  RefreshCw,
  Plug,
  Sun,
  Laptop,
  MessageSquare,
  FileText,
  MessageCircle,
  Youtube,
  Copy,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Form schemas
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

// Sample user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=128&width=128",
  initials: "AJ",
  bio: "Product manager with 5+ years of experience in SaaS products. Passionate about user experience and team collaboration.",
  jobTitle: "Product Manager",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  phoneNumber: "+1 (555) 123-4567",
  plan: "Pro",
  billingCycle: "Monthly",
  nextBillingDate: "August 15, 2023",
  teams: [
    { id: "team-1", name: "Marketing Team", role: "Member" },
    { id: "team-2", name: "Development Team", role: "Member" },
    { id: "team-3", name: "Design Team", role: "Admin" },
  ],
  integrations: [
    {
      id: "int-1",
      name: "Google Calendar",
      connected: true,
      lastSync: "2 hours ago",
    },
    { id: "int-2", name: "Slack", connected: true, lastSync: "1 day ago" },
    { id: "int-3", name: "GitHub", connected: false, lastSync: "Never" },
    { id: "int-4", name: "Dropbox", connected: false, lastSync: "Never" },
  ],
};

export function SettingsView() {
  const [selectedTab, setSelectedTab] = React.useState("account");
  const [isUploading, setIsUploading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      jobTitle: userData.jobTitle,
      company: userData.company,
      location: userData.location,
      phoneNumber: userData.phoneNumber,
    },
  });

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile form submission
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    // In a real app, this would send the data to your backend
    console.log(values);
    // Show success message
    alert("Profile updated successfully!");
  }

  // Handle password form submission
  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    // In a real app, this would send the data to your backend
    console.log(values);
    // Show success message
    alert("Password updated successfully!");
    // Reset form
    passwordForm.reset();
  }

  // Handle avatar upload
  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      // Show success message
      alert("Avatar uploaded successfully!");
    }, 2000);
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="space-y-6"
    >
      <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:w-auto">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex items-center gap-2">
          <Plug className="h-4 w-4" />
          <span className="hidden md:inline">Integrations</span>
        </TabsTrigger>
        <TabsTrigger value="teams" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Teams</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden md:inline">Billing</span>
        </TabsTrigger>
      </TabsList>

      {/* Account Tab */}
      <TabsContent value="account" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and public profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAvatarUpload}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Avatar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. Maximum 160
                          characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Product Manager"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={profileForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. San Francisco, CA"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. +1 (555) 123-4567"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Password */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your current password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter your new password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showNewPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Password must be at least 8 characters long.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your new password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showConfirmPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium">Log Out of All Devices</h4>
                <p className="text-sm text-muted-foreground">
                  This will log you out from all devices except the current one.
                </p>
              </div>
              <Button variant="outline" className="md:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out Everywhere
              </Button>
            </div>

            <Separator />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium text-destructive">
                  Delete Account
                </h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="md:w-auto">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose how and when you want to be notified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-tasks">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when tasks are assigned to you
                    </p>
                  </div>
                  <Switch id="email-tasks" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when someone comments on your tasks
                    </p>
                  </div>
                  <Switch id="email-comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reminders">Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminder emails for upcoming deadlines
                    </p>
                  </div>
                  <Switch id="email-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about updates to projects you're part of
                    </p>
                  </div>
                  <Switch id="email-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features and promotions
                    </p>
                  </div>
                  <Switch id="email-marketing" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">In-App Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-tasks">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when tasks are assigned to you
                    </p>
                  </div>
                  <Switch id="app-tasks" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone comments on your tasks
                    </p>
                  </div>
                  <Switch id="app-comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-reminders">Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for upcoming deadlines
                    </p>
                  </div>
                  <Switch id="app-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-mentions">Mentions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you're mentioned in comments
                    </p>
                  </div>
                  <Switch id="app-mentions" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Mobile Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-all">Enable Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your mobile device
                    </p>
                  </div>
                  <Switch id="push-all" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-tasks">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications when tasks are assigned to you
                    </p>
                  </div>
                  <Switch id="push-tasks" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-deadlines">Deadline Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications for upcoming deadlines
                    </p>
                  </div>
                  <Switch id="push-deadlines" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Schedule</CardTitle>
            <CardDescription>
              Set your preferred notification delivery times.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="digest-email">Daily Digest Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of all your notifications
                  </p>
                </div>
                <Switch id="digest-email" defaultChecked />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="digest-time">Delivery Time</Label>
                  <Select defaultValue="9">
                    <SelectTrigger id="digest-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6:00 AM</SelectItem>
                      <SelectItem value="7">7:00 AM</SelectItem>
                      <SelectItem value="8">8:00 AM</SelectItem>
                      <SelectItem value="9">9:00 AM</SelectItem>
                      <SelectItem value="10">10:00 AM</SelectItem>
                      <SelectItem value="17">5:00 PM</SelectItem>
                      <SelectItem value="18">6:00 PM</SelectItem>
                      <SelectItem value="19">7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digest-days">Delivery Days</Label>
                  <Select defaultValue="weekdays">
                    <SelectTrigger id="digest-days">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyday">Every day</SelectItem>
                      <SelectItem value="weekdays">Weekdays only</SelectItem>
                      <SelectItem value="weekends">Weekends only</SelectItem>
                      <SelectItem value="monday">Mondays only</SelectItem>
                      <SelectItem value="friday">Fridays only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">
                    Don't send notifications during these hours
                  </p>
                </div>
                <Switch id="quiet-hours" defaultChecked />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Select defaultValue="22">
                    <SelectTrigger id="quiet-start">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">8:00 PM</SelectItem>
                      <SelectItem value="21">9:00 PM</SelectItem>
                      <SelectItem value="22">10:00 PM</SelectItem>
                      <SelectItem value="23">11:00 PM</SelectItem>
                      <SelectItem value="0">12:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="quiet-end">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5:00 AM</SelectItem>
                      <SelectItem value="6">6:00 AM</SelectItem>
                      <SelectItem value="7">7:00 AM</SelectItem>
                      <SelectItem value="8">8:00 AM</SelectItem>
                      <SelectItem value="9">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Schedule
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Appearance Tab */}
      <TabsContent value="appearance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <RadioGroup
                defaultValue="system"
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="light"
                    id="theme-light"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="dark"
                    id="theme-dark"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="system"
                    id="theme-system"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="theme-system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Laptop className="mb-3 h-6 w-6" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Color Scheme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-primary"></div>
                  <Label className="text-center w-full block">Default</Label>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-blue-600"></div>
                  <Label className="text-center w-full block">Blue</Label>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-purple-600"></div>
                  <Label className="text-center w-full block">Purple</Label>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-green-600"></div>
                  <Label className="text-center w-full block">Green</Label>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-orange-600"></div>
                  <Label className="text-center w-full block">Orange</Label>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-full rounded-md bg-pink-600"></div>
                  <Label className="text-center w-full block">Pink</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Layout</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content on screen
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce the amount of animations and transitions
                    </p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="large-text">Larger Text</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase the size of text throughout the application
                    </p>
                  </div>
                  <Switch id="large-text" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default View</h3>
              <RadioGroup defaultValue="board" className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="board" id="view-board" />
                  <Label htmlFor="view-board">Board View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="view-list" />
                  <Label htmlFor="view-list">List View</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="calendar" id="view-calendar" />
                  <Label htmlFor="view-calendar">Calendar View</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Appearance
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and authentication methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-amber-500 border-amber-500"
                  >
                    Not Enabled
                  </Badge>
                  <Button>Enable 2FA</Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Login Sessions</h3>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Current Session</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="mr-1 h-4 w-4" />
                        Chrome on Windows • San Francisco, CA
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Started 2 hours ago
                      </p>
                    </div>
                    <Badge className="w-fit">Current</Badge>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Mobile App</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Smartphone className="mr-1 h-4 w-4" />
                        iPhone 13 • New York, NY
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last active 1 day ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Safari</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="mr-1 h-4 w-4" />
                        Safari on macOS • San Francisco, CA
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last active 3 days ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Log</h3>
              <div className="rounded-md border">
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Password changed</p>
                      <p className="text-xs text-muted-foreground">
                        2 weeks ago
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your password was changed from Chrome on Windows
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">New login</p>
                      <p className="text-xs text-muted-foreground">
                        3 weeks ago
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      New login from iPhone 13 in New York, NY
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Email changed</p>
                      <p className="text-xs text-muted-foreground">
                        1 month ago
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your email was changed from Chrome on Windows
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Full Security Log
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Control how your information is used and shared.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-sharing">Activity Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow team members to see your activity status
                </p>
              </div>
              <Switch id="activity-sharing" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="read-receipts">Read Receipts</Label>
                <p className="text-sm text-muted-foreground">
                  Let others know when you've read their messages
                </p>
              </div>
              <Switch id="read-receipts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-collection">Data Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data collection to improve the service
                </p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Privacy Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Integrations Tab */}
      <TabsContent value="integrations" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Services</CardTitle>
            <CardDescription>
              Manage third-party services connected to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {userData.integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md"
              >
                <div className="space-y-1">
                  <p className="font-medium">{integration.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {integration.connected
                      ? `Last synced: ${integration.lastSync}`
                      : "Not connected"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {integration.connected ? (
                    <>
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-500"
                      >
                        Connected
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sync Now</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button variant="outline">Disconnect</Button>
                    </>
                  ) : (
                    <Button>Connect</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>
              Connect with other services to enhance your workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Microsoft Outlook</p>
                    <p className="text-sm text-muted-foreground">
                      Calendar sync
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Microsoft Teams</p>
                    <p className="text-sm text-muted-foreground">
                      Chat integration
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Google Drive</p>
                    <p className="text-sm text-muted-foreground">
                      File storage
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Discord</p>
                    <p className="text-sm text-muted-foreground">
                      Chat notifications
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
                    <Youtube className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">YouTube</p>
                    <p className="text-sm text-muted-foreground">
                      Video embedding
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Jira</p>
                    <p className="text-sm text-muted-foreground">
                      Issue tracking
                    </p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage API keys and access for developers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium">Personal API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Use this key to access the API from your applications
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="password"
                  value="sk_live_51HG6TyJ2Ez0iZS7W9iuQe2Rj"
                  className="w-full sm:w-auto font-mono"
                  readOnly
                />
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-medium">Webhook URL</h4>
                <p className="text-sm text-muted-foreground">
                  Receive event notifications at this URL
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="https://your-app.com/webhook"
                  className="w-full sm:w-auto"
                />
                <Button>Save</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="webhook-active">Webhook Active</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable webhook notifications
                </p>
              </div>
              <Switch id="webhook-active" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate API Key
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Teams Tab */}
      <TabsContent value="teams" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Teams</CardTitle>
            <CardDescription>
              Manage your team memberships and roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {userData.teams.map((team) => (
              <div
                key={team.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-md"
              >
                <div className="space-y-1">
                  <p className="font-medium">{team.name}</p>
                  <div className="flex items-center">
                    <Badge variant="outline">{team.role}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">View Team</Button>
                  {team.role === "Admin" && <Button>Manage Team</Button>}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Create New Team
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Invitations</CardTitle>
            <CardDescription>
              Pending invitations to join teams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                No Pending Invitations
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You don't have any pending team invitations at the moment.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Settings</CardTitle>
            <CardDescription>
              Configure your default team preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-team">Default Team</Label>
              <Select defaultValue="team-3">
                <SelectTrigger id="default-team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team-1">Marketing Team</SelectItem>
                  <SelectItem value="team-2">Development Team</SelectItem>
                  <SelectItem value="team-3">Design Team</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                This team will be selected by default when you log in.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-join">Auto-join Projects</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically join new projects created in your teams
                </p>
              </div>
              <Switch id="auto-join" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="team-notifications">Team Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about team activity
                </p>
              </div>
              <Switch id="team-notifications" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Team Settings
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Billing Tab */}
      <TabsContent value="billing" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              Manage your subscription and billing information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{userData.plan} Plan</h3>
                    <Badge>Current Plan</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Billed {userData.billingCycle.toLowerCase()}. Next billing
                    date: {userData.nextBillingDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    Cancel Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plan Features</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Unlimited Projects</p>
                    <p className="text-sm text-muted-foreground">
                      Create as many projects as you need
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Team Collaboration</p>
                    <p className="text-sm text-muted-foreground">
                      Work with unlimited team members
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Advanced Analytics</p>
                    <p className="text-sm text-muted-foreground">
                      Detailed insights and reporting
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Priority Support</p>
                    <p className="text-sm text-muted-foreground">
                      Get help when you need it most
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Custom Integrations</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with your favorite tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Advanced Security</p>
                    <p className="text-sm text-muted-foreground">
                      Enhanced security features
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Manage your payment methods and billing address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Default</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Billing Address</h3>
              <div className="rounded-md border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm">123 Main Street</p>
                  <p className="text-sm">Apt 4B</p>
                  <p className="text-sm">San Francisco, CA 94103</p>
                  <p className="text-sm">United States</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Edit Address
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download your past invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left font-medium">
                        Invoice
                      </th>
                      <th className="h-12 px-4 text-left font-medium">Date</th>
                      <th className="h-12 px-4 text-left font-medium">
                        Amount
                      </th>
                      <th className="h-12 px-4 text-left font-medium">
                        Status
                      </th>
                      <th className="h-12 px-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">INV-001</td>
                      <td className="p-4 align-middle">July 15, 2023</td>
                      <td className="p-4 align-middle">$12.00</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500"
                        >
                          Paid
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">INV-002</td>
                      <td className="p-4 align-middle">June 15, 2023</td>
                      <td className="p-4 align-middle">$12.00</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500"
                        >
                          Paid
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">INV-003</td>
                      <td className="p-4 align-middle">May 15, 2023</td>
                      <td className="p-4 align-middle">$12.00</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant="outline"
                          className="text-green-500 border-green-500"
                        >
                          Paid
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
