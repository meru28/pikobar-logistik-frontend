<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    width="100%"
    min-width="none"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
        v-slot="{ errors }"
        :rules="required ? rule : ''"
      >
        <v-text-field
          v-model="dateFormatted"
          persistent-hint
          clearable
          solo
          :placeholder="$t('label.date_dashboard_placeholder')"
          prepend-icon="event"
          :error-messages="errors"
          v-on="on"
          @click:clear="startDate = null"
        />
      </ValidationProvider>
    </template>
    <v-date-picker v-model="startDate" :max="endDate" no-title @change="handleSelectedDate()" />
    <v-date-picker v-model="endDate" :max="currentDate" :min="startDate" no-title @change="handleSelectedDate()" />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'DatePickerDashboard',
  components: {
    ValidationProvider
  },
  props: {
    date: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    rule: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu: false,
      startDate: '2020/01/01',
      endDate: this.$moment(Date.now()).format('YYYY-MM-DD'),
      dateFormatted: null,
      currentDate: this.$moment(Date.now()).format('YYYY-MM-DD')
    }
  },
  watch: {
    startDate(val) {
      if (this.startDate !== null && this.endDate !== null) {
        this.dateFormatted = `${this.$moment(this.startDate).format('DD/MM/YYYY')} - ${this.$moment(this.endDate).format('DD/MM/YYYY')}`
      }
    },
    endDate(val) {
      if (this.startDate !== null && this.endDate !== null) {
        this.dateFormatted = `${this.$moment(this.startDate).format('DD/MM/YYYY')} - ${this.$moment(this.endDate).format('DD/MM/YYYY')}`
      }
    }
  },
  mounted() {
    this.startDate = this.date
  },
  methods: {
    handleSelectedDate() {
      this.$emit('selected', { startDate: this.startDate, endDate: this.endDate })
    }
  }
}
</script>
