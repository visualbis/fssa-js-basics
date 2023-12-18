import { Sales } from "./aggregation.mjs"; 
const data = [
    ["Product", "Category", "Date", "Sales", "Quantity", "Discount Percentage"],
    ["High-End Laptop", "Technology", "2023-12-01", 1200, 5, 10],
    ["Premium Printer", "Office Supplies", "2023-12-02", 800, 8, 20],
    ["Luxury Sofa", "Furniture", "2023-12-03", null, 10, 15],
    ["Smartphone", "Technology", "2023-12-04", 2000, 7, 5],
    ["Executive Desk", "Office Supplies", "2023-12-05", 1000, null, 20],
    ["Elegant Dining Table", "Furniture", "2023-12-06", 1800, 6, 10],
    ["VR Headset", "Technology", "2023-12-07", 1600, 9, 12],
    ["Modern Office Chair", "Office Supplies", "2023-12-08", 2200, 8, null],
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
 
const headArray = ["Sales", "Quantity"];
 
let sales = new Sales(data);
 
sales.sum();
sales.sum(headArray);
sales.minValue();