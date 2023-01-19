<template>
  <div class="switch-label">
    <label class="switch">
      <input type="checkbox" id="checkbox" v-model="propChecked" />
      <span for="checkbox" class="slider round"></span>
    </label>
    <label class="text">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    checked: Boolean,
    labelText: String,
  },
  emits: ["checked", "unchecked"],
  computed: {
    propChecked: {
      get() {
        return this.checked;
      },
      set(value) {
        if (value) {
          this.$emit("checked", this.labelText);
        } else {
          this.$emit("unchecked", this.labelText);
        }
      },
    },
  },
};
</script>
<style>
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6225993d;
  box-shadow: 0 0 3px #622599;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #eee;
  box-shadow: 0 0 3px #622599;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #622599;
}

input:focus + .slider {
  box-shadow: 0 0 3px #622599;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.switch {
  position: relative;
  display: block;
  width: 60px;
  height: 34px;
  margin: 7px 5px 2px 5px;
}
.switch-label {
  text-align: center;
  display: flex;
  height: 100px;
  width: 200px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
