import type { APIRoute } from "astro";
import { type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@components/og/generateOgImages.tsx";
import { getAllPosts } from "@utils/content-utils";

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"posts">),
    {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
};
