import { useAuth } from "@/contexts/AuthContext";
import {
  registerUserUseCase,
  type RegisterUserUseCase,
} from "@/types/user/user.use-cases";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useRegisterForm() {
  const { register: registerAccount, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserUseCase>({
    resolver: zodResolver(registerUserUseCase),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
    },
  });

  const onSubmit = async (data: RegisterUserUseCase) => {
    await registerAccount(data.name, data.email, data.password);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
}
