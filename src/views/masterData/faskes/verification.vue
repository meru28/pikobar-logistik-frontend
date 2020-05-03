<template>
  <v-row justify="center">
    <v-dialog v-if="!dialogSuccessShow" v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <v-row class="survey-bottom-form">
            <v-col>
              <span class="text-title-green-verification-faskes">{{ $t('label.verification_fakes_title') }}</span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <span class="text-title-green-verification-faskes">{{ $t('label.registration_number') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey-verification-faskes">{{ formVerification.nomor_registrasi }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green-verification-faskes">{{ $t('label.faskes_name') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey-verification-faskes">{{ formVerification.nama_faskes }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green-verification-faskes">{{ $t('label.upper_name') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey-verification-faskes">{{ formVerification.nama_atasan }}</span>
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-title-green-verification-faskes">{{ $t('label.faskes_location') }}</span>
                  <br>
                  <v-label>
                    <span class="text-data-grey-verification-faskes">{{ formVerification.point_latitude_longitude }}</span>
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
                    large
                    @click.stop.prevent="copyText"
                  >
                    <strong>{{ $t('label.copy_url') }}</strong>
                  </v-btn>
                  <v-btn
                    class="text-capitalize margin-btn-verification-faskes"
                    outlined
                    color="#2E7D32"
                    large
                    :href="formVerification.point_latitude_longitude"
                    target="_blank"
                  >
                    <strong>{{ $t('label.open_in_goolge_maps') }}</strong>
                  </v-btn>
                  <input id="copy-url" type="hidden" :value="formVerification.point_latitude_longitude">
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row class="mb-12">
                <v-btn
                  v-if="visible"
                  outlined
                  color="red"
                  class="margin-btn-submit-verification-faskes"
                  @click="rejectVerification"
                >
                  {{ $t('label.reject') }}
                </v-btn>
                <v-btn
                  v-if="visible"
                  color="success"
                  class="margin-btn-submit-verification-faskes"
                  @click="submitVerification"
                >
                  {{ $t('label.verification') }}
                </v-btn>
                <v-btn block outlined color="grey" @click="closeDialog"><strong>{{ $t('label.cancel') }}</strong></v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-else
      v-model="dialog"
      max-width="500"
      :persistent="true"
    >
      <v-card v-if="dialogSuccessShow && !dialogFail">
        <div>
          <v-row>
            <v-img :max-width="100" src="../../../static/success_icon.svg" class="img-icon-add-instance" />
          </v-row>
          <v-row>
            <v-col>
              <center><span class="title-dialog-success-add-instance">{{ $t('label.success_dialog') }}</span></center>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="isVerification">
              <center><span class="text-dialog-success-add-instance">{{ $t('label.success_text_dialog_verification_faskes') }}</span></center>
            </v-col>
            <v-col v-else>
              <center><span class="text-dialog-success-add-instance">{{ $t('label.success_text_dialog_reject_faskes') }}</span></center>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <center>
                <v-btn color="primary" class="white--text" @click="refreshPage">
                  {{ $t('label.ok') }}
                </v-btn>
              </center>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-card v-else-if="dialogFail">
        <div>
          <v-row>
            <v-img :max-width="100" src="../../../static/fail_icon.svg" class="img-icon-add-instance" />
          </v-row>
          <v-row>
            <v-col>
              <center><span class="title-dialog-success-add-instance">{{ $t('label.fail_dialog') }}</span></center>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <center>
                <span class="text-dialog-success-add-instance">{{ $t('label.fail_text_dialog') }}</span>
                <br>
                <span class="text-dialog-success-add-instance">{{ $t('label.fail_text_dialog_2') }}</span>
              </center>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <center>
                <v-btn color="primary" class="white--text" @click="refreshPage">
                  {{ $t('label.repeat') }}
                </v-btn>
              </center>
            </v-col>
          </v-row>
        </div>
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
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    verificationData: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dialog: false,
      formVerification: {},
      visible: false,
      dialogSuccessShow: false,
      dialogFail: false,
      isVerification: false
    }
  },
  watch: {
    show(value) {
      this.dialog = value
      this.visible = value
    },
    isDetail(value) {
      this.visible = !value
      this.dialog = value
    },
    verificationData(value) {
      this.formVerification.id = value.id
      this.formVerification.nomor_registrasi = value.nomor_registrasi
      this.formVerification.nama_faskes = value.nama_faskes
      this.formVerification.nama_atasan = value.nama_atasan
      this.formVerification.point_latitude_longitude = value.point_latitude_longitude
    }
  },
  mounted() {
    this.dialog = this.show
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.$emit('update:close', this.dialog)
      this.$emit('update:closeDetail', this.dialog)
    },
    copyText() {
      const copyTextData = document.querySelector('#copy-url')
      copyTextData.setAttribute('type', 'text')
      copyTextData.select()
      document.execCommand('copy')
      copyTextData.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    async submitVerification() {
      const response = await this.$store.dispatch('faskes/postVerificationFaskes', { id: this.verificationData.id, verification_status: 'verified' })
      if (response.status === 200) {
        this.dialogSuccessShow = true
        this.isVerification = true
      } else {
        this.dialogFail = true
        this.dialogSuccessShow = true
      }
    },
    async rejectVerification() {
      const response = await this.$store.dispatch('faskes/postVerificationFaskes', { id: this.verificationData.id, verification_status: 'rejected' })
      if (response.status === 200) {
        this.dialogSuccessShow = true
        this.isVerification = true
      } else {
        this.dialogFail = true
        this.dialogSuccessShow = true
      }
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>

<style>
.text-data-grey-verification-faskes {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #757575;
}
.text-title-green-verification-faskes {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
.margin-btn-verification-faskes {
  margin-left: 5%;
}
.margin-btn-submit-verification-faskes {
  margin: 1% 1% 5% 1%;
}
</style>
