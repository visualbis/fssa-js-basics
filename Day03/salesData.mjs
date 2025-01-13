import { CategoryDataManager } from "./categoryDataManager.mjs";
const data = [
  ["Product", "Category", "Date", "Sales", "Quantity", "Discount Percentage"],
  ["Mid-Range Laptop", "Technology", "2023-01-05", 1000, 4, 8],
  ["Basic Printer", "Office Supplies", "2023-02-10", 500, 8, 15],
  ["Comfortable Sofa", "Furniture", "2023-03-15", 1200, 7, null],
  ["Budget Smartphone", "Technology", "2023-04-20", 800, 5, 10],
  ["Simple Desk", "Office Supplies", "2023-05-25", 300, 10, 5],
  ["Compact Dining Table", "Furniture", "2023-06-30", 900, 4, 12],
  ["High-End Laptop", "Technology", "2023-12-01", 1200, 5, 10],
  ["Premium Printer", "Office Supplies", "2023-12-02", 800, null, 20],
  ["Luxury Sofa", "Furniture", null, 1500, 10, 15],
  ["Smartphone", "Technology", "2023-12-04", 2000, 7, 5],
  ["Executive Desk", "Office Supplies", "2023-12-05", null, 12, 20],
  ["Elegant Dining Table", "Furniture", "2023-12-06", 1800, 6, null],
  ["VR Headset", "Technology", null, 1600, 9, 12],
  ["Modern Office Chair", "Office Supplies", "2023-12-08", null, 8, 18],
  ["Queen Size Bed", "Furniture", null, 1200, 5, 8],
  ["4K Smart TV", "Technology", "2023-12-10", 2500, 7, 15],
  ["High-Performance Printer", "Office Supplies", null, 1300, null, 20],
  ["Contemporary Sofa", "Furniture", "2023-12-12", 1800, 6, 10],
  ["Gaming Console", "Technology", "2023-12-13", 2100, 8, 12],
  ["Premium Stationery Set", "Office Supplies", "2023-12-14", 900, 12, null],
  ["Designer Coffee Table", "Furniture", null, 1600, 9, 15],
  ["Ultra-Thin Laptop", "Technology", "2023-12-16", 1900, 7, 5],
  ["Professional Printer", "Office Supplies", "2023-12-17", null, 5, 10],
  ["Classic Bookshelf", "Furniture", "2023-12-18", 1500, 10, 18],
  ["Home Theater System", "Technology", "2023-12-19", 2000, null, 20],
  ["Executive Office Desk", "Office Supplies", null, 1400, 6, null],
];

const categoryDataManager = new CategoryDataManager(data);
const categoryData = {
  category: ["Sales", "Quantity"],
  requirement: [
    "min",
    "max",
    "avg",
    "std",
    "null count",
    "null percentage",
    "q1",
    "q2",
  ],
};
categoryDataManager.dateMeasureOperation(categoryData);
