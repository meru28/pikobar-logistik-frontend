<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('label.list_request_logistic_medic') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9">
          <v-card
            v-if="!isVerified && !isRejected"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            v-if="isVerified && !isApproved"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="sub-title-verified-card-detail-logistic-needs white--text">{{ $t('label.alert_verified_title_card_logistic_needs_1') }} <b>{{ $t('label.alert_verified_title_card_logistic_needs_2') }}</b> {{ $t('label.alert_verified_title_card_logistic_needs_3') }} </span>
                  <a href="" target="blank" class="sub-title-verified-card-detail-logistic-needs white--text" @click="updateCheckStock()"><u>{{ $t('label.alert_verified_title_card_logistic_needs_4') }}</u></a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.request_date') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          <span
            class="text-data-green"
          >:  {{ detailLogisticRequest.created_at === null ? $t('label.stripe') : $moment(detailLogisticRequest.created_at).format('LLL') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.status') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="3" sm="3">
          <span
            v-if="isVerified && !isApproved"
            class="text-data-green"
          >
            :  {{ detailLogisticRequest.applicant.verification_status }}
          </span>
          <span
            v-else-if="isApproved"
            class="text-data-green"
          >
            :  {{ detailLogisticRequest.applicant.approval_status }}
          </span>
          <span
            v-else
            class="text-data-red"
          >
            :  {{ detailLogisticRequest.applicant.verification_status }}
          </span>
        </v-col>
        <v-col cols="3" sm="3">
          <v-btn
            v-if="!isVerified && !isRejected"
            outlined
            color="#2E7D32"
            class="margin-btn"
            @click="postVerification"
          >
            {{ $t('label.verif_now') }}
          </v-btn>
          <v-btn
            v-if="isRejected"
            outlined
            color="#2E7D32"
            @click.stop="showDialogReasonReject = true"
          >
            {{ $t('label.reason_reject') }}
          </v-btn>
          <v-btn
            v-if="isVerified && isStock && !isApproved"
            outlined
            color="#2E7D32"
            class="margin-btn"
            @click="submitApprove()"
          >
            {{ $t('label.approve') }}
          </v-btn>
        </v-col>
        <v-col cols="3" sm="3">
          <v-btn
            v-if="!isVerified && !isRejected"
            outlined
            color="#e62929"
            class="margin-btn"
            @click.stop="showDialogReject = true"
          >
            {{ $t('route.rejected_title') }}
          </v-btn>
          <v-btn
            v-if="isVerified && isStock && !isApproved"
            outlined
            color="#e62929"
            class="margin-btn"
            @click.stop="showDialogReject = true"
            @click="setTotal()"
          >
            {{ $t('route.rejected_title') }}
          </v-btn>
        </v-col>
      </v-row>
      <rejectKebutuhanLogistik
        :show="showDialogReject"
        :item="detailLogisticRequest"
        :total="listLogisticNeeds[0].logistic_item_summary"
      />
      <reasonDeniedLogisticNeeds
        :show="showDialogReasonReject"
        :item="detailLogisticRequest"
        :total="listLogisticNeeds[0].logistic_item_summary"
      />
    </div>
    <div>
      <br>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.instance_identity') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20" cols="12" sm="6" md="6">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.instance_type') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.master_faskes_type.name }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.city_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.city.kemendagri_kabupaten_nama }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.instance_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.agency_name }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.select_sub_district_full_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.sub_district.kemendagri_kecamatan_nama }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.number_phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.phone_number }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.village') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.village.kemendagri_desa_nama }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="margin-20" cols="12" sm="4" md="4">
                <v-row>
                  <span
                    class="text-title-green"
                  >
                    {{ $t('label.full_address') }}
                  </span>
                </v-row>
                <v-row>
                  <v-label>
                    {{ detailLogisticRequest.location_address }}
                  </v-label>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <br>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.step_title_2') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20" cols="12" sm="6" md="6">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.contact_person') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant.applicant_name }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.contact_person') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant.applicant_name }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_position_identity') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant.applicants_office }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant.primary_phone_number }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col offset-md="6" offset-sm="6">
                    <span class="text-title-green">
                      {{ $t('label.applicant_phone_sub') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant.secondary_phone_number }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="margin-20" cols="12" sm="4" md="4">
                <v-row><span class="text-title-green">{{ $t('label.applicant_ktp') }}</span></v-row>
                <v-row>
                  <v-label v-if="detailLogisticRequest.applicant.file === '-'">{{ detailLogisticRequest.applicant.file }}</v-label>
                  <a v-else-if="detailLogisticRequest.applicant.file.substr(0, 4) === 'https'" class="letter-class" :href="detailLogisticRequest.applicant.file" target="_blank">{{ detailLogisticRequest.applicant.file }}</a>
                  <img v-else class="image-style" :src="detailLogisticRequest.applicant.file">
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-card outlined>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.apd_name_specification').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.brand').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.total').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.unit').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.purpose').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.urgency_level').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.realization_amount').toUpperCase() }}</th>
                <th class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                <th v-if="isVerified" class="text-left">{{ $t('label.action') }}</th>
              </tr>
            </thead>
            <tbody v-if="loaded">
              <tr v-if="listLogisticNeeds.length === 0">
                <td class="text-center" :colspan="7">{{ $t('label.no_data') }}</td>
              </tr>
              <tr v-for="(item, index) in listLogisticNeeds" v-else :key="item.index">
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.product.name }}</td>
                <td>{{ item.brand }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unit.unit }}</td>
                <td>{{ item.usage }}</td>
                <td>{{ item.priority }}</td>
                <td>{{ item.realization_quantity }}</td>
                <td>{{ item.statusLabel }}</td>
                <td v-if="isVerified">
                  <v-btn text small color="info" @click.stop="showForm = true" @click="updateIndex = index">
                    {{ $t('label.update') }}
                  </v-btn>
                </td>
                <updateKebutuhanLogistik
                  :show="showForm"
                  :item="listLogisticNeeds[updateIndex]"
                />
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-pagination
        v-model="listQuery.page"
        :length="totalLogisticNeeds"
        :total-visible="3"
        @input="onNext"
      />
    </div>
    <div class="text-title-green">{{ $t('label.step_title_4') }}</div>
    <v-card outlined>
      <v-row class="ml-2">
        <v-col cols="1" md="1">
          <span class="text-title-green">#</span>
        </v-col>
        <v-col cols="3" md="3">
          <span class="text-title-green">{{ $t('label.letter_number') }}</span>
        </v-col>
      </v-row>
      <v-row class="ml-2">
        <v-col cols="1" md="1">
          <span>1</span>
        </v-col>
        <v-col cols="3" md="3">
          <span class="grey--text">{{ detailLogisticRequest.applicant.application_letter_number }}</span>
        </v-col>
        <v-col cols="4" md="4">
          <a :href="detailLogisticRequest.letter.letter" target="_blank" class="blue--text"><u>{{ $t('label.applicant_letter') }}</u></a>
        </v-col>
        <v-col>
          <a :href="detailLogisticRequest.letter.letter" target="_blank" class="green--text">{{ $t('label.download') }}</a>
        </v-col>
      </v-row>
    </v-card>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateKebutuhanLogistik from './update'
