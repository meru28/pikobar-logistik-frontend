class FormattingNumber {
  abbreviation(value) {
    const suffixes = ['', ' RB', ' JT', ' M', ' T']
    let suffixNum = 0
    while (value >= 1000) {
      value /= 1000
      suffixNum++
    }

    value = value.toPrecision(3)

    value += suffixes[suffixNum]
    return value
  }

  currency(value) {
    const currency = (value / 1).toFixed(0).replace('.', ',')
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}

export { FormattingNumber as default }
