import { Grouping } from "./Grouping.mjs";

let salesData = [
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

  const grouping = new Grouping(salesData);
  grouping.categorizeProduct("Sales");
  grouping.addRankColumn();
  grouping.logData();


  const salesDataWithMonth = [
    ["Product", "Month", "Sales"],
    ["Milkybar", "January", "200"],
    ["Silk", "January", "400"],
    ["Dairy Milk", "January", "700"],
    ["Eclaires", "January", "800"],
    ["Nesley", "January", "1000"],

    ["Milkybar", "February", "300"],
    ["Silk", "February", "500"],
    ["Dairy Milk", "February", "800"],
    ["Eclaires", "February", "900"],
    ["Nesley", "February", "1200"],

    ["Milkybar", "March", "250"],
    ["Silk", "March", "450"],
    ["Dairy Milk", "March", "750"],
    ["Eclaires", "March", "850"],
    ["Nesley", "March", "100"],

    ["Milkybar", "April", "250"],
    ["Silk", "April", "450"],
    ["Dairy Milk", "April", "750"],
    ["Eclaires", "April", "850"],
    ["Nesley", "April", "100"],

    ["Milkybar", "May", "300"],
    ["Silk", "May", "550"],
    ["Dairy Milk", "May", "850"],
    ["Eclaires", "May", "950"],
    ["Nesley", "May", "1200"],

    ["Milkybar", "June", "350"],
    ["Silk", "June", "600"],
    ["Dairy Milk", "June", "900"],
    ["Eclaires", "June", "700"],
    ["Nesley", "June", "800"],

    ["Milkybar", "July", "400"],
    ["Silk", "July", "700"],
    ["Dairy Milk", "July", "800"],
    ["Eclaires", "July", "700"],
    ["Nesley", "July", "800"]

    ["Milkybar", "August", "500"],
    ["Silk", "August", "800"],
    ["Dairy Milk", "August", "900"],
    ["Eclaires", "August", "700"],
    ["Nesley", "August", "800"],

    ["Milkybar", "September", "450"],
    ["Silk", "September", "700"],
    ["Dairy Milk", "September", "800"],
    ["Eclaires", "September", "600"],
    ["Nesley", "September", "700"],

    ["Milkybar", "October", "600"],
    ["Silk", "October", "850"],
    ["Dairy Milk", "October", "950"],
    ["Eclaires", "October", "750"],
    ["Nesley", "October", "800"],

    ["Milkybar", "November", "500"],
    ["Silk", "November", "750"],
    ["Dairy Milk", "November", "850"],
    ["Eclaires", "November", "650"],
    ["Nesley", "November", "700"],

    ["Milkybar", "December", "550"],
    ["Silk", "December", "800"],
    ["Dairy Milk", "December", "900"],
    ["Eclaires", "December", "700"],
    ["Nesley", "December", "750"],

  ];

  let salesManage = new Grouping(salesDataWithMonth);
  salesManage.findRunningByTotalMonth()
  salesManage.showRunningTotal();