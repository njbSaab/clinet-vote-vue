<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24">
      <defs>
        <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="oklch(51.01% 0.274 263.83)" />
          <stop offset="100%" stop-color="oklch(53.18% 0.28 296.97)" />
        </radialGradient>
        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="oklch(47.66% 0.246 305.88)" />
          <stop offset="100%" stop-color="oklch(69.02% 0.277 332.77)" />
        </radialGradient>
        <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="oklch(61.42% 0.238 15.34)" />
          <stop offset="100%" stop-color="oklch(51.01% 0.274 263.83)" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="0" fill="url(#gradient1)">
        <animate
          id="svgSpinnersPulseMultiple0"
          fill="freeze"
          attributeName="r"
          begin="0;svgSpinnersPulseMultiple2.end"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="0;11"
        />
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinnersPulseMultiple2.end"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="1;0"
        />
      </circle>
      <circle cx="12" cy="12" r="0" fill="url(#gradient2)">
        <animate
          id="svgSpinnersPulseMultiple1"
          fill="freeze"
          attributeName="r"
          begin="svgSpinnersPulseMultiple0.begin+0.2s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="0;11"
        />
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinnersPulseMultiple0.begin+0.2s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="1;0"
        />
      </circle>
      <circle cx="12" cy="12" r="0" fill="url(#gradient3)">
        <animate
          id="svgSpinnersPulseMultiple2"
          fill="freeze"
          attributeName="r"
          begin="svgSpinnersPulseMultiple0.begin+0.4s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="0;11"
        />
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinnersPulseMultiple0.begin+0.4s"
          calcMode="spline"
          dur="1.2s"
          keySplines=".52,.6,.25,.99"
          values="1;0"
        />
      </circle>
    </svg>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
