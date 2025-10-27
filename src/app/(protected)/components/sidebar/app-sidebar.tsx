"use client";

import {
  Archive,
  LogOut,
  NotebookPenIcon,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

import { NavMain } from "./nav-main";

// This is sample data.

const data = {
  navMain: [
    {
      label: "Menu",
      items: [
        {
          title: "Cadastros",
          url: "#",
          icon: NotebookPenIcon,
          items: [
            {
              title: "Fornecedores",
              url: "/fornecedores",
            },
          ],
        },
      ],
    },
    {
      label: "Veículos",
      items: [
        {
          title: "Veículos",
          url: "#",
          icon: Wrench,
          items: [
            {
              title: "Cadastro",
              url: "/veiculos",
            },
          ],
        },
      ],
    },
    {
      label: "Manutenção",
      items: [
        {
          title: "Ordens de Serviço",
          url: "#",
          icon: Wrench,
          items: [
            {
              title: "Solicitações",
              url: "/manutencoes",
            },
          ],
        },
      ],
    },
    {
      label: "Estoque",
      items: [
        {
          title: "Produtos e Serviços",
          url: "#",
          icon: Archive,
          items: [
            {
              title: "Cadastro",
              url: "/estoque",
            },
          ],
        },
      ],
    },
    {
      label: "Compras",
      items: [
        {
          title: "Gestão de Compras",
          url: "#",
          icon: ShoppingCart,
          items: [
            {
              title: "Compras",
              url: "/compras",
            },
          ],
        },
      ],
    },
    {
      label: "RH",
      items: [
        {
          title: "Funcionários",
          url: "/funcionarios",
          icon: Users,
          items: [
            {
              title: "Cadastro",
              url: "/funcionarios",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <h1 className="justify-center pt-4 text-center text-2xl font-bold">
        GCS
      </h1>
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarFallback>
                      {session.data?.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{session.data?.user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {session.data?.user.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
