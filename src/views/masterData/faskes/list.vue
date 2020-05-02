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
      <v-col v-if="verificationStatusDefault != 'verified'" cols="12" sm="2">
        <v-label class="title">{{ $t('label.status') }}</v-label>
        <v-select
          v-model="listQuery.verification_status"
          :items="verificationStatusOption"
          solo
          item-text="label"
          item-value="value"
          @change="handleSearch"
        />
      </v-col>
      <v-col cols="12" sm="5">
        <br>
        <v-card outlined>
          <search
            :handle-search="handleSearch"
            :list-query="listQuery"
            solo
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.list_applicant_logistic_medic') }}</span>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.registration_number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.faskes_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.upper_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.faskes_location').toUpperCase() }}</th>
                  <th v-if="verificationStatusDefault != 'verified'" class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(faskes, index) in faskesList" :key="faskes.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ faskes.nomor_registrasi }}</td>
                  <td>{{ faskes.nama_faskes }}</td>
                  <td>{{ faskes.nama_atasan }}</td>
                  <td>{{ $t('label.link_maps_lat_long') }}{{ faskes.latitude }},{{ faskes.longitude }}</td>
                  <td v-if="verificationStatusDefault != 'verified'" class="text-link">
                    <v-btn v-if="verificationStatusDefault === 'rejected'" text small color="info" @click="handleDetail(faskes)">{{ $t('label.detail') }}</v-btn>
                    <v-btn v-if="verificationStatusDefault === 'not_verified'" text small color="info" @click="handleVerification(faskes)">{{ $t('label.verification') }}</v-btn>
                  </td>
                </tr>
                <tr v-if="faskesList.length === 0">
                  <td colspan="6" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalList"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dataVerification
      :show="showVerification"
      :close.sync="showVerification"
      :close-detail.sync="isDetail"
      :verification-data="verificationData"
      :is-detail="isDetail"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dataVerification from './verification'
export default {
  name: 'ListFasilitasKesehatan',
  components: {
    dataVerification
  },
  data() {
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      verificationStatusOption: [
        { value: 'not_verified', label: 'Belum Terverifikasi' },
        { value: 'rejected', label: 'Ditolak' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'asc',
        search: '',
        nama_faskes: '',
        verification_status: 'not_verified'
      },
      verificationStatusDefault: '',
      showVerification: false,
      isDetail: false,
      verificationData: {}
    }
  },
  computed: {
    ...mapGetters('faskes', [
      'faskesList',
      'totalList'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if (value.length >= 3 || value.length === 0) {
          this.listQuery.page = 1
          this.listQuery.nama_faskes = value
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  created() {
    this.listQuery.verification_status = this.$route.params.verification_status
    this.verificationStatusDefault = this.$route.params.verification_status
    this.getFaskesList()
  },
  methods: {
    async getFaskesList() {
      await this.$store.dispatch('faskes/getListFaskes', this.listQuery)
    },
    async handleSearch() {
      await this.getFaskesList()
    },
    async onNext() {
      await this.getFaskesList()
    },
    handleDetail(value) {
      this.isDetail = true
      this.verificationData = value
    },
    handleVerification(value) {
      this.showVerification = true
      this.verificationData = value
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>
