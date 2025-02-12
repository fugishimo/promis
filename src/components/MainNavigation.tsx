
import { Home, TrendingUp, PenTool, BarChart2, Users, Settings } from "lucide-react";
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

const navigationItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Trending Charts", icon: TrendingUp, url: "/trending" },
  { title: "Publish", icon: PenTool, url: "/publish" },
  { title: "Live Markets", icon: BarChart2, url: "/live-markets" },
  { title: "Verified Analysts", icon: Users, url: "/verified-analysts" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const MainNavigation = () => {
  return (
    <Sidebar className="border-r border-neutral-200">
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900">Promis</h1>
          <p className="text-sm text-neutral-500 mt-2">
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
                      className="flex items-center space-x-3 px-6 py-3 text-neutral-600 hover:bg-neutral-100 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainNavigation;
