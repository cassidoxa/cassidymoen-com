<script setup lang="ts">
import type { PostInfo, PostInfoResponse, RawPostInfo, RawPostInfoResponse } from '~/types/posts';
import { formatDayMonth } from '~/utils/date';

const config = useRuntimeConfig();
const { data: posts, pending, error, refresh } = await useAsyncData('posts',
    () => $fetch<RawPostInfoResponse>('/api/posts', { baseURL: config.public.apiBase }),
{

    transform: (rawPosts: RawPostInfoResponse): PostInfoResponse => {
      if (!rawPosts || !Array.isArray(rawPosts)) {
        return [] as PostInfoResponse;
      }
      const posts: PostInfoResponse = rawPosts
      .filter(p => p.visible)
      .map((p: RawPostInfo): PostInfo => ({
        ...p,
        date: new Date(p.date),
      }));

      return posts;
    },
} 
)

const sortedPosts = computed(() => {
  if (!posts.value) return []
  
  return [...posts.value].sort((a, b) => {
    return b.date.getTime() - a.date.getTime()
  })
})

const categorizedPosts = computed<Record<string, PostInfo[]>>(() => {
  const categories: Record<string, PostInfo[]> = {};
  sortedPosts.value.forEach(post => {
    const year = post.date.getFullYear();
    const month = post.date.getMonth(); // 0-indexed month
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthYearKey = `${monthNames[month]} ${year}`;
    if (!categories[monthYearKey]) {
      categories[monthYearKey] = [];
    }
    categories[monthYearKey].push(post);
  });

  return categories;
});

useHead({
    title: `cassidy's blog`,
    meta: [
      { name: 'og:title', content: "cassidy's blog" },
      { name: 'og:description', content: 'A collection of posts by cassidy moen' },
      { name: 'og:image', content: 'https://assets.cassidymoen.com/images/cm_logo_400x400.png' },
      { name: 'og:url', content: `${config.public.siteBase}/blog` },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: "cassidy's blog" },
      { name: 'og:locale', content: 'en_US' },
      { name: 'description', content: 'A collection of posts by cassidy moen' },
      { name: 'twitter:title', content: "cassidy's blog" },
      { name: 'twitter:description', content: 'A collection of posts by cassidy moen' },
      { name: 'twitter:image', content: 'https://assets.cassidymoen.com/images/cm_logo_400x400.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@cassidymoen' },
    ],
  });
</script>

<template>
  <div>
    <div v-for="(postsInMonth, monthYear) in categorizedPosts" :key="monthYear">
      <h2>{{ monthYear }}</h2>
        <div v-for="post in postsInMonth" :key="post.slug" class="post-link-container">
          <NuxtLink :to="`/blog/${post.slug}`" class="post-link">
          <span class="post-link-date">{{ formatDayMonth(post.date) }}</span> • {{ post.title }}
        </NuxtLink>
        </div>
    </div>
    <p v-if="Object.keys(categorizedPosts).length === 0">No blog posts.</p>
  </div>
</template>

<style scoped>

.posts-list {
  list-style: none;
  padding: 0;
}

.post-link-container {
  padding-bottom: 1rem;
}

.post-link-date {
  font-family: Roboto Mono;
}
</style>


