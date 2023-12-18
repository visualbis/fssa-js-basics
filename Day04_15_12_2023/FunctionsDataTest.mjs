import { Functions } from "./Functions.mjs";
import Table from 'cli-table3';

let data = [
    ["Product", "Category", "Date", "Sales", "Quantity", "Discount"],
    ["Milkybar", "Chocolate", "2023-01-01", "300", "50", "10"],
    ["Laptop", "Technology", "2023-01-02", null, "40", "15"],
    ["Skirt", "Clothing", "2023-01-15", "450", "80", "17"],
    ["Necklace", "Accessories", "2023-01-13", "150", null, "9"],
    ["Earrings", "Accessories", "2023-01-14", "300", "75", "11"],
    ["Dairy Milk", "Chocolate", "2023-01-03", "400", "30", "20"],
    ["Pant", "Clothing", "2023-01-20", "600", null, "15"],
    ["Speaker", "Technology", "2023-01-04", "450", "25", "5"],
    ["Kurta", "Clothing", "2023-01-15", "450", "80", "17"],
    ["Cadbury", "Chocolate", "2023-01-20", null, "40", "10"],
    ["Bangles", "Accessories", "2023-01-12", "100", "10", "22"],
    ["Computer", "Technology", "2023-01-05", "500", "20", "12"],
    ["Kitkat", "Chocolate", "2023-01-06", "200", "60", "8"],
    ["Hair clip", "Accessories", "2023-01-11", "250", "15", "3"],
    ["Tab", "Technology", "2023-01-07", "550", "35", "18"],
    ["Shirt", "Clothing", "2023-01-20", "600", "60", null],
    ["Snikkers", "Chocolate", "2023-01-08", "600", "45", "7"],
    ["Dupatta", "Clothing", "2023-01-15", "450", "80", "17"],
    ["Tripod", "Technology", "2023-01-09", "700", "55", "14"],
    ["Watch", "Accessories", "2023-01-10", "800", "70", null]
  ];

let funcs = new Functions(data);

// Printing the table with all products
const salesStats = funcs.calculateColumnStats(data, "Sales");
const quantityStats = funcs.calculateColumnStats(data, "Quantity");
const discountsStats = funcs.calculateColumnStats(data, "Discount");

console.table([salesStats, quantityStats, discountsStats]);

// const tableData = [
//   { 'Column': salesStats.column, 'Sum': salesStats.sum, 'Average': salesStats.avg, 'Min': salesStats.min, 'Max': salesStats.max, 'Count of Null': salesStats.countOfNull, 'Q1': salesStats.q1, 'Q2': salesStats.q2 },
//   { 'Column': quantityStats.column, 'Sum': quantityStats.sum, 'Average': quantityStats.avg, 'Min': quantityStats.min, 'Max': quantityStats.max, 'Count of Null': quantityStats.countOfNull, 'Q1': quantityStats.q1, 'Q2': quantityStats.q2 },
//   { 'Column': discountsStats.column, 'Sum': discountsStats.sum, 'Average': discountsStats.avg, 'Min': discountsStats.min, 'Max': discountsStats.max, 'Count of Null': discountsStats.countOfNull, 'Q1': discountsStats.q1, 'Q2': discountsStats.q2 }
// ];

// console.table(tableData);