
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { User, Bell, Moon, Sun, Wallet, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    trending: true,
    comments: true,
    followers: true,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900">Settings</h1>
              <p className="text-neutral-500 mt-2">Manage your account preferences</p>
            </header>

            <div className="space-y-6">
              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">Username</label>
                    <Input defaultValue="user123" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700">Email</label>
                    <Input defaultValue="user@example.com" className="mt-1" />
                  </div>
                  <Button variant="outline">Update Account</Button>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Trending Posts</h3>
                      <p className="text-sm text-neutral-500">Get notified about trending market analysis</p>
                    </div>
                    <Switch
                      checked={notifications.trending}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, trending: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">Comments</h3>
                      <p className="text-sm text-neutral-500">Receive notifications about comments on your posts</p>
                    </div>
                    <Switch
                      checked={notifications.comments}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, comments: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">New Followers</h3>
                      <p className="text-sm text-neutral-500">Get notified when someone follows you</p>
                    </div>
                    <Switch
                      checked={notifications.followers}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, followers: checked }))
                      }
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <Moon className="w-5 h-5 mr-2" />
                  Theme Settings
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Dark Mode</h3>
                    <p className="text-sm text-neutral-500">Toggle dark mode on or off</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-neutral-500" />
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                    />
                    <Moon className="w-4 h-4 text-neutral-500" />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Wallet Integration
                </h2>
                <Button variant="outline" className="w-full">Connect Wallet</Button>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Export Data
                </h2>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">Export as CSV</Button>
                  <Button variant="outline" className="w-full">Export as JSON</Button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