import EventBus from '@/utils/eventBus'
import rejectKebutuhanLogistik from './reject'
import reasonDeniedLogisticNeeds from './reasonReject'

export default {
  name: 'ListDetailPengajuanLogistik',
  components: {
    updateKebutuhanLogistik,
    rejectKebutuhanLogistik,
    reasonDeniedLogisticNeeds
  },
  data() {
    return {
      letterFileType: '',
      isVerified: false,
      isRejected: false,
      isApproved: false,
      listQuery: {
        page: 1,
        limit: 3,
        agency_id: ''
      },
      showForm: false,
      showDialogReject: false,
      showDialogReasonReject: false,
      updateIndex: null,
      loaded: false,
      isStock: true
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailLogisticRequest',
      'listLogisticNeeds',
      'totalLogisticNeeds'
    ])
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    await this.getListDetail()
    await this.getListDetailNeeds()
    const temp = this.detailLogisticRequest.letter.letter.split('.')
    this.letterFileType = temp[temp.length - 1]
    this.isVerified = this.detailLogisticRequest.applicant.verification_status === 'Terverifikasi'
    this.isRejected = this.detailLogisticRequest.applicant.verification_status === 'Pengajuan Ditolak'
    this.isApproved = this.detailLogisticRequest.applicant.approval_status === 'Telah Disetujui'
    this.isStock = this.detailLogisticRequest.applicant.stock_checking_status === 'checked'
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
    })
    EventBus.$on('dialogHideReject', (value) => {
      this.showDialogReject = value
      this.showDialogReasonReject = value
    })
    EventBus.$on('submitReject', (value) => {
      const formData = new FormData()
      this.showDialogReject = false
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('verification_status', 'rejected')
      formData.append('note', value)
      this.postReject(formData)
    })
  },
  methods: {
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    async getListDetail() {
      await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.$route.params.id)
      const temp = this.detailLogisticRequest.letter.letter.split('.')
      this.letterFileType = '.' + temp[temp.length - 1]
    },
    async getListDetailNeeds() {
      this.loaded = false
      await this.$store.dispatch('logistics/getListDetailLogisticNeeds', this.listQuery)
      this.listLogisticNeeds.forEach(element => {
        switch (element.status) {
          case 'approved':
            element.statusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.statusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.statusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.statusLabel = this.$t('label.not_available')
            break
          default:
            element.statusLabel = this.$t('label.not_approved')
        }
      })
      this.loaded = true
    },
    async onNext() {
      await this.getListDetailNeeds()
    },
    async postVerification() {
      const formData = new FormData()
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('verification_status', 'verified')
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      window.location.reload()
    },
    async postReject(formData) {
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      window.location.reload()
    },
    setTotal() {
      this.totalAPD = 0
      this.listLogisticNeeds.forEach(element => {
        this.totalAPD += parseInt(element.quantity)
      })
    },
    async updateCheckStock() {
      await this.$store.dispatch('logistics/postCheckStockStatus', { stock_checking_status: 'checked', applicant_id: this.detailLogisticRequest.id })
      window.location.reload(true)
    },
    async submitApprove() {
      const formData = new FormData()
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('approval_status', 'approved')
      await this.$store.dispatch('logistics/postApprovalStatus', formData)
      window.location.reload(true)
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
  margin: -30%;
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
.sub-title-verified-card-detail-logistic-needs {
  font-size: 13px;
}
</style>
