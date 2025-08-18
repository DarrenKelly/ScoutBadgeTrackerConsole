<template>
  <div class="img-container">
    <img
      src="@/assets/Theatre.png"
      :class="[
        icon_type && icon_type.includes('Incursion')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Theatre2.png"
      :class="[
        icon_type && icon_type.includes('Excursion')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Bike.png"
      :class="[
        icon_type && icon_type.includes('Cycling')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Water.png"
      :class="[
        icon_type &&
        (icon_type.includes('Water') ||
          icon_type.includes('Canoe') ||
          icon_type.includes('Sailing'))
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Sail.png"
      :class="[
        icon_type && icon_type.includes('Sailing')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Canoe.png"
      :class="[
        icon_type && icon_type.includes('Canoe')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/GreyWolf.png"
      :class="[
        icon_type && icon_type.includes('Wolf')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/CampFire.png"
      :class="[
        icon_type &&
        (icon_type.includes('Camp') || icon_type.includes('Overnight'))
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Hike.png"
      :class="[
        icon_type && icon_type.includes('Hike')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Plane.png"
      :class="[
        icon_type && icon_type.includes('Fly')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
    <img
      src="@/assets/Fishing.png"
      :class="[
        icon_type && icon_type.includes('Fish')
          ? 'icon' + (compact ? ' compact' : '')
          : 'gone',
      ]"
    />
  </div>
</template>

<script>
export default {
  name: "ActivityIcon",
  props: {
    icon_type: String,
    compact: Boolean,
  },
};
</script>

<style scoped>
.icon {
  width: 70px;
  margin-top: 45px;
  margin-left: 5px;
  height: 70px;
}
.compact {
  width: 45px;
  margin-top: 0px;
  margin-left: 5px;
  height: 45px;
}

.gone {
  display: none;
}
</style>
