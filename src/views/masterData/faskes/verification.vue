<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-row class="survey-bottom-form">
            <v-col>
              <span class="text-title-green">{{ $t('label.verification_fakes_title') }}</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <span class="text-title-green">{{ $t('label.registration_number') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey">{{ $t('label.registration_number') }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green">{{ $t('label.faskes_name') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey">{{ $t('label.faskes_name') }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green">{{ $t('label.upper_name') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey">{{ $t('label.upper_name') }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green">{{ $t('label.faskes_location') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey">{{ $t('label.faskes_location') }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row class="survey-bottom-form">
                <v-col>
                  <v-btn
                    class="text-capitalize"
                    outlined
                    color="#2E7D32"
                    dark
                  >
                    <strong>{{ $t('label.copy_url') }}</strong>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    class="text-capitalize"
                    outlined
                    color="#2E7D32"
                    dark=""
                  >
                    <strong>{{ $t('label.open_in_goolge_maps') }}</strong>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="mb-12">
                <v-col>
                  <v-btn
                    class="pa-6"
                    outlined
                    color="red"
                  >
                    <strong>
                      {{ $t('label.reject') }}
                    </strong>
                  </v-btn>
                  <v-btn class="pa-6" color="success"><strong>{{ $t('label.verification') }}</strong></v-btn>
                </v-col>
                <v-btn block outlined color="grey" @click="dialog= false"><strong>{{ $t('label.cancel') }}</strong></v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  created() {
    console.log('this.dialog')
    console.log(this.dialog)
    console.log(this.show)
  },
  mounted() {
    this.dialog = this.show
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.$emit('close', this.dialog)
    }
  }
}
</script>

<style>
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: black;
}
.text-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: black;
}
.text-data-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #219653;
}
.text-data-grey {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #757575;
}
.text-data-red {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #e62929;
}
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
.margin-btn {
  margin: -30%
}
.margin-left-min-30 {
  margin-left: -30px;
}
.margin-20 {
  margin: 20px;
}
.margin-top-min-15 {
  margin-top: -15px
}
.d-none {
  display: none;
}
.image-style {
    max-width: 100%;
    max-height: 500px;
  }
.letter-class {
  color: #2D9CDB !important;
  font-family: "Product Sans";
  font-style: italic;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-decoration: underline;
}
</style>
