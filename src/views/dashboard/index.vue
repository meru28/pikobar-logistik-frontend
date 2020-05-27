<template>
  <v-container fluid grid-list-xl py-0>
    <div>
      <v-row>
        <span class="text-title-dashboard">{{ $t('label.dashboard_title') }}</span>
      </v-row>
      <v-row>
        <span class="text-last-update-dashboard">{{ $t('label.last_update') }}: 27 Mei 2020</span>
      </v-row>
    </div>
    <br>
    <div>
      <v-row>
        <v-card
          class="mx-auto"
          color="#219653"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-card-text>
                <div>
                  <a class="text-card-source-dashboard" href="https://logistik.pikobar.jabarprov.go.id/" target="_blank">{{ $t('label.dashboard_title_text') }}</a>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
      <br>
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-card
            class="mx-auto"
            color="#4F4F4F"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.total_incoming_request') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  1300
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card
            class="mx-auto"
            color="#219653"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.with_pikobar') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  1300
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card
            class="mx-auto"
            color="#E62929"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.with_dinkes_province') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  1300
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>
  .text-title-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
  }
  .text-last-update-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #828282;
  }
  .text-card-source-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF !important;
  }
  .value-card-source-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    display: flex;
    align-items: center;
    color: #FFFFFF !important;
  }
</style>
