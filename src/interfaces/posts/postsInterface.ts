export interface IPosts {
    id: string;
    image?: string;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface IPostsRequest {
    id: string
    image?: string;
    title: string;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostsResponse {
    id?: string;
    image?: string;
    title?: string;
    text?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostsUpdate {
    image?: string;
    title?: string;
    text?: string;
}
