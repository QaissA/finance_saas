"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts"
import { Plus } from "lucide-react"
import { Payment, columns } from "./column";
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52Ef",
        amount: 50000,
        status: "success",
        email: "a@example.com",
    },
]

const AccountsPage = () => {
    const newAccount = useNewAccount();

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
                    <CardTitle className="text-xl line-clamp-1">
                        Account Page
                    </CardTitle>
                    <Button size="sm" onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={true} onDelete={() => { }} filterKey="email" columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage