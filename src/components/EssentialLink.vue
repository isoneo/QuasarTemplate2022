<template>
  <div>
    <div v-if="children.length == 0">
      <q-item
        clickable
        v-ripple
        :inset-level="parseFloat(level)"
        @click="send_to_page(link)"
      >
        <q-item-section>{{ title }}</q-item-section>
      </q-item>
    </div>
    <div v-else>
      <div v-if="children.length > 0">
        <!-- {{children}} -->
        <q-expansion-item
          expand-separator
          :icon="icon"
          :label="title"
          :caption="caption"
          :header-inset-level="parseFloat(level)"
          default-closed
          @click="send_to_page(link)"
        >
          <EssentialLink v-for="child in children" :key="child" v-bind="child">
          </EssentialLink>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple :inset-level="level">
          <q-item-section>{{ title }}</q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      default: "",
    },
    children: {
      type: Array,
    },
  },
  setup(props, { attrs, slots, emit }) {
    const router = useRouter();
    function send_to_page(link) {
      router.push(link);
    }
    return {
      send_to_page,
    };
  },
};
</script>
