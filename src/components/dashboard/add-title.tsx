"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
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
import { apiUrl } from "@/lib/constants";
import { useAccount } from "wagmi";
import { useState } from "react";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
});
export default function AddTitle() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { token } = useAuthContext();

  const { isConnected } = useAccount();

  const client = useQueryClient();

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch(apiUrl("/title"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      client.invalidateQueries({
        queryKey: [apiUrl("/title")],
      });

      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!isConnected) {
          Swal.fire({
            title: "Info!",
            text: "Please Connect Wallet",
            toast: true,
            position: "top-end",
            timer: 2800,
          });
          return;
        }

        setOpen(open);
      }}
    >
      <DialogTrigger className="rounded-lg py-2 px-4 bg-black shadow-md text-white">
        Add Title
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Title</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-4">
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
