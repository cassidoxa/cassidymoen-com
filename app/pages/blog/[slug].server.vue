<script setup lang="ts">
import type { RawBlogPost, BlogPost } from '~/types/posts';
import { formatMonthDayYear } from '~/utils/date';

const config = useRuntimeConfig();
const route = useRoute();
const { data: post, error} = await useFetch(`/api/posts/${route.params.slug}`,
  {
    baseURL: config.public.apiBase,
      transform: (rawPost: RawBlogPost): BlogPost => {
        const post = {
          ...rawPost,
          date: new Date(rawPost.date),
          last_updated: new Date(rawPost.last_updated),
        } 

        return post;
      },
  } 
)
const postTitle = `${post.value?.title}`;
useSeoMeta({
  title: `${postTitle} | cassidy's blog`,
  ogTitle: `${postTitle} | cassidy's blog`,
  ogType: "article",
  description: `Blog post: ${postTitle} by cassidy moen`,
  ogUrl: `${config.public.siteBase}/blog/${post.value?.slug}`,
  ogImage: "https://assets.cassidymoen.com/images/cm_logo_400x400.png"
});

if (!post.value) {
  useSeoMeta({
    title: "Post not found | cassidy's blog",
    ogTitle: "Post not found | cassidy's blog",
    description: "Post not found.",
    ogDescription: "Post not found."
  })
/*   throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal:true
  }); */
}
if (error.value) {
  useSeoMeta({
    title: "Error | cassidy's blog",
    ogTitle: "Error | cassidy's blog",
  })
/*   throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || "Server error",
    fatal:true
  }) */
}
</script>

<template>
  <div v-if="post">
    <article>
    <h1>{{ post.title }}</h1>
    <div class="post-date">
        {{ formatMonthDayYear(post?.date) }}<span class="post-edited" v-if="post?.edited"> • Last updated: {{ formatMonthDayYear(post?.last_updated) }}</span>
        <br>
    </div>
    <br>
    <div v-html="post.text" class="post-text"></div>
    </article>
  </div>
  <div v-else>
    <h2>Post not found</h2>
  </div>
</template>

<style scoped>
.post-date {
    font-family: Roboto Mono;
}

.post-edited {
    font-weight: 300;
}
</style>