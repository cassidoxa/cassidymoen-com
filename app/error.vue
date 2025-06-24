<script setup lang="ts">
const error = useError();
</script>

<template>
  <div>
    <h1>
        cassidy<span style="font-weight: lighter;">moen</span>
        <a href="https://github.com/cassidoxa" target="_blank"><Icon name="grommet-icons:github" style="color: black; float: right;" class="social-icon-black"/></a>
        <a href="https://bsky.app/profile/cassidymoen.com" target="_blank"><Icon name="simple-icons:bluesky" style="color: black; float: right;" class="social-icon-black"/></a>
    </h1>
    <NavBar />
    <h2 v-if="error">Error: {{ error.statusCode }} {{ error.message }}</h2>
    <h2 v-else>ERROR!</h2>
  </div>
</template>