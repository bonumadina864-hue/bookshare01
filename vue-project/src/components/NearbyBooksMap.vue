<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const emit = defineEmits<{
  countUpdate: [count: number]
}>()

const mapRoot = ref<HTMLElement | null>(null)
const statusNote = ref('')
const mapReady = ref(false)

let map: L.Map | null = null
let removed = false

/** Toshkent — geolokatsiya bo‘lmasa */
const fallbackCenter: L.LatLngTuple = [41.2995, 69.2401]

const SELLER_NAMES = [
  'Dilshod',
  'Madina',
  'Jasur',
  'Nilufar',
  'Bekzod',
  'Sardor',
  'Laylo',
  'Ulugbek'
] as const

/** ~1.5 km radius atrofida 23 ta namuna nuqta (kitob joylashtirganlar) */
function generateNearbySellers(): { name: string; dLat: number; dLng: number }[] {
  const out: { name: string; dLat: number; dLng: number }[] = []
  for (let i = 0; i < 23; i++) {
    const angle = (i / 23) * 2 * Math.PI + 0.15 * Math.sin(i * 0.7)
    const rr = 0.00075 + (i % 12) * 0.00042
    out.push({
      name: SELLER_NAMES[i % SELLER_NAMES.length],
      dLat: rr * Math.cos(angle),
      dLng: rr * Math.sin(angle)
    })
  }
  return out
}

function destroyMap() {
  map?.remove()
  map = null
  mapReady.value = false
}

function buildMap(center: L.LatLngExpression) {
  if (removed || !mapRoot.value || map) return

  const c = L.latLng(center)
  const sellers = generateNearbySellers()

  map = L.map(mapRoot.value, {
    scrollWheelZoom: false,
    attributionControl: true
  }).setView(c, 15)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  L.circleMarker(c, {
    radius: 11,
    color: '#1d4ed8',
    weight: 2,
    fillColor: '#3b82f6',
    fillOpacity: 1
  })
    .addTo(map)
    .bindPopup(`<strong>${t('mapYouHere')}</strong>`)

  sellers.forEach((seller) => {
    const pt = L.latLng(c.lat + seller.dLat, c.lng + seller.dLng)
    L.circleMarker(pt, {
      radius: 7,
      color: '#d97706',
      weight: 2,
      fillColor: '#f59e0b',
      fillOpacity: 0.95
    })
      .addTo(map)
      .bindPopup(`<strong>${seller.name}</strong><br/>${t('mapSellerListed')}`)
  })

  emit('countUpdate', sellers.length)

  const bounds = L.latLngBounds(
    sellers.map((s) => [c.lat + s.dLat, c.lng + s.dLng] as L.LatLngTuple)
  ).extend(c)
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })

  nextTick(() => {
    map?.invalidateSize()
    setTimeout(() => {
      map?.invalidateSize()
      mapReady.value = true
    }, 200)
  })
}

onMounted(() => {
  if (!navigator.geolocation) {
    statusNote.value = t('mapGeoDenied')
    buildMap(fallbackCenter)
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (removed) return
      statusNote.value = ''
      buildMap([pos.coords.latitude, pos.coords.longitude])
    },
    () => {
      if (removed) return
      statusNote.value = t('mapGeoDenied')
      buildMap(fallbackCenter)
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60_000 }
  )
})

onBeforeUnmount(() => {
  removed = true
  destroyMap()
})
</script>

<template>
  <div class="nearby-map-wrap">
    <p v-if="!mapReady" class="map-loading">{{ t('mapLoading') }}</p>
    <div ref="mapRoot" class="nearby-map-root" role="application" :aria-label="t('nearbyBooksMap')" />
    <p v-if="statusNote" class="map-note">{{ statusNote }}</p>
  </div>
</template>

<style scoped>
.nearby-map-wrap {
  position: relative;
}

.nearby-map-root {
  height: 220px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border, #e2e8f0);
  background: #e8eef8;
  z-index: 0;
}

.nearby-map-root :deep(.leaflet-container) {
  font-family: inherit;
  border-radius: 16px;
}

.map-loading {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted, #64748b);
  background: rgba(248, 250, 252, 0.92);
  border-radius: 16px;
  pointer-events: none;
}

.map-note {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted, #64748b);
}
</style>
