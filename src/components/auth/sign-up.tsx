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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password has to be 6 or more characters" }),
  username: z.string().min(2, { message: "Name is required" }),
});

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch(apiUrl("/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
    }
  };

  return (
    <main className="bg-white h-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full sm:w-[40%] lg:w-[30%] rounded-xl shadow-2xl border overflow-hidden border-gray-300  bg-white"
        >
          <h1 className="my-4 font-semibold px-6">Sign Up</h1>
          <div className="p-6  space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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

          <Link href="/login" className="text-center text-sm">
            {" "}
            <p className="mb-3 text-sky-500"> Already have an account? Login</p>
          </Link>

          <div className="h-10 bg-stone-600"></div>
        </form>
      </Form>
    </main>
  );
}
