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

// Keep an eye on https://github.com/nuxt/nuxt/issues/29290
// We can also rework some of the error/not found handling if "throw createError" will
// work on server components or if we can find some way to redirect to error.vue.
if (post.value) {
  const postTitle = post.value.title;
  const postImage = post.value.image ?? 'https://assets.cassidymoen.com/images/cm_logo_400x400.png';
  useHead({
    title: `${postTitle} | cassidy's blog`,
    meta: [
      { property: 'og:title', content: `${postTitle} | cassidy's blog` },
      { property: 'og:description', content: post.value.description},
      { property: 'og:image', content: postImage },
      { property: 'og:url', content: `${config.public.siteBase}/blog/${post.value.slug}` },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: "cassidy's blog" },
      { property: 'og:locale', content: 'en_US' },
      { property: 'description', content: `Blog post: ${postTitle} by cassidy moen` },

      { name: 'twitter:title', content: `${postTitle} | cassidy's blog` },
      { name: 'twitter:description', content: post.value.description },
      { name: 'twitter:image', content: postImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@cassidymoen' },
    ],
  });
} else {
  useHead({
    title: `Post not found | cassidy's blog`,
    meta: [
      { name: 'description', content: `Post Not Found` },
    ],
  });
}

if (error.value) {
  useSeoMeta({
    title: "Error | cassidy's blog",
    ogTitle: "Error | cassidy's blog",
  })
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