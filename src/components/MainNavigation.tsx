
import { Home, TrendingUp, PenTool, BarChart2, Users, Settings, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const navigationItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Trending Charts", icon: TrendingUp, url: "/trending" },
  { title: "Publish", icon: PenTool, url: "/publish" },
  { title: "Live Markets", icon: BarChart2, url: "/live-markets" },
  { title: "Verified Analysts", icon: Users, url: "/verified-analysts" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const MainNavigation = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <Sidebar className="border-r border-neutral-200">
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground">Promis</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Decentralized Market Analysis
          </p>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-3 px-6 py-3 text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-start space-x-3 px-6 py-3 text-muted-foreground hover:bg-muted transition-colors"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainNavigation;
