import { DefaultLayout } from "@/components/layouts/default-layout";
import { Login } from "@/components/pages/login";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </DefaultLayout>
  );
}
