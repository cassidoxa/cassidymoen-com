<script setup lang="ts">
type NavigationLink = {label: string, path: string};

const route = useRoute();
const navLinks: NavigationLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
];
const isActive = (linkPath: string) => {
  if (linkPath === '/') {
    return route.path === '/';
  }

  return route.path.startsWith(linkPath);
};
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link.path">
        <NuxtLink 
          :to="link.path" 
          class="nav-link"
          :class="{ 'active': isActive(link.path) }"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0rem 0rem 1rem;
  background-color: #ffffff;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  position: relative;
  color: #333;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 4px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff0000;
  transition: width 0.08s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active::after {
  width: 100%;
  background-color: #000000;
}
</style>