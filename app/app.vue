<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const titleStrings: { [key:string]: string } = {
  '': '',
  'about': '\'s blurb',
  'blog': '\'s blog',
  'posts': '\'s blog',

};
const routeSplit: ComputedRef<string[]> = computed(() => { return route.path.split('/'); });

const atomUrl: string = `${config.public.siteBase}/blog/atom`;
</script>

<template>
<div>
  <div>
    <h1>
      cassidy<span style="font-weight: lighter;">moen</span>{{ titleStrings[routeSplit[1] ?? ''] }}
    </h1>
    
  </div>
  <div>
    <a :href="atomUrl"><Icon name="fa6-solid:rss" class="social-icon-black" /></a>
    <a href="https://github.com/cassidoxa" target="_blank"><Icon name="grommet-icons:github" class="social-icon-black"/></a>
    <a href="https://bsky.app/profile/cassidymoen.com" target="_blank"><Icon name="simple-icons:bluesky" class="social-icon-black"/></a>
    <a href="https://twitch.tv/cassidymoen" target="_blank"><Icon name="simple-icons:twitch" class="social-icon-black"/></a>
  </div>
</div>
  <NavBar />
  <NuxtPage />
</template>