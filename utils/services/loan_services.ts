"use server"

import { createClient } from "@/utils/supabase/server";
import { LoanRequest } from "../types";
import { revalidatePath } from "next/cache";
export const approveLoan = async (loan_request_id: number) => {
      const supabase = createClient();
      const loanRequest: Omit<LoanRequest, 'transactions' | 'profile'> | null = await getLoanRequests(loan_request_id);
      if(loanRequest && loanRequest.status === "PENDING"){
         const transactions = []
         for(let i = 0; i < loanRequest.selected_period; i++){
             transactions.push({
                 amount: loanRequest.installment_per_month,
                 status: "PENDING",
                 loan_request_id: loanRequest.id,
                 date: new Date(new Date().setMonth(new Date().getMonth() + i + 1)).toISOString()
             })
         }
        const { data, error } = await supabase
                .from("loan_transactions")
                .insert(transactions);
        await supabase.from("loan_requests").update({status: "ACTIVE"}).eq("id", loan_request_id);
        revalidatePath("/loan_requests")
      }
}

export const rejectLoan = async (loan_request_id: number) => {
    const supabase = createClient();
    await supabase.from("loan_requests").update({status: "REJECTED"}).eq("id", loan_request_id);
    revalidatePath("/loan_requests")
}

export const getLoanRequests = async (loan_request_id: number) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("loan_requests")
        .select("*").eq("id", loan_request_id);
    return data ? data[0] : null;
}

export const payTransaction = async (transaction_id: number) => {
    const supabase = createClient();
    await supabase.from("loan_transactions").update({status: "PAID"}).eq("id", transaction_id);
    revalidatePath("/loan_requests")
}