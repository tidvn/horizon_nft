import DashboardLayout from "@/components/layout"

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <DashboardLayout>
    {children}
    </DashboardLayout>
    </>
  )
}
