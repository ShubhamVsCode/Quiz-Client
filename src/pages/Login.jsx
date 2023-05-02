import {
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/user";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authState, setUser } from "../redux/features/auth";

export default function LoginPage() {
  const user = useSelector(authState);

  const schema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Email format is not valid"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const [loginFunction, loginResponse] = useLoginMutation();

  const onSubmit = (data) => {
    loginFunction(data);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginResponse.isSuccess) {
      toast.success("Login successfully!");
      localStorage.setItem("token", loginResponse.data?.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.data?.user));
      dispatch(
        setUser({
          success: true,
          user: loginResponse.data?.user,
          token: loginResponse.data?.token,
        })
      );
      return navigate("/dashboard");
    }
    if (loginResponse.isError) {
      toast.error(loginResponse?.error?.data?.message);
    }
  }, [loginResponse]);

  if (user?.token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container size={420} my={40}>
      <DevTool control={control} />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link className="text-primaryBlue hover:underline" to={"/register"}>
          Create account
        </Link>
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <div className="space-y-5">
            <div className="text-left flex flex-col">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`border px-3 py-2 rounded focus:outline-2 outline-primaryBlue ${
                  errors.email?.message &&
                  "border-2 border-red-400 outline-red-400"
                }`}
              />
              <p className="error text-sm text-red-500">
                {errors.email?.message}
              </p>
            </div>

            <div className="text-left flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`border px-3 py-2 rounded focus:outline-2 outline-primaryBlue ${
                  errors.password?.message &&
                  "border-2 border-red-400 outline-red-400"
                }`}
              />
              <p className="error text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            className="bg-primaryBlue hover:bg-primaryBlue/90 duration-150"
            fullWidth
            mt="xl"
            type="submit"
          >
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
