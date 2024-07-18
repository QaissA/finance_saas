import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
}
    from "@/components/ui/sheet"
import { CategoryForm } from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type formValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

    const mutation = useCreateCategory();

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
                        New Category
                    </SheetTitle>
                    <SheetDescription>
                        Create a new category to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{
                    name: "",

                }} />
            </SheetContent>
        </Sheet>
    )
}