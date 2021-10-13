<template>
  <div id="map"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import 'leaflet/dist/leaflet.css';

  import { initMap } from 'src/components/map/map';
  import { randomMarker, polygon } from './testUtils';

  export default defineComponent({
    name: 'Map',
    setup() {
      let map: any;

      onMounted(() => {
        map = initMap('map');
        randomMarker(map);
        polygon(map);
      });

      return {};
    },
  });
</script>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
