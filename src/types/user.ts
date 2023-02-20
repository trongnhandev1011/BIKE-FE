export type User = {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    card: string;
    averagePoint: number;
    status: "ACTIVE" | "INACTIVE";
    // createdAt: Date;
    // updatedAt: Date;
}

export type UserTableHeaderType = Pick<
    User,
    "avatar" | "email" | "name" | "phone" |  "status"
>;
