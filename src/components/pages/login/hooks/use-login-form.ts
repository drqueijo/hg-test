import { useAuth } from "@/contexts/auth-contenxt";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserUseCase,
  type LoginUserUseCase,
} from "@/types/user/user.use-cases";
import { useForm } from "react-hook-form";

export function useLoginForm() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserUseCase>({
    resolver: zodResolver(loginUserUseCase),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUserUseCase) => {
    await login(data.email, data.password);
  };

  return {
    handleSubmit,
    errors,
    register,
    onSubmit,
    isLoading,
  };
}
