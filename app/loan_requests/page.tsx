import { createClient } from "@/utils/supabase/server";
import { LoanRequest } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import LoanActionButtons from "@/components/LoanActionButtons";
import LoanRequestsTable from "@/components/LoanRequestsTable";

export default async function Notes() {
  const supabase = createClient();
  const { data } = await supabase
    .from("loan_requests")
    .select("*, transactions:loan_transactions(*), profile:profiles(*)")
    .order("id", { ascending: false });

  const loan_requests: LoanRequest[] | null = data;

  return (
    <>
      <Card className="shadow-none w-4/5 mx-auto mt-14">
        <CardHeader></CardHeader>
        <CardContent>
          <LoanRequestsTable loan_requests={loan_requests} />
        </CardContent>
      </Card>
    </>
  );
}
