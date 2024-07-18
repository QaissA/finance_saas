"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { Loader2, Plus } from "lucide-react"
import { columns } from "./column";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBuldDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";


const CategoriesPage = () => {
    const newCategory = useNewCategory();
    const deleteCategories = useBuldDeleteCategories();
    const categoriessQuery = useGetCategories();
    const categories = categoriessQuery.data || [];

    const isDisabled = categoriessQuery.isLoading || deleteCategories.isPending;

    if (categoriessQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:justify-between lg:items-center">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>
                    <Button size="sm" onClick={newCategory.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={isDisabled} onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteCategories.mutate({ ids });
                    }} filterKey="name" columns={columns} data={categories} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage