import { fetchPosts } from "./query/fetchPosts";

export async function initReddit() {
    console.log(await fetchPosts())
}