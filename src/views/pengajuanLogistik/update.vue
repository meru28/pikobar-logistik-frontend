<template>
  <v-dialog
    v-model="show"
    max-width="480"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <span class="title-update-logistic-needs">{{ $t('label.update_logistic_needs_title') }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-update-logistic-needs">{{ $t('label.apd_spec_name') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item.product.name }}</span>
        </v-col>
        <v-col class="margin-top-min-10-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.brand') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item.brand }}</span>
        </v-col>
        <v-col class="margin-top-min-10-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.total_needs') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item.quantity }}</span>
        </v-col>
        <v-col class="margin-top-min-10-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.realization_amount') }}</span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredUpperName"
          >
            <v-text-field
              outlined
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.realization_date') }}</span>
          <date-picker
            :value="date"
          />
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.status') }}</span>
          <v-select
            solo
            :placeholder="$t('label.select_status')"
            :items="status"
          />
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <v-btn class="margin-btn-update-logistic-needs" outlined @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
          <v-btn class="margin-btn-update-logistic-needs" color="success" @click="submitData">{{ $t('label.update') }}</v-btn>
        </v-col>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'UpdateKebutuhanLogistik',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    show: {
      type: Boolean,
      default: null
    },
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      date: null,
      status: [
        {
          text: 'Sudah Disetujui',
          value: 'Sudah Disetujui'
        },
        {
          text: 'Belum Dikirim',
          value: 'Belum Dikirim'
        },
        {
          text: 'Sudah Dikirim',
          value: 'Sudah Dikirm'
        },
        {
          text: 'Barang Belum Tersedia',
          value: 'Barang Belum Tersedia'
        }
      ]
    }
  },
  methods: {
    submitData() {
      console.log('masuk')
    },
    hideDialog() {
      console.log('masuk')
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    }
  }
}
</script>

<style>
  .title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
  }
  .sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
  .value-sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    color: #828282;
  }
  .margin-top-min-10-update-logistic-needs {
    margin-top: -10px;
  }
  .margin-top-min-30-update-logistic-needs {
    margin-top: -30px;
  }
  .margin-btn-update-logistic-needs {
    margin: 5px;
  }
</style>
