import { DefaultLayout } from "@/components/layouts/default-layout";
import { Register } from "@/components/pages/register";

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <div className="w-full max-w-sm">
        <Register />
      </div>
    </DefaultLayout>
  );
}
