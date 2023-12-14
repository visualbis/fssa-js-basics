class SalesDataParser {
  header = [];
  values = [];

  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }

  salesGroup(salesColumn, groupArray) {
    const columnIndex = this.header.indexOf(salesColumn);
    if (columnIndex === -1) {
      throw new Error(`Column ${salesColumn} not found`);
    }

    this.values.forEach((row) => {
      const salesValue = parseFloat(row[columnIndex]);

      if (!isNaN(salesValue)) {
        const group = groupArray.find(
          (condition) =>
            salesValue >= condition.from && salesValue <= condition.to
        );
        row.push(group ? group.value : "Undefined");
      } else {
        row.push("Undefined");
      }
    });
    this.header.push("Group");
  }

  filterByGroup(group) {
    return this.values.filter((row) => row[row.length - 1] === group);
  }

  getGroupCounts() {
    const groupCounts = {};
    this.values.forEach((row) => {
      const group = row[row.length - 1];
      groupCounts[group] = (groupCounts[group] || 0) + 1;
    });
    return groupCounts;
  }

  topFiveColumnRanking(sourceColumn) {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }

      const sortedValues = this.values
        .slice()
        .sort((a, b) => parseInt(b[index]) - parseInt(a[index]));
      this.header.push("Rank");
   
      let currentRank = 1;
      let currentSales = parseInt(sortedValues[0][index]);
      for (let i = 0; i < sortedValues.length; i++) {
        const sales = parseInt(sortedValues[i][index]);
        if (i > 0 && sales !== currentSales) {
          currentRank++;
        }
        sortedValues[i].push(currentRank);
        currentSales = sales;
      }
      const topFive = sortedValues.slice(0, 5);
      return [this.header, topFive];
  }
  
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

  runningTotalProducts(productData, sourceColumn, valueColumn) {
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

  logData() {
    console.log(this.header);
    console.log(this.values);
  }
}

export { SalesDataParser };
