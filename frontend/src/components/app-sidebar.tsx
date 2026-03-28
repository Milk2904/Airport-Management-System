import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  PlaneTakeoffIcon,
  UsersIcon,
  DoorOpenIcon,
  IdCardIcon,
  ChartBarIcon,
  FileWarningIcon,
  BookIcon,
  FolderIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  Building2Icon,
} from "lucide-react";

const data = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Flights", url: "/flights", icon: PlaneTakeoffIcon },
    { title: "Passengers", url: "/passengers", icon: UsersIcon },
    { title: "Aircraft", url: "/aircraft", icon: PlaneTakeoffIcon },
    { title: "Airlines", url: "/airlines", icon: Building2Icon },
    { title: "Employees", url: "/employees", icon: IdCardIcon },
    { title: "Airports", url: "/airports", icon: DoorOpenIcon },
    { title: "Analytics", url: "/analytics", icon: ChartBarIcon },
  ],
  documents: [
    { name: "Incident Reports", url: "/reports", icon: FileWarningIcon },
    { name: "Operation Manuals", url: "/manuals", icon: BookIcon },
    { name: "Documents Center", url: "/documents", icon: FolderIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: Settings2Icon },
    { title: "Get Help", url: "/help", icon: CircleHelpIcon },
    { title: "Search", url: "/search", icon: SearchIcon },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <a href="/">
                <img src="./src/assets/Logo.png" alt="logo" className="size-7" />
                <span className="text-base font-semibold">
                  Milkyway Airport
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
