<template>
  <v-dialog
    v-model="show"
    width="500"
    :persistent="true"
  >
    <v-card>
      <v-card-title class="headline">{{ $t('label.dialog_reject_title_1') }}<br>{{ $t('label.dialog_reject_title_2') }}</v-card-title>

      <div>
        <v-col>
          <span class="sub-title-reject-logistic-needs">{{ $t('label.instance_type') }}</span>
          <br>
          <span>{{ item.master_faskes_type.name }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-logistic-needs">{{ $t('label.instance_name') }}</span>
          <br>
          <span>{{ item.agency_name }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-logistic-needs">{{ $t('label.total_apd_needs') }}</span>
          <br>
          <span>{{ total }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-logistic-needs">{{ $t('label.reason_reject') }}</span>
          <br>
          <v-textarea
            v-model="reason"
            outlined
            :height="100"
            solo-inverted
            :placeholder="$t('label.reason_reject_placeholder')"
          />
        </v-col>
      </div>

      <v-card-actions>
        <v-col>
          <v-btn
            text
            outlined
            @click="hideDialog"
          >
            {{ $t('label.cancel') }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="error">{{ $t('label.submit_reject') }}</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'TolakKebutuhanLogistik',
  props: {
    show: {
      type: Boolean,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      reason: null
    }
  },
  methods: {
    hideDialog() {
      EventBus.$emit('dialogHideReject', false)
    }
  }
}
</script>

<style>
  .sub-title-reject-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
</style>
