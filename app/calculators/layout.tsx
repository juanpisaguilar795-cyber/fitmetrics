// app/calculators/layout.tsx
import Sidebar from '@/components/layout/Sidebar'

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-[#0a0a0a] [&>*]:mx-auto">
        {children}
      </main>
    </div>
  )
}
