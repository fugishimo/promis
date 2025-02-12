import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { Upload, Hash, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Publish = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-neutral-900">Publish Analysis</h1>
              <p className="text-neutral-500 mt-2">Share your market insights with the community</p>
            </header>

            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
                  <h3 className="font-medium text-neutral-900 mb-1">Upload Chart Image</h3>
                  <p className="text-sm text-neutral-500 mb-4">Drop your chart image here or click to upload</p>
                  <Button variant="outline">Choose File</Button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-4">Add Details</h3>
                <div className="space-y-4">
                  <Input placeholder="Title of your analysis" />
                  <textarea
                    className="w-full h-32 px-3 py-2 text-base border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Describe your analysis (max 250 characters)"
                    maxLength={250}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-neutral-400" />
                    <Input placeholder="Add tags (e.g., #Bitcoin, #S&P500)" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-accent" />
                    <div>
                      <h3 className="font-medium text-neutral-900">Premium Content</h3>
                      <p className="text-sm text-neutral-500">Make this analysis available to premium users only</p>
                    </div>
                  </div>
                  <Switch
                    checked={isPremium}
                    onCheckedChange={setIsPremium}
                  />
                </div>
              </div>

              <Button className="w-full py-6 text-lg">
                Publish Analysis
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Publish;
