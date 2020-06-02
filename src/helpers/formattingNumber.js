class FormattingNumber {
  abbreviation(value) {
    let currency = value
    const suffixes = ['', ' RB', ' JT', ' M', ' T']
    let suffixNum = 0
    while (currency >= 1000) {
      currency /= 1000
      suffixNum++
    }

    currency = currency.toPrecision(3)

    currency += suffixes[suffixNum]
    return currency
  }

  currency(value) {
    const currency = (value / 1).toFixed(0).replace('.', ',')
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}

export { FormattingNumber as default }
