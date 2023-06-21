<template>
  <div class="not_found">
    <img
      src="https://github.com/images/modules/search/light2x.png"
      alt="Mona looking through a globe hologram for code"
      class="not_found__image"
    />

    <div class="not_found__text">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not_found {
  margin: $margin-lg auto;

  .not_found__image {
    width: 60%;
    display: block;
    margin: 0 auto;
  }

  .not_found__text {
    font-size: 20px;
    font-weight: 600;
    color: $black;
    text-align: center;
    margin-top: $margin-lg;
  }
}
</style>
