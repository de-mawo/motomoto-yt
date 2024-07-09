"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CiCreditCard2 } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { useState } from "react";
import CardPayment from "./CardPayment";
import CashPayment from "./CashPayment";

const PaymentMethods = () => {
  const [method, setMethod] = useState("card");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Select a suitable payment method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem
              value="card"
              onClick={() => setMethod("card")}
              id="card"
              className="peer sr-only"
            />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CiCreditCard2 className="mb-3 h-6 w-6" />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="cash"
              onClick={() => setMethod("cash")}
              id="cash"
              className="peer sr-only"
            />
            <Label
              htmlFor="cash"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <BsCashCoin className="mb-3 h-6 w-6" />
              Cash
            </Label>
          </div>
        </RadioGroup>
        {method === "card" && <CardPayment method={method} />}
        {method === "cash" && <CashPayment method={method} />}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
