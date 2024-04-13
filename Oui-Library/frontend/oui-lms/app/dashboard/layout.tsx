import { ScrollShadow } from "@nextui-org/react";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex  h-screen  w-full">
      <Sidebar />
      <ScrollShadow
        orientation="vertical"
        hideScrollBar={true}
        className="max-h-screen h-screen w-full"
      >
        {children}
      </ScrollShadow>
    </section>
  );
}
