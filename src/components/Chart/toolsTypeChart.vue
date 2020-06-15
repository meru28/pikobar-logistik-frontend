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
        {{ $t("label.tools_type_title") }}
      </v-card-title>
      <v-card-text>
        <chart-doughnut
          v-if="loaded"
          ref="doughnutChart"
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
  name: 'ToolsTypeChart',
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
      listQuery: {
        limit: 10,
        sort: 'desc',
        start_date: null,
        end_date: null
      },
      chartData: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF0606',
              '#27AE60',
              '#F4A60B',
              '#F36464',
              '#1AAFE6',
              '#F5D77A',
              '#F01BDB',
              '#6FCF97',
              '#2F80ED',
              '#DBFF00'
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
      'dataProductTotalRequest'
    ])
  },
  created() {
    EventBus.$on('getProductTotalRequest', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getProductTotalRequest()
    })
  },
  async mounted() {
    await this.getProductTotalRequest()
  },
  methods: {
    async getProductTotalRequest() {
      this.loaded = false
      this.index = 0
      this.chartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.chartData.labels = ['', '', '', '', '', '', '', '', '', '']
      await this.$store.dispatch('logistics/getProductTotalRequest', this.listQuery)
      this.dataProductTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.name
        this.chartData.datasets[0].data[this.index] = element.total_request
        this.index += 1
      })
      this.loaded = true
    }
  }
}
</script>
