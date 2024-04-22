import { ScrollShadow } from "@nextui-org/react";

import AdminRightSideSidebar from "../adminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex  h-screen  w-full">
      <ScrollShadow
        orientation="vertical"
        hideScrollBar={true}
        className="max-h-screen h-screen w-full"
      >
        {children}
      </ScrollShadow>
      {/* <AdminRightSideSidebar current={"Add"} /> */}
    </section>
  );
}
