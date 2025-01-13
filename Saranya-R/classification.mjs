class Classification{

    header = [];
    values = [];
  
    constructor(data) {
      this.header = data[0];
      this.values = data.slice(1);
    }

    getColumnIndex(columnName) {
        const index = this.header.indexOf(columnName);
        if (index === -1) {
          throw new Error(`Column ${columnName} not found`);
        }
        return index;
      }
    addGroupColumn(object){
      this.header.push("Group")
      this.values.forEach((dataRow) => {
         object.forEach((objectRow) => {
            if(dataRow[1] >= objectRow.from && dataRow[1] < objectRow.to){
              dataRow.push(objectRow.column);
            }
         })
      })
    }

    addRankColumn(columnName) {
        const salesColumnIndex = this.getColumnIndex(columnName);
    
        if (salesColumnIndex === -1) {
          console.error('Column not found. Unable to add the rank column.');
          return;
        }
    
        this.header.push('Rank');
    
        const uniqueSales = [...new Set(this.values.map((row) => parseFloat(row[salesColumnIndex])))];
    
        uniqueSales.sort((a, b) => b - a);

        this.values.forEach((row) => {
          const sales = parseFloat(row[salesColumnIndex]);
          const rank = uniqueSales.indexOf(sales) + 1;
          row.push(rank);
        });

        this.values.sort((a, b) => parseFloat(b[salesColumnIndex]) - parseFloat(a[salesColumnIndex]));
      }

      top5(columnName) {
        console.log('Header:', this.header);
        const columnIndex = this.header.indexOf(columnName);
        if (columnIndex === -1) {
            throw new Error(`Column ${columnName} not found`);
        }
    
        // Sort the rows based on the specified column
        const sortedRows = this.values.sort((a, b) => a[columnIndex] - b[columnIndex]);
    
        // Return the top 5 rows
        return sortedRows.slice(0, 5);
    }
    
    findRunningByTotalMonth() {

    let result = [];
    let uniqueProducts = [...new Set(this.values.map((row) => row[0]))];
    let uniqueMonths = [...new Set(this.values.map((row) => row[1]))];
 
    uniqueProducts.forEach((product) => {
      let productData = [];
      uniqueMonths.forEach((month, index) => {
       
        let runningTotal = 0;
        let count = 0;
        this.values.forEach((row) => {
          if (product === row[0] && count <= index) {
            runningTotal += parseInt(row[2]);
            count++;
          }
        });
        productData.push([month, runningTotal]);
      });
      result.push({ product, data: productData });
    });
    this.values = result;
    }
 
    // Task 5 - Showing Running Total
    showRunningTotal() {
    this.values.forEach((product) => {
      console.log(`Product: ${product.product}`);
      product.data.forEach((entry) => {
        console.log(`${entry[0]}: ${entry[1]}`);
      });
    });
  }
}
export {Classification};