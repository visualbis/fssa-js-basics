class DataParser2 {
  header = [];
  values = [];

  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }

  findIndex = (sourceColumn) => {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }
    return index;
  };

  groupTheColumn = (sourceColumn, arrayGroup) => {
    if (arrayGroup.length === 0) {
      console.log("Group list is empty");
      return;
    }
    const index = this.findIndex(sourceColumn);
    this.values.forEach((data) => {
      const value = parseInt(data[index]);
      let result;

      arrayGroup.forEach((row) => {
        if (value >= parseInt(row.from) && value <= parseInt(row.to)) {
          result = row.value;
        }
      });

      data.push(result);
    });

    this.header.push("Group By");
  };

  filterColumn(sourceColumn, value) {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
        throw new Error(`Column ${sourceColumn} not found`);
    }   
    let resultValues = [];
    this.values.forEach((row) => {
        if (value == row[index]) {
            resultValues.push(row);
        }
    });
    let resultHeader = this.header;
    return [resultHeader, resultValues];
}

  countColumn = (sourceColumn) => {
    const index = this.findIndex(sourceColumn);
    let result = {};
    this.values.forEach((row) => {
      const group = row[index];
      result[group] = (result[group] || 0) + 1;
    });

    return result;
  };

  rankTheColumn = (sourceColumn) => {
    const index = this.findIndex(sourceColumn);
    const sortedValues = this.values.slice().sort((a, b) => parseInt(b[index]) - parseInt(a[index]));
    this.header.push("Rank");

    let currentRank = 1;
    let currentSales = parseInt(sortedValues[0][index]);

    sortedValues.forEach((row, i) => {
      const sales = parseInt(row[index]);
      if (i > 0 && sales !== currentSales) {
        currentRank++;
      }
      row.push(currentRank);
      currentSales = sales;
    });

    const topFive = sortedValues.slice(0, 5);
    return [this.header, topFive];
  };

  groupByColumn = (productData, sourceColumn) => {
    this.header = productData[0];
    this.values = productData.slice(1);

    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }

    const groupedData = {};

    this.values.forEach((value, i) => {
      const group = value[index];

      if (!groupedData[group]) {
        groupedData[group] = [];
      }

      groupedData[group].push(value);
    });

    const groupValues = [];

    Object.values(groupedData).forEach((group) => {
      groupValues.push(...group);
    });

    return [this.header, ...groupValues];
  };

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
  
  logData = () => {
    console.log(this.header);
    console.log(this.values);
  };
}

export { DataParser2 };
