<template>
  <NuxtLayout>
      <svg
      style="position: absolute; top: 0; left: 0; width: 1px; height: 1px; opacity: 0.01; pointer-events: none;"
      
    >
      <defs>
        <filter
          id="rough-edge-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
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
    <NuxtPage />
  </NuxtLayout>
</template>
