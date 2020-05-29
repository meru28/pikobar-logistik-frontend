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
        />
        <v-row>
          <v-col>
            <v-row>
              <v-icon
                color="#FF0606"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[0] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#27AE60"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              <span>{{ chartData.labels[1] }}</span>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#F4A60B"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[2] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#27AE60"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[3] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#1AAFE6"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[4] }}
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-icon
                color="#F5D77A"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[5] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#F01BDB"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[6] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#6FCF97"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[7] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#2F80ED"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[8] }}
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-icon
                color="#DBFF00"
                class="mr-3"
              >
                mdi-checkbox-blank
              </v-icon>
              {{ chartData.labels[9] }}
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex'

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
        sort: 'desc'
      },
      chartData: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            data: [1, 2, 3, 4, 1, 2, 4, 5, 5, 4],
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
  async mounted() {
    await this.getProductTotalRequest()
    this.loaded = true
  },
  methods: {
    async getProductTotalRequest() {
      await this.$store.dispatch('logistics/getProductTotalRequest', this.listQuery)
      this.dataProductTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.name
        this.chartData.datasets[0].data[this.index] = element.total_request
        this.index += 1
      })
    }
  }
}
</script>

<style>

</style>
