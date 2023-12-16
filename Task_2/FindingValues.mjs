const data = [
    ["Product", "Category", "Date", "Sales", "Quantity", "Discount Percentage"],
    ["High-End Laptop", "Technology", "2023-12-01", 1200, 5, 10],
    ["Premium Printer", "Office Supplies", "2023-12-02", 800, 8, 20],
    ["Luxury Sofa", "Furniture", "2023-12-03", 1500, 10, 15],
    ["Smartphone", "Technology", "2023-12-04", 2000, 7, 5],
    ["Executive Desk", "Office Supplies", "2023-12-05", 1000, 12, 20],
    ["Elegant Dining Table", "Furniture", "2023-12-06", 1800, 6, 10],
    ["VR Headset", "Technology", "2023-12-07", 1600, 9, 12],
    ["Modern Office Chair", "Office Supplies", "2023-12-08", 2200, 8, 18],
    ["Queen Size Bed", "Furniture", "2023-12-09", 1200, 5, 8],
    ["4K Smart TV", "Technology", "2023-12-10", 2500, 7, 15],
    ["High-Performance Printer", "Office Supplies", "2023-12-11", 1300, 10, 20],
    ["Contemporary Sofa", "Furniture", "2023-12-12", 1800, 6, 10],
    ["Gaming Console", "Technology", "2023-12-13", 2100, 8, 12],
    ["Premium Stationery Set", "Office Supplies", "2023-12-14", 900, 12, 20],
    ["Designer Coffee Table", "Furniture", "2023-12-15", 1600, 9, 15],
    ["Ultra-Thin Laptop", "Technology", "2023-12-16", 1900, 7, 5],
    ["Professional Printer", "Office Supplies", "2023-12-17", 1200, 5, 10],
    ["Classic Bookshelf", "Furniture", "2023-12-18", 1500, 10, 18],
    ["Home Theater System", "Technology", "2023-12-19", 2000, 8, 20],
    ["Executive Office Desk", "Office Supplies", "2023-12-20", 1400, 6, 15],
  ];
  
  // Extracting the relevant columns
  const salesColumn = data.slice(1).map(row => row[3]);
  const quantityColumn = data.slice(1).map(row => row[4]);
  const discountColumn = data.slice(1).map(row => row[5]);
  
  // Function to calculate sum of an array
  const calculateSum = arr => arr.reduce((sum, value) => sum + value, 0);
  
  // Function to calculate average of an array
  const calculateAverage = arr => calculateSum(arr) / arr.length;
  
  // Function to calculate standard deviation of an array
  const calculateStandardDeviation = arr => {
    const mean = calculateAverage(arr);
    const squaredDifferences = arr.map(value => Math.pow(value - mean, 2));
    const variance = calculateAverage(squaredDifferences);
    return Math.sqrt(variance);
  };
  
  // Function to calculate quartiles (Q1 and Q2)
  const calculateQuartiles = arr => {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const length = sortedArr.length;
    const middleIndex = Math.floor(length / 2);
  
    const q1 = calculateMedian(sortedArr.slice(0, middleIndex));
    const q2 = calculateMedian(sortedArr);
  
    return { q1, q2 };
  };
  
  // Function to calculate null percentage
  const calculateNullPercentage = arr => {
    const nullCount = arr.filter(value => value === null).length;
    return (nullCount / arr.length) * 100;
  };
  
  // Calculate statistics for each column
  const salesStatistics = {
    sum: calculateSum(salesColumn),
    average: calculateAverage(salesColumn),
    min: Math.min(...salesColumn),
    max: Math.max(...salesColumn),
    standardDeviation: calculateStandardDeviation(salesColumn),
    quartiles: calculateQuartiles(salesColumn),
    nullPercentage: calculateNullPercentage(salesColumn),
  };
  
  const quantityStatistics = {
    sum: calculateSum(quantityColumn),
    average: calculateAverage(quantityColumn),
    min: Math.min(...quantityColumn),
    max: Math.max(...quantityColumn),
    standardDeviation: calculateStandardDeviation(quantityColumn),
    quartiles: calculateQuartiles(quantityColumn),
    nullPercentage: calculateNullPercentage(quantityColumn),
  };
  
  const discountStatistics = {
    sum: calculateSum(discountColumn),
    average: calculateAverage(discountColumn),
    min: Math.min(...discountColumn),
    max: Math.max(...discountColumn),
    standardDeviation: calculateStandardDeviation(discountColumn),
    quartiles: calculateQuartiles(discountColumn),
    nullPercentage: calculateNullPercentage(discountColumn),
  };
  
  // Output
  console.log("Sales Statistics:", salesStatistics);
  console.log("Quantity Statistics:", quantityStatistics);
  console.log("Discount Percentage Statistics:", discountStatistics);
  