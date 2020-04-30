<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('label.list_request_logistic_medic') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.request_date') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          <span
            class="text-data-green"
          >:  {{ detailLogisticRequest.created_at === null ? $t('label.stripe') : $moment(detailLogisticRequest.created_at).format('DD MMMM YYYY') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.status') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="4" sm="4">
          <span
            v-if="isVerified"
            class="text-data-green"
          >
            :  {{ detailLogisticRequest.applicant.verification_status }}
          </span>
          <span
            v-else
            class="text-data-red"
          >
            :  {{ detailLogisticRequest.applicant.verification_status }}
          </span>
        </v-col>
        <v-col cols="6" sm="6">
          <v-btn
            v-if="!isVerified"
            outlined
            color="#2E7D32"
            class="margin-btn"
            @click="postVerification"
          >
            {{ $t('label.verif_now') }}
          </v-btn>
        </v-col>
      </v-row>
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
                  <br>
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
                <v-row><img class="image-style" :src="detailLogisticRequest.applicant.file"></v-row>
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
                <th class="text-left">{{ $t('label.apd_name_specification') }}</th>
                <th class="text-left">{{ $t('label.brand') }}</th>
                <th class="text-left">{{ $t('label.total') }}</th>
                <th class="text-left">{{ $t('label.unit') }}</th>
                <th class="text-left">{{ $t('label.purpose') }}</th>
                <th class="text-left">{{ $t('label.urgency_level') }}</th>
              </tr>
            </thead>
            <tbody>
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
    <div>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <span class="text-data-green">
            {{ $t('label.applicant_letter') }}
          </span>
          <br>
          <a class="letter-class" :href="detailLogisticRequest.letter.letter" target="_blank">{{ $t('label.applicant_letter') }} {{ detailLogisticRequest.agency_name }}{{ letterFileType }}</a>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListDetailPengajuanLogistik',
  data() {
    return {
      letterFileType: '',
      isVerified: false,
      listQuery: {
        page: 1,
        limit: 3,
        agency_id: ''
      }
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
      await this.$store.dispatch('logistics/getListDetailLogisticNeeds', this.listQuery)
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
