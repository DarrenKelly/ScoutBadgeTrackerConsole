import { ref, computed } from "vue";

// --- Reactive state shared across the application ---

// Stores the result of the media query.
const isMobileByMediaQuery = ref(false);

// Stores the user's manual override setting.
// null = automatic, true = force mobile, false = force desktop.
const mobileOverride = ref(null);

// --- Logic ---

// This code runs only once when the module is first imported.
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(max-width: 760px)");

  const handleMediaQueryChange = (e) => {
    isMobileByMediaQuery.value = e.matches;
  };

  // Set the initial value
  handleMediaQueryChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener("change", handleMediaQueryChange);
}

// --- The Composable Function ---

export function useMobileDetection() {
  // A computed property to determine if an override is active.
  const isOverridden = computed(() => mobileOverride.value !== null);

  // The final `isMobile` value that components will use.
  // It prioritizes the manual override over the automatic media query result.
  const isMobile = computed(() => {
    if (isOverridden.value) {
      return mobileOverride.value;
    }
    return isMobileByMediaQuery.value;
  });

  /**
   * Toggles the manual override for the mobile view.
   * If no override is active, it forces the view to the opposite of the current state.
   * If an override is active, it toggles between forcing mobile (true) and forcing desktop (false).
   */
  function toggleMobileOverride() {
    if (isOverridden.value) {
      mobileOverride.value = !mobileOverride.value;
    } else {
      mobileOverride.value = !isMobile.value;
    }
  }

  /**
   * Clears any manual override and returns to automatic detection based on screen width.
   */
  function clearMobileOverride() {
    mobileOverride.value = null;
  }

  return {
    isMobile,
    isOverridden,
    toggleMobileOverride,
    clearMobileOverride,
  };
}
