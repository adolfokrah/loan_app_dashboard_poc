"use client";

import { LoanRequest } from "@/utils/types";
import { Button } from "./ui/button";
import { approveLoan, rejectLoan } from "@/utils/services/loan_services";

export default function LoanActionButtons({
  loan_request,
  setSelectedRow,
  isViewing,
}: {
  loan_request: LoanRequest;
  setSelectedRow: () => void;
  isViewing: boolean;
}) {
  return (
    <>
      {loan_request.status === "PENDING" ? (
        <div className="flex gap-2">
          <Button
            size={"sm"}
            variant={"default"}
            onClick={() => {
              approveLoan(loan_request.id);
            }}
          >
            Approve
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={() => {
              rejectLoan(loan_request.id);
            }}
          >
            Reject
          </Button>
        </div>
      ) : (
        <>
          {["ACTIVE", "PAID"].includes(loan_request.status) && (
            <Button
              size={"sm"}
              variant={isViewing ? "default" : "outline"}
              onClick={setSelectedRow}
            >
              {isViewing ? "Viewing" : "View"}
            </Button>
          )}
        </>
      )}
    </>
  );
}
