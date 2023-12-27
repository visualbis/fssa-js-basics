class SalesDataCalculator {
  header = [];
  values = [];

  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1); 
  }

  parseData(slaes, quantity, discount) {
    const salesIndex = this.header.indexOf(slaes);
    const quantityIndex = this.header.indexOf(quantity);
    const discountIndex = this.header.indexOf(discount);

    if (salesIndex === -1 || quantityIndex === -1 || discountIndex === -1) {
      throw new Error(`Columns ${this.salesColumn}, ${this.quantityColumn}, or ${this.discountColumn} not found`);
    }

    const parsedData = [];

    for (let i = 0; i < this.values.length; i++) {
      const row = this.values[i];

      const sales = parseFloat(row[salesIndex]);
      const quantity = parseFloat(row[quantityIndex]);
      let discount = row[discountIndex];

      if (discount === "%") {
        const rawValue = row[discountIndex + 1];
        const removeSymbol = rawValue.replace("%", "").trim(); 
        discount = parsePercentage(removeSymbol);
      }

      // Construct a new row with parsed values
      const newRow = [...row.slice(0, salesIndex), sales, quantity, discount, ...row.slice(discountIndex + 2)];
      parsedData.push(newRow);
    }

    return parsedData;
  }

  logData() {
    console.log(this.header);
    console.log(this.values);
  }
}

// Assuming parseNumber and parsePercentage functions are defined elsewhere in your code

export { SalesDataCalculator };
