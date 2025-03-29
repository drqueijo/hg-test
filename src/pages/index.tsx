import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { api } from "@/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <DashboardLayout>
      <div>Hello</div>
    </DashboardLayout>
  );
}
