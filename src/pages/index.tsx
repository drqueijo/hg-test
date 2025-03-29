import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Dashboard } from "@/components/pages/dashboard/dashboard";
import { DashboardProvider } from "@/contexts/dashboard-context";
import { api } from "@/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <DashboardLayout>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </DashboardLayout>
  );
}
