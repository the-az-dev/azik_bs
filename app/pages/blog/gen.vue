<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: String,
  date: String,
});

const storyRef = ref<HTMLElement | null>(null);
const isGenerating = ref(false);

const generateAndDownload = async () => {
  if (!storyRef.value) return;

  isGenerating.value = true;

  try {
    // Отримуємо HTML елемента разом з усіма стилями
    const element = storyRef.value;

    // Збираємо всі стилі з document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          // Ігноруємо CORS помилки для зовнішніх стилів
          return "";
        }
      })
      .join("\n");

    // Отримуємо computed styles для елемента
    const computedStyle = window.getComputedStyle(element);
    const elementStyles = Array.from(computedStyle).reduce((acc, key) => {
      acc += `${key}: ${computedStyle.getPropertyValue(key)};`;
      return acc;
    }, "");

    // Створюємо повний HTML з усіма стилями та SVG фільтром
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
          <style>
            * {
              font-family: 'Montserrat', sans-serif;
              font-optical-sizing: auto;
              font-style: normal;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              background: #020202;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 0;
              margin: 0;
            }

            .story-container {
              width: 480px !important;
              background: #202020;
              border-radius: 3rem;
              padding: 3rem 0;
              display: flex;
              flex-direction: column;
              gap: 2rem;
              position: relative;
              filter: url(#rough-edge-filter);
            }

            .l-header-effect {
              font-weight: 900;
              line-height: 1;
              text-transform: uppercase;
              color: black;
              -webkit-text-stroke: 12px white;
              paint-order: stroke fill;
            }

            .text-6xl {
              font-size: 3.75rem;
              line-height: 1;
            }

            .px-12 {
              padding-left: 3rem;
              padding-right: 3rem;
            }

            .text-center {
              text-align: center;
            }

            .text-3xl {
              font-size: 1.875rem;
              line-height: 2.25rem;
            }

            .font-bold {
              font-weight: 700;
            }

            .uppercase {
              text-transform: uppercase;
            }

            .inline-block {
              display: inline-block;
            }

            .p-4 {
              padding: 1rem;
            }

            .bg-white {
              background-color: white;
            }

            .text-black {
              color: black;
            }

            .self-start {
              align-self: flex-start;
            }

            .rotate-2 {
              transform: rotate(2deg);
            }

            .text-zinc-500 {
              color: rgb(113, 113, 122);
            }

            .text-2xl {
              font-size: 1.5rem;
              line-height: 2rem;
            }

            .font-mono {
              font-family: ui-monospace, monospace;
            }

            .mt-4 {
              margin-top: 1rem;
            }

            .text-white {
              color: white;
            }

            .text-4xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }

            .relative {
              position: relative;
            }

            .z-10 {
              z-index: 10;
            }

            .flex {
              display: flex;
            }

            .flex-col {
              flex-direction: column;
            }

            .gap-8 {
              gap: 2rem;
            }

            .justify-center {
              justify-content: center;
            }

            .h-full {
              height: 100%;
            }

            .w-full {
              width: 100%;
            }

            .absolute {
              position: absolute;
            }

            .inset-0 {
              inset: 0;
            }

            .opacity-20 {
              opacity: 0.2;
            }

            .pointer-events-none {
              pointer-events: none;
            }

            .mix-blend-overlay {
              mix-blend-mode: overlay;
            }

            .rounded-3rem {
              border-radius: 3rem;
            }

            ${styles}
          </style>
        </head>
        <body>
          <!-- SVG фільтр -->
          <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
            <defs>
              <filter id="rough-edge-filter" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
          </svg>
          
          ${element.outerHTML}
        </body>
      </html>
    `;

    console.log("Відправляю запит до Puppeteer API...");

    // Відправляємо на backend для генерації скріншота
    const response = await fetch("/api/screenshot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: fullHtml,
        width: 1080,
        height: 1920,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate screenshot");
    }

    const data = await response.json();

    if (!data.success || !data.image) {
      throw new Error("Invalid response from server");
    }

    // Завантажуємо згенероване зображення
    const link = document.createElement("a");
    link.download = `azik-story-${Date.now()}.png`;
    link.href = data.image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Успішно згенеровано!");
  } catch (err) {
    console.error("Помилка генерації:", err);
    alert("Помилка при генерації зображення: " + err);
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-row justify-center items-center">
    <!-- SVG фільтр для превью -->
    <svg style="position: absolute; width: 0; height: 0" aria-hidden="true">
      <defs>
        <filter
          id="rough-edge-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="5"
            seed="1"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>

    <div
      ref="storyRef"
      class="story-container bg-[#202020] rounded-[3rem] py-12 px-10 flex flex-col gap-[2rem] w-[35rem]"
      style="filter: url(#rough-edge-filter);"
    >
      <div class="px-12 w-full text-center">
        <h2 class="l-header-effect text-[6rem]">AZIK</h2>
      </div>

      <div
        class="flex flex-col justify-center h-full px-12 relative z-10 gap-[2rem]"
      >
        <h1 class="l-header-effect text-[6rem]">
          {{ props.title }}
        </h1>

        <div
          class="bg-white text-black inline-block p-4 text-3xl font-bold uppercase self-start rotate-2"
        >
          New Article
        </div>
      </div>

      <div class="px-12 text-center">
        <p class="text-zinc-500 text-2xl font-mono">Read Here</p>
        <div class="text-white text-4xl">↓</div>
      </div>

      <div class="h-10"></div>
    </div>
  </div>
  <div class="w-full flex flex-row items-center justify-center p-10">
    <button
      class="grunge-effect w-[15rem] rounded-[1.5rem] text-center mx-12 py-[2rem] border-4 border-white bg-transparent hover:bg-white/5 transition-colors disabled:opacity-50"
      @click="generateAndDownload"
      :disabled="isGenerating"
    >
      <p class="text-[2rem] text-white font-bold uppercase">
        {{ isGenerating ? "GENERATING..." : "SHARE" }}
      </p>
    </button>
  </div>
</template>

<style scoped>
.story-container {
  /* Базові стилі */
}
</style>
