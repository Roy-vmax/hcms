// components/forms/PaymentMethodForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Fix import path

// Form validation schema
const PaymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
});

type PaymentFormValues = z.infer<typeof PaymentFormSchema>;

export const PaymentMethodForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (values: PaymentFormValues) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // This is just for demonstration - not actually connecting to anything
    console.log("Payment method added:", values);

    // Reset form and close it
    form.reset();
    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <div className="absolute top-4 right-4 z-30">
      {!showForm ? (
        <Button
          className="shad-primary-btn flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <Image
            src="/assets/icons/credit-card.svg"
            width={16}
            height={16}
            alt="Add Payment Method"
            className="h-4 w-4"
          />
          Add Payment Method
        </Button>
      ) : (
        <Card className="w-80 bg-dark-400 border border-dark-500 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-16-semibold flex justify-between">
              <span>Add Payment Method</span>
              <button
                onClick={() => setShowForm(false)}
                className="text-dark-600 hover:text-white"
              >
                ✕
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="cardNumber"
                  label="Card Number"
                  placeholder="4242 4242 4242 4242"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="cardholderName"
                  label="Cardholder Name"
                  placeholder="John Doe"
                />

                <div className="flex gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="expiryDate"
                    label="Expiry Date"
                    placeholder="MM/YY"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="cvv"
                    label="CVV"
                    placeholder="123"
                  />
                </div>

                <SubmitButton
                  isLoading={isLoading}
                  className="shad-primary-btn w-full mt-2"
                >
                  Save Payment Method
                </SubmitButton>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="pt-0 pb-2">
            <p className="text-12-regular text-dark-600 text-center w-full">
              Your payment information is secure and encrypted
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};