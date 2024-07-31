import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
}
    from "@/components/ui/sheet"
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { useCreateTransaction } from "../api/use-create-transactions";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-accounts";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionsSchema.omit({
    id: true,
});

type formValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    const mutation = useCreateTransaction();

    const queryCategory = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({
        name
    });

    const categoryOptions = (queryCategory.data ?? []).map((category) => ({
        label: category.name,
        value: category.id
    }));

    const queryAccount = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    });

    const accountOptions = (queryAccount.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending = mutation.isPending || categoryMutation.isPending || accountMutation.isPending;

    const isLoading = queryCategory.isLoading || queryAccount.isLoading;

    const onSubmit = (values: formValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Create a new transaction to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <TransactionForm
                            onSubmit={onSubmit}
                            disabled={false}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount} />
                    )
                }

            </SheetContent>
        </Sheet>
    )
}