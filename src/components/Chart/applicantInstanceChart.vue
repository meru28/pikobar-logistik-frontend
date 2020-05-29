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
