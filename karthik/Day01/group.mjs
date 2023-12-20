class SalesDataFilter {
    constructor(salesData, groupColumn) {
      this.salesData = salesData;
      this.groupColumn = groupColumn;
      this.filteredData = {};
    }
  
    filterByGroup() { 
    this.groupColumn.forEach(group => {
      const salesColumn = this.salesData[0][1];
      const columnIndex = this.salesData[0].indexOf(salesColumn);
  
      this.filteredData[group.value] = this.salesData.filter(row => {
        const salesValue = parseInt(row[columnIndex]);
        return salesValue >= group.from && salesValue <= group.to;
      });
    });
  }
  
  
    printFilteredData() {
      console.log(this.filteredData);
    }
  }
  
  export{SalesDataFilter};