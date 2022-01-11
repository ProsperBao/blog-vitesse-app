<template>
  <main class="text-gray-700 dark:text-gray-200">
    <header class="flex justify-between items-center px-5 pb-2 bg-light-300 dark:text-gray-700 opacity-95">
      <h1 class="text-2xl pt-4">
        BabyFu
      </h1>
      <TopControl />
    </header>
    <section class="px-7 py-10">
      <router-view />
    </section>
    <Footer class="fixed bottom-2 left-1/2 transform -translate-x-1/2"/>
  </main>
  <ClientOnly>
    <BackgroundGalaxy />
  </ClientOnly>
</template>
