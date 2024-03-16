"use client"

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { customerFormProps } from "../../types/formTypes";
import { Button } from "../ui/button";
import { CustomerForm } from "@/types/customers";
import { useRouter } from "next/navigation";
import { onSubmit } from "@/utils/formUtils/customerForm";

const CustomerForm = ({data}: CustomerForm) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<customerFormProps>();

  const router = useRouter();

  useEffect(() =>{
      if(data != null) {
        setValue("name", data.name as string);
        setValue("address", data.address as string);
        setValue("email", data.email as string);
        setValue("phone", data.phone as string);
      }
  }, [])


  return (
    <form
        className="bg-neutral100 rounded-lg p-4 flex flex-col gap-2 w-full mx-4 tablet:w-1/2"
        onSubmit={handleSubmit(onSubmit({data, router}))}
    >
        <div className="flex flex-col gap-1 border-b border-blue-700">
            <label>name</label>
            <input
                {...register("name")}
            ></input>
        </div>
        <div className="flex flex-col gap-1 border-b border-blue-700">
            <label>address</label>
            <input
                {...register("address")}
            ></input>
        </div>
        <div className="flex flex-col gap-1 border-b border-blue-700">
            <label>email</label>
            <input
                {...register("email")}
            ></input>
        </div>
        <div className="flex flex-col gap-1 border-b border-blue-700">
            <label>phone</label>
            <input
                {...register("phone")}
            ></input>
        </div>
        <Button
             className=""
        >
            Submit
        </Button>
    </form>
  );
}

export default CustomerForm;