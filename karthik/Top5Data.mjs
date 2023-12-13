
import { SalesDataFilter } from "../karthik/Top5Product.mjs";

const salesData = [
    ["Product", "Sales"],
    ["Milkybar", "200"],
    ["Silk", "400"],
    ["Dairy Milk", "700"],
    ["Eclaires", "800"],
    ["Nesley", "1000"],
    ["Kitkat", "100"],
    ["Five Star", "200"],
    ["Snikkers", "500"],
    ["Munch", "300"],
    ["Perk", "400"],
    ["Center Fresh", "600"],
    ["Mint", "800"],
    ["Polo", "200"],
    ["Tictac", "400"],
    ["Gems", "100"],
    ["Kinder Joy", "900"],
    ["Marbels", "100"],
    ["Melody", "500"],
    ["Mentos", "300"],
    ["Coffee Bite", "200"],
    ["Luvit", "800"],
    ["Kopiko", "1000"],
    ["Kacha Mango", "800"],
    ["Lollipop", "1000"],
  ];
  const salesDataFilter = new SalesDataFilter(salesData);
  salesDataFilter.addRankColumn();
  salesDataFilter.printSalesData();
  