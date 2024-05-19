"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import LoanActionButtons from "@/components/LoanActionButtons";
import { LoanRequest } from "@/utils/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { payTransaction } from "@/utils/services/loan_services";

export default function LoanRequestsTable({
  loan_requests,
}: {
  loan_requests: LoanRequest[] | null;
}) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">#</TableHead>
          <TableHead className="text-xs">User</TableHead>
          <TableHead className="text-xs">Amount requested (GHS)</TableHead>
          <TableHead className="text-xs">Period of payment (Months)</TableHead>
          <TableHead className="text-xs">Interest Rate</TableHead>
          <TableHead className="text-xs">Total Amount To Pay (GHS)</TableHead>
          <TableHead className="text-xs">Payment Per Month (GHS)</TableHead>
          <TableHead className="text-xs">Status</TableHead>
          <TableHead className="text-xs">Date requested</TableHead>
          <TableHead className="text-xs"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loan_requests &&
          loan_requests.map((loan_request, index) => (
            <>
              <TableRow
                key={loan_request.id}
                className={selectedRow == index ? "bg-gray-300" : "bg-white"}
              >
                <TableCell className="font-medium text-xs">
                  {index + 1}
                </TableCell>
                <TableCell className="text-xs">{`${loan_request.profile.first_name} ${loan_request.profile.last_name}`}</TableCell>
                <TableCell className="text-xs">
                  {loan_request.requested_amount}
                </TableCell>
                <TableCell className="text-xs">
                  {loan_request.selected_period}
                </TableCell>
                <TableCell className="text-xs">
                  {loan_request.interest_rate}
                </TableCell>
                <TableCell className="text-xs">
                  {loan_request.total_amount_to_pay}
                </TableCell>
                <TableCell className="text-xs">
                  {loan_request.installment_per_month}
                </TableCell>
                <TableCell className="text-xs">
                  {new Date(loan_request.created_at).toDateString()}
                </TableCell>
                <TableCell className="text-xs">
                  <Badge
                    variant={
                      loan_request.status === "ACTIVE" ? "outline" : "default"
                    }
                    className={cn("bg-green-400 text-white text-xs", {
                      "bg-yellow-400": loan_request.status === "PENDING",
                      "bg-red-400": loan_request.status === "REJECTED",
                      "bg-white text-black": loan_request.status === "ACTIVE",
                    })}
                  >
                    {loan_request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <LoanActionButtons
                    loan_request={loan_request}
                    setSelectedRow={() => setSelectedRow(index)}
                    isViewing={selectedRow === index}
                  />
                </TableCell>
              </TableRow>

              {loan_request.transactions.length > 0 && selectedRow == index && (
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={10}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Date</TableHead>
                          <TableHead className="text-xs">Amount</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                          <TableHead className="text-xs"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loan_request.transactions
                          .sort((a, b) => a.id - b.id) // Sort transactions by id
                          .map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="text-xs">
                                {new Date(transaction.date).toDateString()}
                              </TableCell>
                              <TableCell className="text-xs">
                                {transaction.amount}
                              </TableCell>
                              <TableCell className="text-xs">
                                <Badge
                                  variant={
                                    transaction.status === "PENDING"
                                      ? "default"
                                      : "outline"
                                  }
                                  className={cn(
                                    "bg-green-400 text-xs text-white",
                                    {
                                      "bg-yellow-400":
                                        transaction.status === "PENDING",
                                      "bg-red-400":
                                        transaction.status === "REJECTED",
                                      "bg-white text-black":
                                        transaction.status === "ACTIVE",
                                    }
                                  )}
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs">
                                {transaction.status === "PENDING" && (
                                  <Button
                                    variant={"outline"}
                                    onClick={() => {
                                      payTransaction(transaction.id);
                                    }}
                                  >
                                    Pay
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
      </TableBody>
    </Table>
  );
}
