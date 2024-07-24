<route lang="yaml">
path: /admin/
name: admin
meta:
  requiresAdmin: true
  layout: BackofficeLayout
</route>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
import { onMounted, ref } from 'vue';

Chart.register(...registerables);

const salesChartRef = ref<HTMLCanvasElement | null>(null);
const genreChartRef = ref<HTMLCanvasElement | null>(null);

const layout = ref([
  { x: 0, y: 0, w: 6, h: 4, i: '0' },
  { x: 6, y: 0, w: 6, h: 4, i: '1' },
  { x: 0, y: 4, w: 6, h: 4, i: '2' },
  { x: 6, y: 4, w: 6, h: 4, i: '3' },
  { x: 0, y: 8, w: 6, h: 8, i: '4' },
  { x: 6, y: 8, w: 6, h: 8, i: '5' },
]);

const salesData = [
  { title: 'Ventes totales', value: '25,000€', description: 'Ce mois-ci', icon: 'mdi-currency-usd' },
  { title: 'Vinyles vendus', value: '1,200', description: 'Ces 3 derniers mois', icon: 'mdi-album' },
  { title: 'Nouveaux utilisateurs', value: '300', description: 'Ce mois-ci', icon: 'mdi-account-plus' },
  { title: 'Clients réguliers', value: '150', description: 'Ce mois-ci', icon: 'mdi-account-multiple' },
];

onMounted(() => {
  if (salesChartRef.value && genreChartRef.value) {
    new Chart(salesChartRef.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Ventes du mois',
          data: [12000, 19000, 15000, 22000, 18000, 25000],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    new Chart(genreChartRef.value, {
      type: 'doughnut',
      data: {
        labels: ['Rock', 'Jazz', 'Electronic', 'Hip Hop', 'Classical'],
        datasets: [{
          data: [30, 20, 25, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
});
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <GridLayout
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      is-draggable
      is-resizable
      vertical-compact
      use-css-transforms
      class="gap-6"
    >
      <template #item="{ item }">
        <div
          v-if="parseInt(item.i) < 4"
          class="bg-white rounded-xl shadow-md transition duration-300 ease-in-out hover:shadow-lg p-6 flex flex-col justify-between h-full"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ salesData[item.i].title }}
            </h3>
            <v-icon
              :icon="salesData[item.i].icon"
              class="text-blue-500 text-2xl"
            />
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-2">
            {{ salesData[item.i].value }}
          </p>
          <small class="text-sm text-gray-500">{{ salesData[item.i].description }}</small>
        </div>
        <div
          v-else-if="item.i === '4'"
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            Ventes du mois
          </h3>
          <canvas ref="salesChartRef" />
        </div>
        <div
          v-else
          class="bg-white rounded-xl shadow-md p-6 h-full"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            Genres vendus
          </h3>
          <canvas ref="genreChartRef" />
        </div>
      </template>
    </GridLayout>
  </div>
</template>