class DataParser {
    groupByColumn(productData, sourceColumn) {
      this.header = productData[0];
      this.values = productData.slice(1);
  
      const index = this.header.indexOf(sourceColumn);
      if (index === -1) {
        throw new Error(`Column ${sourceColumn} not found`);
      }
  
      const groupedData = {};
  
      for (let i = 1; i < productData.length; i++) {
        const value = productData[i];
        const group = value[index];
  
        if (!groupedData[group]) {
          groupedData[group] = [];
        }
  
        groupedData[group].push(value);
      }
  
      const groupValues = [];
  
      for (const group in groupedData) {
        groupValues.push(...groupedData[group]);
      }
  
      return [this.header, ...groupValues];
    }
  
    runningTotal(productData, sourceColumn, valueColumn) {
      let header2 = [];
      let values2 = [];
      header2 = productData[0];
      const groupResult = this.groupByColumn(productData, sourceColumn);
      values2 = groupResult.slice(1);
  
      const index = header2.indexOf(sourceColumn);
      if (index === -1) {
        throw new Error(`Column ${sourceColumn} not found`);
      }
  
      const valueIndex = header2.indexOf(valueColumn);
      if (valueIndex === -1) {
        throw new Error(`Column ${valueColumn} not found`);
      }
  
      const runningTotalIndex = header2.length;
      header2.push("Running Total");
  
      for (let i = values2.length - 1; i >= 0; i--) {
        const value = values2[i];
        const group = value[index];
        let number = 0;
  
        for (let j = i; j >= 0; j--) {
          const value1 = values2[j];
          const group1 = value1[index];
  
          if (group === group1) {
            number += parseInt(value1[valueIndex]);
          }
        }
        value[runningTotalIndex] = number;
      }
  
      const runningTotalValues = values2.map((row) =>
        row.slice(0, runningTotalIndex + 1)
      );
  
      return [header2, ...runningTotalValues];
    }
  }
  
  let productData = [
    ["Product", "Month", "Sales"],
    ["Milkybar", "January", "200"],
    ["Silk", "January", "400"],
    ["Dairy Milk", "January", "700"],
    ["Eclaires", "January", "800"],
    ["Nesley", "January", "1000"],
    ["Milkybar", "February", "300"],
    ["Silk", "February", "500"],
    ["Dairy Milk", "February", "800"],
    ["Eclaires", "February", "900"],
    ["Nesley", "February", "1200"],
    ["Milkybar", "March", "250"],
    ["Silk", "March", "450"],
    ["Dairy Milk", "March", "750"],
    ["Eclaires", "March", "850"],
    ["Nesley", "March", "100"],
    ["Milkybar", "April", "250"],
    ["Silk", "April", "450"],
    ["Dairy Milk", "April", "750"],
    ["Eclaires", "April", "850"],
    ["Nesley", "April", "100"],
    ["Milkybar", "May", "300"],
    ["Silk", "May", "550"],
    ["Dairy Milk", "May", "850"],
    ["Eclaires", "May", "950"],
    ["Nesley", "May", "1200"],
    ["Milkybar", "June", "350"],
    ["Silk", "June", "600"],
    ["Dairy Milk", "June", "900"],
    ["Eclaires", "June", "700"],
    ["Nesley", "June", "800"],
    ["Milkybar", "July", "400"],
    ["Silk", "July", "700"],
    ["Dairy Milk", "July", "800"],
    ["Eclaires", "July", "700"],
    ["Nesley", "July", "800"],
    ["Milkybar", "August", "500"],
    ["Silk", "August", "800"],
    ["Dairy Milk", "August", "900"],
    ["Eclaires", "August", "700"],
    ["Nesley", "August", "800"],
    ["Milkybar", "September", "450"],
    ["Silk", "September", "700"],
    ["Dairy Milk", "September", "800"],
    ["Eclaires", "September", "600"],
    ["Nesley", "September", "700"],
    ["Milkybar", "October", "600"],
    ["Silk", "October", "850"],
    ["Dairy Milk", "October", "950"],
    ["Eclaires", "October", "750"],
    ["Nesley", "October", "800"],
    ["Milkybar", "November", "500"],
    ["Silk", "November", "750"],
    ["Dairy Milk", "November", "850"],
    ["Eclaires", "November", "650"],
    ["Nesley", "November", "700"],
    ["Milkybar", "December", "550"],
    ["Silk", "December", "800"],
    ["Dairy Milk", "December", "900"],
    ["Eclaires", "December", "700"],
    ["Nesley", "December", "750"]
  ];
  
  
  const dataParser = new DataParser();
  
  const runningTotal = dataParser.runningTotal(productData, "Product", "Sales");
  console.log("Running Total");
  console.log(runningTotal);
  