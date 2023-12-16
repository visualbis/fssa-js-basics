// let data = [
//         ["Product", "Category", "Date", "Sales", "Quantity", "Discount"],
//         ["Milkybar", "Chocolate", "2023-01-01", "300", "50", "10%"],
//         ["Laptop", "Technology", "2023-01-02", null, "40", "15%"],
//         ["Skirt", "Clothing", "2023-01-15", "450", "80", "17%"],
//         ["Necklace", "Accessories", "2023-01-13", "150", null, "9%"],
//         ["Earrings", "Accessories", "2023-01-14", "300", "75", "11%"],
//         ["Dairy Milk", "Chocolate", "2023-01-03", "400", "30", "20%"],
//         ["Pant", "Clothing", "2023-01-20", "600", null, "15%"],
//         ["Speaker", "Technology", "2023-01-04", "450", "25", "5%"],
//         ["Kurta", "Clothing", "2023-01-15", "450", "80", "17%"],
//         ["Cadbury", "Chocolate", "2023-01-20", null, "40", "10%"],
//         ["Bangles", "Accessories", "2023-01-12", "100", "10", "22%"],
//         ["Computer", "Technology", "2023-01-05", "500", "20", "12%"],
//         ["Kitkat", "Chocolate", "2023-01-06", "200", "60", "8%"],
//         ["Hair clip", "Accessories", "2023-01-11", "250", "15", "3%"],
//         ["Tab", "Technology", "2023-01-07", "550", "35", "18%"],
//         ["Shirt", "Clothing", "2023-01-20", "600", "60", null],
//         ["Snikkers", "Chocolate", "2023-01-08", "600", "45", "7%"],
//         ["Dupatta", "Clothing", "2023-01-15", "450", "80", "17%"]
//         ["Tripod", "Technology", "2023-01-09", "700", "55", "14%"],
//         ["Watch", "Accessories", "2023-01-10", "800", "70", null],
//     ];


// function calculateColumnSum(data, columnName) {
//   const headerIndex = data[0].indexOf(columnName);

//   if (headerIndex === -1) {
//     throw new Error(`Column not found: ${columnName}`);
//   }

//   let columnSum = 0;

//   for (let i = 1; i < data.length; i++) {
//     let cellValue = data[i][headerIndex];

//     if (!isNaN(parseFloat(cellValue))) {
//       columnSum += parseFloat(cellValue);
//     }
//   }

//   return columnSum;
// }

// // Calculate sum for "Sales", "Quantity", and "Discounts"
// let salesSum = calculateColumnSum(data, "Sales");
// let quantitySum = calculateColumnSum(data, "Quantity");
// let discountsSum = calculateColumnSum(data, "Discount");

// console.log(`Total Sales sum:`, salesSum);
// console.log(`Total Quantity sum:`, quantitySum);
// console.log(`Total Discounts sum:`, discountsSum);

 



let data = [
    ["Product", "Category", "Date", "Sales", "Quantity", "Discount"],
    ["Milkybar", "Chocolate", "2023-01-01", "300", "50", "10%"],
    ["Laptop", "Technology", "2023-01-02", null, "40", "15%"],
    ["Skirt", "Clothing", "2023-01-15", "450", "80", "17%"],
    ["Necklace", "Accessories", "2023-01-13", "150", null, "9%"],
    ["Earrings", "Accessories", "2023-01-14", "300", "75", "11%"],
    ["Dairy Milk", "Chocolate", "2023-01-03", "400", "30", "20%"],
    ["Pant", "Clothing", "2023-01-20", "600", null, "15%"],
    ["Speaker", "Technology", "2023-01-04", "450", "25", "5%"],
    ["Kurta", "Clothing", "2023-01-15", "450", "80", "17%"],
    ["Cadbury", "Chocolate", "2023-01-20", null, "40", "10%"],
    ["Bangles", "Accessories", "2023-01-12", "100", "10", "22%"],
    ["Computer", "Technology", "2023-01-05", "500", "20", "12%"],
    ["Kitkat", "Chocolate", "2023-01-06", "200", "60", "8%"],
    ["Hair clip", "Accessories", "2023-01-11", "250", "15", "3%"],
    ["Tab", "Technology", "2023-01-07", "550", "35", "18%"],
    ["Shirt", "Clothing", "2023-01-20", "600", "60", null],
    ["Snikkers", "Chocolate", "2023-01-08", "600", "45", "7%"],
    ["Dupatta", "Clothing", "2023-01-15", "450", "80", "17%"],
    ["Tripod", "Technology", "2023-01-09", "700", "55", "14%"],
    ["Watch", "Accessories", "2023-01-10", "800", "70", null],
  ];
  
//   function calculateColumnStats(data, columnName) {
//     const headerIndex = data[0].indexOf(columnName);
  
//     if (headerIndex === -1) {
//       throw new Error(`Column not found: ${columnName}`);
//     }
  
//     const columnData = data.slice(1).map(row => parseFloat(row[headerIndex]) || null);
//     const sum = columnData.reduce((acc, value) => acc + (value || 0), 0);
//     const avg = sum / columnData.length;
//     const min = Math.min(...columnData.filter(value => value !== null));
//     const max = Math.max(...columnData.filter(value => value !== null));
//     const countOfNull = columnData.filter(value => value === null).length;
  
//     return {
//       column: columnName,
//       sum,
//       avg,
//       min,
//       max,
//       countOfNull,
//     };
//   }
  
//   // Example usage:
//   const salesStats = calculateColumnStats(data, "Sales");
//   const quantityStats = calculateColumnStats(data, "Quantity");
//   const discountsStats = calculateColumnStats(data, "Discount");
  
//   console.table([salesStats, quantityStats, discountsStats]);
  


function getColumnValues(data, columnName) {
    const headerIndex = data[0].indexOf(columnName);
  
    if (headerIndex === -1) {
      throw new Error(`Column not found: ${columnName}`);
    }
  
    return data.slice(1).map(row => parseFloat(row[headerIndex]) || null);
  }
  
  function calculateSum(columnValues) {
    return columnValues.reduce((acc, value) => acc + (value || 0), 0);
  }
  
  function calculateAverage(columnValues) {
    const sum = calculateSum(columnValues);
    return sum / columnValues.length;
  }
  
  function calculateMin(columnValues) {
    return Math.min(...columnValues.filter(value => value !== null));
  }
  
  function calculateMax(columnValues) {
    return Math.max(...columnValues.filter(value => value !== null));
  }
  
  function countNullValues(columnValues) {
    return columnValues.filter(value => value === null).length;
  }
  
  function calculateColumnStats(data, columnName) {
    const columnValues = getColumnValues(data, columnName);
  
    return {
      column: columnName,
      sum: calculateSum(columnValues),
      avg: calculateAverage(columnValues),
      min: calculateMin(columnValues),
      max: calculateMax(columnValues),
      countOfNull: countNullValues(columnValues),
    };
  }
  
  // Example usage:
  const salesStats = calculateColumnStats(data, "Sales");
  const quantityStats = calculateColumnStats(data, "Quantity");
  const discountsStats = calculateColumnStats(data, "Discount");
  
  console.table([salesStats, quantityStats, discountsStats]);
  













  