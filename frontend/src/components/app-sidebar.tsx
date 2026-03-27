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
  LuggageIcon,
  DoorOpenIcon,
  IdCardIcon,
  PackageSearchIcon,
  ChartBarIcon,
  FileWarningIcon,
  BookIcon,
  FolderIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
} from "lucide-react";

const data = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Flights",
      url: "#",
      icon: <PlaneTakeoffIcon />,
    },
    {
      title: "Passengers",
      url: "#",
      icon: <UsersIcon />,
    },
    {
      title: "Baggage",
      url: "#",
      icon: <LuggageIcon />,
    },
    {
      title: "Gates & Terminals",
      url: "#",
      icon: <DoorOpenIcon />,
    },
    {
      title: "Staff & Crew",
      url: "#",
      icon: <IdCardIcon />,
    },
    {
      title: "Cargo & Logistics",
      url: "#",
      icon: <PackageSearchIcon />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <ChartBarIcon />,
    },
  ],
  documents: [
    {
      name: "Incident Reports",
      url: "#",
      icon: <FileWarningIcon />,
    },
    {
      name: "Operation Manuals",
      url: "#",
      icon: <BookIcon />,
    },
    {
      name: "Documents Center",
      url: "#",
      icon: <FolderIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                {/* <CommandIcon className="size-5!" /> */}
                <img
                  src="./src/assets/Logo.png"
                  alt="logo"
                  className="size-7!"
                />
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
