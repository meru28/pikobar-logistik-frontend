<template>
  <div>
    <v-row>
      <v-col cols="12" sm="2">
        <v-label class="title">{{ $t('label.sort') }}</v-label>
        <v-select
          v-model="listQuery.sort"
          :items="sortOption"
          solo
          item-text="label"
          item-value="value"
          @change="handleSearch"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-label class="title">{{ $t('label.request_date') }}</v-label>
        <date-picker
          :value="date"
          @selected="changeDate"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-label class="title">{{ $t('label.status') }}</v-label>
        <v-select
          v-model="listQuery.verification_status"
          solo
          :placeholder="$t('label.select_status')"
          :items="status"
          @change="handleSearch"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-label class="title">{{ $t('label.city_district') }}</v-label>
        <select-area-district-city :on-select-district-city="onSelectDistrictCity" />
      </v-col>
      <v-col cols="12" sm="2">
        <br>
        <v-card
          outlined
          class="card-search"
        >
          <v-text-field
            v-model="listQuery.agency_name"
            solo-inverted
            flat
            hide-details
            :placeholder="$t('label.search_data')"
            prepend-inner-icon="search"
            @change="handleSearch"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="margin-top-min-20-list-pengajuan-logistik">
      <v-col cols="12" sm="3">
        <v-label class="title">{{ $t('label.instance_type') }}</v-label>
        <v-select
          v-model="listQuery.faskes_type"
          :items="faskesTypeList"
          solo
          item-text="name"
          item-value="id"
          :placeholder="$t('label.select_instance_type')"
          @change="handleSearch()"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-label class="title">{{ $t('label.applicant_origin') }}</v-label>
        <v-select
          v-model="listQuery.source_data"
          :items="applicantOrigin"
          solo
          item-text="text"
          item-value="value"
          :placeholder="$t('label.select_applicant_origin')"
          @change="handleSearch()"
        />
      </v-col>
    </v-row>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.list_request_logistic_medic') }}</span>
        <v-btn class="primary" small width="150px" style="float: right" @click="exportData()">{{ $t('label.export_data') }}</v-btn>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.instance_type').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.instance_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.city_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.contact_person').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.request_date').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listLogisticRequest" :key="data.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ data.master_faskes_type.name }}</td>
                  <td>{{ data.agency_name }}</td>
                  <td>{{ data.city.kemendagri_kabupaten_nama }}</td>
                  <td>{{ data.applicant.applicant_name }}</td>
                  <td>{{ data.created_at === null ? $t('label.stripe') : $moment(data.created_at).format('D MMMM YYYY') }}</td>
                  <td>{{ data.applicant.verification_status }}</td>
                  <td><v-btn text small color="info" @click="toDetail(data)">{{ $t('label.detail') }}</v-btn></td>
                </tr>
                <tr v-if="listLogisticRequest.length === 0">
                  <td colspan="6" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-card
        outlined
        height="80%"
        style="margin: 13px"
      >
        <v-list-item>
          <v-list-item-conten>
            {{ $t('label.total_data') }} : {{ totalDataLogisticRequest }}
          </v-list-item-conten>
        </v-list-item>
      </v-card>
      <pagination
        :total="totalListLogisticRequest"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSaver from 'file-saver'

export default {
  name: 'ListPengajuanLogistik',
  data() {
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        sort: '',
        city_code: '',
        verification_status: '',
        agency_name: '',
        date: ''
      },
      status: [
        {
          text: 'Terverifikasi',
          value: 'verified'
        },
        {
          text: 'Belum Terverifikasi',
          value: 'not_verified'
        }
      ],
      applicantOrigin: [
        {
          text: this.$t('label.dinkes_province'),
          value: 'dinkes_provinsi'
        },
        {
          text: this.$t('label.pikobar'),
          value: 'pikobar'
        }
      ],
      date: null
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  async created() {
    await this.$store.dispatch('faskesType/getListFaskesType')
    this.getLogisticRequestList()
  },
  methods: {
    async changeDate(value) {
      this.listQuery.date = value
      await this.getLogisticRequestList()
    },
    async getLogisticRequestList() {
      await this.$store.dispatch('logistics/getListLogisticRequest', this.listQuery)
    },
    async handleSearch() {
      await this.getLogisticRequestList()
    },
    async onNext() {
      await this.getLogisticRequestList()
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : ''
      this.handleSearch()
    },
    toDetail(data) {
      this.$router.push(`alat-kesehatan/detail/${data.id}`)
    },
    async exportData() {
      const response = await this.$store.dispatch('logistics/logisticRequestExportData', this.listQuery)
      const fileName = `${this.$t('label.patient_recap')} ${this.fullName} - ${this.$moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')} WIB.xlsx`
      await FileSaver.saveAs(response, fileName)
    }
  }
}
</script>

<style>
.bg-dark {
  background: linear-gradient(90deg, #4F4F4F 0%, #828282 100%);
}
.bg-success {
  background: linear-gradient(90deg, #219653 0%, #27AE60 100%);
}
.bg-info {
  background: linear-gradient(90deg, #2F80ED 0%, #2D9CDB 100%);
}
.bottom-add-survey {
  margin-top:25px;
}
.margin-top-min-20-list-pengajuan-logistik {
  margin-top: -20px;
}
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #828282;
}
.thin {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
