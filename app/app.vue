<template>
  <div>
    <TheNavbar />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
  line-height: 1.6;
}

#__nuxt {
  min-height: 100vh;
}
</style>