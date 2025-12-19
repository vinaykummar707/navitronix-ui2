import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className="container max-w-6xl p-4 mx-auto w-full h-full">
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}