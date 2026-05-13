import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { GamificationPage } from '@/pages/gamification'
import { Header } from '@/components/header'

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset >
        <main className="mx-auto w-full max-w-[960px] ">
        <Header title="Gamification" />
          <GamificationPage />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
