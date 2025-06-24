<script setup lang="ts">
useSeoMeta({
  title: `cassidy's blurb`,
  ogTitle: `cassidy's blurb`,
  ogType: "website",
  description: `A little bit about cassidymoen`,
  ogUrl: `https://cassidymoen.com/about`,
  ogImage: "https://assets.cassidymoen.com/images/cm_logo_400x400.png"
});
</script>

<template>
  <div>
  <p>
    I am a programmer probably most known for my work on the <a href="https://alttpr.com" target="_blank">A Link to the Past Randomizer</a>. I am also a
    programmer for the Super Metroid <a href="https://www.dashrando.net/" target="_blank">DASH Randomizer</a> and have contributed to several other randomizers
    including the Super Metroid/A Link to the Past Combo Randomizer and Final Fantasy 4: Free Enterprise.
  </p>
  <p>
    Primary interests and skills are (vaguely): backend/CLI/library/systems-type programming and reverse engineering. In addition to randomizer application code
    and tools, I have written a <a href="https://github.com/KatDevsGames/z3randomizer">substantial amount</a> of
    <a href="https://github.com/dashrando/dash-template-asm/">65816 (SNES) assembly</a> providing features for both players and fellow developers.
  </p>
  <p>
    I made this site to host some of my writing and projects and tinker in frontend programming. It's built with Nuxt, "vanilla" CSS
    (based largely on <a href="https://newcss.net/" target="_blank">new.css</a>,) and <a href="https://github.com/cassidoxa/lazy-susan" target="_blank">lazy-susan</a>,
    a small utility I wrote for serving blog posts.
  </p>

  <h2>Contact</h2>
    <p>The best ways to get in touch:</p>
    <ul>
        <li>Email: <address>cassidydmoen@gmail.com</address></li>
        <li>Discord: cassidymoen</li>
    </ul>
  </div>
</template>
