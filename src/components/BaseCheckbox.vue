<template>
  <div
    class="custom-control custom-checkbox"
    :class="[{disabled: disabled}, inlineClass]"
  >
    <input
      :id="id"
      v-model="model"
      class="custom-control-input"
      type="checkbox"
      :disabled="disabled"
      :value="value"
    >
    <label
      :for="id"
      class="custom-control-label"
    >
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
import { randomString } from "./stringUtils";

export default {
  name: "BaseCheckbox",
  model: {
    prop: "checked"
  },
  props: {
    value: {
      type:String,
      default:"1"
    },
    id: {
      type:String,
      default:randomString()
    },
    checked: {
      type: [Array,Boolean,Number],
      description: "Whether checkbox is checked"
    },
    disabled: {
      type: Boolean,
      description: "Whether checkbox is disabled"
    },
    inline: {
      type: Boolean,
      description: "Whether checkbox is inline"
    }
  },
  data() {
    return {
      cbId: "",
      touched: false
    };
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(check) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit("input", check);
      }
    },
    inlineClass () {
      if (this.inline) {
        return `form-check-inline`;
      }
      return ''
    }
  },
  mounted() {
    this.cbId = randomString()
  }
};
</script>
