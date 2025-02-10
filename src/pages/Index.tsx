
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"following" | "forYou">("forYou");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-50">
        <MainNavigation />
        <main className="flex-1 p-6 ml-[240px]">
          <div className="max-w-[1200px] mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-neutral-900">Promis</h1>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
                    Sign In
                  </button>
                  <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => setActiveTab("following")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "following"
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Following
                </button>
                <button
                  onClick={() => setActiveTab("forYou")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "forYou"
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  For You
                </button>
              </div>
            </header>
            <div className="flex gap-8">
              <Feed activeTab={activeTab} />
              <RightSidebar />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
