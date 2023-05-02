import {
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/user";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authState, setUser } from "../redux/features/auth";

export default function RegisterPage() {
  const user = useSelector(authState);

  const schema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, { message: "Name must have at least 2 characters" }),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Email format is not valid"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, { message: "Password must be at least 6 characters" }),
    gender: z.string().nonempty("Gender is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  const [registerFunction, registerResponse] = useRegisterMutation();

  const onSubmit = (data) => {
    registerFunction({
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerResponse.isSuccess) {
      toast.success("Registered successfully!");
      localStorage.setItem("token", registerResponse.data?.token);
      localStorage.setItem("user", JSON.stringify(registerResponse.data?.user));
      dispatch(
        setUser({
          success: true,
          user: registerResponse.data?.user,
          token: registerResponse.data?.token,
        })
      );
      return navigate("/dashboard");
    }
    if (registerResponse.isError) {
      toast.error(registerResponse?.error?.data?.message);
    }
  }, [registerResponse]);

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
        Welcome to Our App!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link className="text-primaryBlue hover:underline" to={"/login"}>
          Login
        </Link>
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <div className="space-y-5">
            <div className="text-left flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`border border-black/30 px-3 py-2 rounded focus:outline-2 outline-primaryBlue ${
                  errors.name?.message &&
                  "border-2 border-red-400 outline-red-400"
                }`}
              />
              <p className="error text-sm text-red-500">
                {errors.name?.message}
              </p>
            </div>

            <div className="text-left flex flex-col">
              <label htmlFor="gender">Gender</label>
              <Select
                {...register("gender")}
                onChange={(value) => setValue("gender", value)}
                id="gender"
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
              <p className="error text-sm text-red-500">
                {errors.gender?.message}
              </p>
            </div>

            <div className="text-left flex flex-col">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`border border-black/30 px-3 py-2 rounded focus:outline-2 outline-primaryBlue ${
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
                className={`border border-black/30 px-3 py-2 rounded focus:outline-2 outline-primaryBlue ${
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
