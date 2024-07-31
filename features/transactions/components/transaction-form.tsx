import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertAccountSchema, insertTransactionsSchema } from "@/db/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { convertAmountToMiliunits } from "@/lib/utils";
import Datepicker from "@/components/datepicker";
import Select from "@/components/select";
import { Textarea } from "@/components/ui/textarea";
import AmountInput from "@/components/amount-input";


const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
})

const apischema = insertTransactionsSchema.omit({
    id: true,
})

type formValues = z.input<typeof formSchema>;
type apiFormValues = z.input<typeof apischema>

type Props = {
    id?: string;
    defaultValues?: formValues;
    onSubmit: (values: apiFormValues) => void;
    onDelete?: () => void;
    disabled: boolean;
    accountOptions: { label: string, value: string }[];
    categoryOptions: { label: string, value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory
}: Props) => {
    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: formValues) => {
        const amount = parseFloat(values.amount);
        const amountInMiliunits = convertAmountToMiliunits(amount);
        onSubmit({
            ...values,
            amount: amountInMiliunits,
        });
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField name="date" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Datepicker value={field.value} onChange={field.onChange} disabled={disabled} />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField
                    name="accountId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an anccount"
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select a category"
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='payee'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="Add a payee"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='amount'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    placeholder="0.00"

                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='notes'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disabled}
                                    placeholder="Optional notes"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    {id ? "save changes" : "Create transaction"}
                </Button>
                {
                    !!id && (
                        <Button
                            type="button"
                            disabled={disabled}
                            onClick={handleDelete}
                            className="w-full"
                            variant="outline"
                        >
                            <Trash className="size-4 mr-2">
                                Delete transaction
                            </Trash>
                        </Button>
                    )
                }
            </form>
        </Form>
    )
};
