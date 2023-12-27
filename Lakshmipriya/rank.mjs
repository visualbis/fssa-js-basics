class SalesAnalyzer {
    constructor(data) {
        
        data.shift();

        
        data.forEach(item => {
            item[1] = parseInt(item[1]);
        });

        this.salesData = data;
        this.salesGroups = [
            { range: [100, 300], label: 'Poor' },
            { range: [300, 500], label: 'Neutral' },
            { range: [500, 1000], label: 'Good' }
        ];
    }

    categorizeSales(sales) {
        for (const group of this.salesGroups) {
            const [min, max] = group.range;
            if (sales >= min && sales <= max) {
                return group.label;
            }
        }
    }

    analyzeSales() {
        const sortedData = this.salesData.slice().sort((a, b) => b[1] - a[1]);

        let currentRank = 0;
        let currentSales = null;

        return sortedData.map(item => {
            const productName = item[0];
            const sales = item[1];
            const salesCategory = this.categorizeSales(sales);

            if (sales !== currentSales) {
                currentSales = sales;
                currentRank += 1;
            }

            return { productName, sales, salesCategory, salesRank: currentRank };
        });
    }
}

let sampleSalesData = [
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

const salesAnalyzer = new SalesAnalyzer(sampleSalesData);
const rankedData = salesAnalyzer.analyzeSales();

console.log(rankedData);
