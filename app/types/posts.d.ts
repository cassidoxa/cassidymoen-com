export interface RawPostInfo {
    title: string,
    slug: string,
    date: string,
    visible: boolean
};

export interface PostInfo {
    title: string,
    slug: string,
    date: Date,
    visible: boolean
};

export type RawPostInfoResponse = RawPostInfo[];
export type PostInfoResponse = PostInfo[];

export interface RawBlogPost {
    title: string,
    slug: string,
    blog_title: string,
    author: string,
    text: string,
    description: string,
    image: string | null,
    tags: string[] | null,
    date: string,
    last_updated: string,
    visible: boolean,
    edited: boolean
}

export interface BlogPost {
    title: string,
    slug: string,
    blog_title: string,
    author: string,
    text: string,
    description: string,
    image: string | null,
    tags: string[] | null,
    date: Date,
    last_updated: Date,
    visible: boolean,
    edited: boolean
}