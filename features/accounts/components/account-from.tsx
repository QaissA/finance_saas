import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertAccountSchema } from "@/db/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type formValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: formValues;
    onSubmit: (values: formValues) => void;
    onDelete?: () => void;
    disabled: boolean;
};

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: formValues) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input disabled={disabled} placeholder="e.g CIH BANK, BMCE BANK, POPULAR BANK" {...field} />
                        </FormControl>
                    </FormItem>
                )} />
                <Button className="w-full" disabled={disabled}>
                    {id ? "save changess" : "create account"}
                </Button>
                {!!id && <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant="outline">
                    <Trash className="size-4 " />
                    <span className="ml-2">Delete Account</span>
                </Button>
                }

            </form>
        </Form>
    )
};
