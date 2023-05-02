import {
  TextInput,
  PasswordInput,
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

export default function LoginPage() {
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

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
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
                type="text"
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

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const schema = z.object({
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .email("Email format is not valid"),
//   password: z
//     .string()
//     .nonempty("Channel is required")
//     .min(7, "Password must be at least 7 characters"),
// });

// const LoginPage = () => {
//   const form = useForm({
//     defaultValues: {
//       username: "",
//       email: "",
//       channel: "",
//     },
//     resolver: zodResolver(schema),
//   });

//   const { register, handleSubmit, formState } = form;
//   const { errors } = formState;

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <h1>Zod YouTube Form</h1>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div className="form-control">
//           <label htmlFor="email">E-mail</label>
//           <input type="email" id="email" {...register("email")} />
//           <p className="error">{errors.email?.message}</p>
//         </div>

//         <div className="form-control">
//           <label htmlFor="password">Password</label>
//           <input type="text" id="password" {...register("password")} />
//           <p className="error">{errors.password?.message}</p>
//         </div>

//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
