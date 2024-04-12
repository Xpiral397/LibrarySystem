import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex  h-full  space-x-2 w-full">
      {/* <Sidebar /> */}
      {children}
    </section>
  );
}
