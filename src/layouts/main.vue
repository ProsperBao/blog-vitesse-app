<template>
  <main class="text-gray-700 dark:text-gray-200">
    <header class="flex justify-between items-center px-5 pb-2 bg-light-300 dark:text-gray-700 opacity-95">
      <h1 class="text-2xl pt-4">
        MacBear
      </h1>
      <TopControl />
    </header>
    <section class="w-full mt-1">
      <router-view />
    </section>
  </main>
  <ClientOnly>
    <BackgroundGalaxy />
  </ClientOnly>
</template>
