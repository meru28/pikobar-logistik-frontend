<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="mx-auto"
      outlined
    >
      <v-card-title class="title-bar-chart-dashboard">
        {{ $t("label.statistic_alkes_title") }}
      </v-card-title>
      <v-card-text>
        <div class="chartAreaWrapper">
          <chart-bar-horizontal
            v-if="loaded"
            ref="horizontalBarChart"
            :chart-data="chartData"
            :styles="chartStyles"
            :options="chartOptions"
            class="walking-speed-chart"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StatisticAppilcantChart',
  data() {
    return {
      loading: false,
      loaded: false,
      index: 0,
      color: '#56CCF2',
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: [],
            data: [8, 10]
          }
        ]
      },
      chartOptions: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 10
          },
          reverse: true
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: (tooltipItem, data) => {
              return this.$t('label.total') + ': ' + data['datasets'][0]['data'][tooltipItem['index']].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
            afterLabel: (tooltipItem, data) => {
              var dataset = data.datasets[tooltipItem.datasetIndex]
              var total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue
              })
              var currentValue = dataset.data[tooltipItem.index]
              var percentage = Math.floor((currentValue / total) * 100)
              return `${this.$t('label.percentage')} : ${percentage} %`
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      listQuery: {
        sort: 'desc'
      }
    }
  },
  computed: {
    chartStyles() {
      return {
        height: '100%',
        position: 'relative'
      }
    },
    ...mapGetters('logistics', [
      'dataCityTotalRequest'
    ])
  },
  async mounted() {
    await this.getCityTotalRequest()
  },
  methods: {
    async getCityTotalRequest() {
      await this.$store.dispatch('logistics/getCityTotalRequest', this.listQuery)
      this.index = 0
      this.dataCityTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.kemendagri_kabupaten_nama
        this.chartData.datasets[0].data[this.index] = element.agency_count
        this.color = this.shadeColor(this.color, -5)
        this.chartData.datasets[0].backgroundColor[this.index] = this.color
        this.index += 1
      })
      this.loaded = true
    },
    shadeColor(color, percent) {
      var R = parseInt(color.substring(1, 3), 16)
      var G = parseInt(color.substring(3, 5), 16)
      var B = parseInt(color.substring(5, 7), 16)

      R = parseInt(R * (100 + percent) / 100)
      G = parseInt(G * (100 + percent) / 100)
      B = parseInt(B * (100 + percent) / 100)

      R = (R < 255) ? R : 255
      G = (G < 255) ? G : 255
      B = (B < 255) ? B : 255

      var RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16))
      var GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16))
      var BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16))

      return '#' + RR + GG + BB
    }
  }
}
</script>

<style>
  .title-bar-chart-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
  }
  .chartAreaWrapper {
    height: 375px;
  }
  .walking-speed-chart{
    height: 1700px;
    overflow-y: scroll;
  }
</style>
