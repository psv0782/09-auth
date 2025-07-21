import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import fetchServerNoteById from "@/lib/api/serverApi";

interface NoteModalProps {
    params: Promise<{ id: string }>;
}

export default async function NoteModal({params}: NoteModalProps) {
    const {id} = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchServerNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient/>
        </HydrationBoundary>
    );
}
