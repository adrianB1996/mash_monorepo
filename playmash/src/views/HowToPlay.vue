<template>
  <article
    class="w-96 mx-auto prose prose-invert prose-zinc prose-p:my-4 mb-80 text-justify prose-headings:font-normal"
  >
    <h1
      style="font-family: Modak"
      class="text-5xl mb-4 text-pink-500 bg-zinc-900 text-center pt-2 my-4 rounded"
    >
      What is MASH?
    </h1>
    <p>
      MASH is fortune telling game of elimination. In a game, items from categories are eliminated
      until only one item per category remains. The remaining items are the fortune.
    </p>
    <h1
      style="font-family: Modak"
      class="text-5xl mb-4 text-pink-500 bg-zinc-900 text-center pt-2 my-4 rounded"
    >
      How to play?
    </h1>
    <p>To play, either chose one of the default games, or create your own.</p>
    <p>
      💭 Think up some categories you would like to know the future for! Traditionally these
      include: Who you'll marry, your job, your salary, where you'll live, etc.
    </p>
    <p>
      To create a category, click the plus button.
      <button class="border border-zinc-600 rounded w-72 h-32 m-6">+</button>
    </p>
    <p>
      💭 For each category, think up some possible futures. These futures should include some
      variety. Choose at least one ideal, one outstanding, and one
      <span class="text-pink-500">bad</span> future.
    </p>
    <p>
      To add an item to a category, click the plus button.
      <button class="bg-zinc-700 hover:bg-zinc-600 rounded w-72 p-2 m-6">+</button>
    </p>
    <p>When you're ready click Go!</p>
    <span style="font-family: Modak" class="block text-center text-violet-500 text-6xl">Go!</span>
    <p>
      You will then need to generate a random number. On desktop, you can
      <span class="animate-eight text-pink-500 inline-block">move</span> the mouse. On mobile, if
      supported by your device, you can
      <span class="animate-wobble text-pink-500 inline-block">shake</span> your phone.
    </p>
    <div class="flex justify-center">
      <RouterLink
        to="/"
        class="text-white bg-teal-500 py-2 px-4 rounded cursor-pointer no-underline"
        >I'm ready!</RouterLink
      >
    </div>
  </article>
</template>
