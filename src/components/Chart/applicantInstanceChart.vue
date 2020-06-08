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
import FormatingNumber from '../../helpers/formattingNumber'
import EventBus from '@/utils/eventBus'

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
          callbacks: {
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: (tooltipItem, data) => {
              const formattingNumber = new FormatingNumber()
              const dataset = data.datasets[tooltipItem.datasetIndex]
              const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue
              })
              const currentValue = dataset.data[tooltipItem.index]
              const percentage = Math.floor((currentValue / total) * 100)
              return `${this.$t('label.request_number')} : ${formattingNumber.currency(data['datasets'][0]['data'][tooltipItem['index']])} (${percentage}%)`
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      listQuery: {
        start_date: null,
        end_date: null
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
  created() {
    EventBus.$on('getFaskesTypeTotalRequest', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getFaskesTypeTotalRequest()
    })
  },
  async mounted() {
    await this.getFaskesTypeTotalRequest()
    this.loaded = true
  },
  methods: {
    async getFaskesTypeTotalRequest() {
      this.index = 0
      await this.$store.dispatch('logistics/getFaskesTypeTotalRequest', this.listQuery)
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
