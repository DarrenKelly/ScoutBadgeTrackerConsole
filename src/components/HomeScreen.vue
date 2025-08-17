<template>
  <div :class="[isMobile ? 'mob_container' : 'logo_container']">
    <div class="header-with-toggle">
      <h1>2nd Gordon Cubs</h1>
      <div class="view-toggle">
        <button
          @click="toggleMobileOverride"
          :class="['toggle-btn', isOverridden ? 'overridden' : '']"
          :title="
            isOverridden
              ? 'View override active - click to toggle'
              : 'Toggle between mobile/desktop view'
          "
        >
          {{ isMobile ? "🖥️" : "📱" }}
        </button>
        <button
          v-if="isOverridden"
          @click="clearMobileOverride"
          class="clear-btn"
          title="Reset to automatic detection"
        >
          ↻
        </button>
      </div>
    </div>
    <img
      src="@/assets/NSWScoutsLogo.png"
      alt="NSW Scouts Logo"
      :class="[isMobile ? 'mob_logo' : 'logo']"
    />
  </div>
</template>
<script>
import { useMobileDetection } from "@/composables/useMobileDetection.js";

export default {
  name: "HomeScreen",
  setup() {
    const {
      isMobile,
      toggleMobileOverride,
      clearMobileOverride,
      isOverridden,
    } = useMobileDetection();
    return {
      isMobile,
      toggleMobileOverride,
      clearMobileOverride,
      isOverridden,
    };
  },
};
</script>
<style scoped>
.logo_container {
  margin-top: 10px;
}
.mob_container {
  object-fit: cover;
}
.logo {
  width: 95%;
}
.mob_logo {
  width: 600px;
  height: 300px;
  object-fit: contain;
}

.header-with-toggle {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}

.view-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
  align-items: center;
}

.toggle-btn {
  background: var(--scoutpurple, #6a4c93);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  min-width: 40px;
}

.toggle-btn:hover {
  background: #5a3c83;
  transform: translateY(-1px);
}

.toggle-btn.overridden {
  background: #e67e22;
  box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.3);
}

.clear-btn {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #7f8c8d;
}
</style>
