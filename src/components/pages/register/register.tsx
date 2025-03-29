import { cn } from "@/lib/utils";
import { useRegisterForm } from "./hooks/use-register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RegisterProps } from "./register.types";

export function Register({ className, ...props }: RegisterProps) {
  const { errors, handleSubmit, isLoading, onSubmit, register } =
    useRegisterForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  placeholder="john doe"
                  errors={errors.name?.message}
                  {...register("name")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  errors={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  errors={errors.password?.message}
                  {...register("password")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password confirmation</Label>
                <Input
                  type="password"
                  errors={errors.passwordConfirmation?.message}
                  {...register("passwordConfirmation")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button disabled={isLoading} type="submit" className="w-full">
                  Create account
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
