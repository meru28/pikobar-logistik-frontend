export default {
  SET_LIST_APD: (state, data) => {
    state.dataListAPD = data
  },
  SET_LIST_APD_UNIT: (state, data) => {
    state.dataListApdUnit = data
  },
  SET_LIST_INSTANCE_TYPE: (state, data) => {
    state.dataInstanceType = data
  },
  SET_LIST_LOGISTIC_REQUEST: (state, data) => {
    state.dataListLogisticRequest = data
  },
  SET_TOTAL_LIST_LOGISTIC_REQUEST: (state, data) => {
    state.totalListLogisticRequest = data
  },
  SET_TOTAL_DATA_LOGISTIC_REQUEST: (state, data) => {
    state.totalDataLogisticRequest = data
  },
  SET_DETAIL_LOGISTIC_REQUEST: (state, data) => {
    state.dataDetailLogisticRequest = data
  },
  SET_LIST_DETAIL_LOGISTIC_NEEDS: (state, data) => {
    state.dataListDetailLogisticNeeds = data
  },
  SET_TOTAL_DETAIL_LOGISTIC_NEEDS: (state, data) => {
    state.totalDetailLogisticNeeds = data
  },
  SET_DATA_LOGISTIC_REQUEST_SUMMARY: (state, data) => {
    state.dataLogisticRequestSummary = data
  },
  SET_DATA_FASKES_TYPE_TOTAL_REQUEST: (state, data) => {
    state.dataFaskesTypeTotalRequest = data
  },
  SET_PRODUCT_TOTAL_REQUEST: (state, data) => {
    state.dataProductTotalRequest = data
  },
  SET_CITY_TOTAL_REQUEST: (state, data) => {
    state.dataCityTotalRequest = data
  }
}
