<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <router-view />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Home Layout]
    </div>
    <div class="container mx-auto mt-1">
      <Status />
    </div>
  </main>
</template>
