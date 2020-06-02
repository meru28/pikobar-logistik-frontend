<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="chart mx-auto"
      outlined
    >
      <v-card-title class="title ml-0 mb-3 black--text">
        {{ $t("label.applicant_instance") }}
      </v-card-title>
      <v-card-text>
        <chart-pie
          v-if="loaded"
          ref="pieChart"
          :chart-data="chartData"
          :styles="chartStyles"
          :options="chartOptions"
        />
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ApplicantInstanceChart',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      loading: false,
      loaded: false,
      index: 0,
      chartData: {
        labels: ['', '', '', '', ''],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF0606',
              '#1AAFE6',
              '#27AE60',
              '#F36464',
              '#F4A60B'
            ]
          }
        ]
      },
      chartOptions: {
        legend: {
          display: true,
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
              return `${this.$t('label.total')} : ${data['datasets'][0]['data'][tooltipItem['index']].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
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
      'dataFaskesTypeTotalRequest'
    ])
  },
  async mounted() {
    await this.getFaskesTypeTotalRequest()
    this.loaded = true
  },
  methods: {
    async getFaskesTypeTotalRequest() {
      await this.$store.dispatch('logistics/getFaskesTypeTotalRequest')
      this.dataFaskesTypeTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.name
        this.chartData.datasets[0].data[this.index] = element.total_request
        this.index += 1
      })
    }
  }
}
</script>

<style>
  .margin-auto {
    margin: auto;
  }
</style>
