import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const f = createUploadthing();

const auth = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");
    return { userId: session.user.id, role: session.user.role };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (user.role !== "ADMIN") throw new Error("Unauthorized");
            return { userId: user.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
