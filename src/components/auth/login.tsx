"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { apiUrl } from "@/lib/constants";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password has to be 6 or more characters" }),
});

export default function Login() {
  const { saveToken } = useAuthContext();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();

        saveToken(data.token);
        router.push("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <main className="bg-white h-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          role="form"
          className=" w-full  sm:w-[50%] lg:w-[34%] rounded-xl shadow-2xl border overflow-hidden border-gray-300  bg-white"
        >
          <h1 className="my-4 font-semibold px-6">Login to Dashboard</h1>
          <div className="px-6 py-6  space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </div>

          <Link href="/signup" className="text-center text-sm">
            {" "}
            <p className="mb-3 text-sky-500"> Dont have an account? Signup</p>
          </Link>

          <div className="h-10 bg-stone-600"></div>
        </form>
      </Form>
    </main>
  );
}
