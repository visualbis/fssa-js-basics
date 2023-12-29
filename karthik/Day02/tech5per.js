// Increase the profit by 5% if the compaany is technology

const data = [
    ["Category","SubCategory","Profit","Sales"  ],
    ["Technology","Copiers","55617.824900000036","149528.02999999994"  ],
    ["Technology","Phones","44515.73059999999","330007.0539999998"  ],
    ["Technology","Accessories","41936.635699999955","167380.318"  ],
    ["Technology","Machines","3384.756899999995","189238.631"  ],
    ["Office Supplies","Paper","34053.56929999999","78479.20599999995"  ],
    ["Office Supplies","Binders","30221.76329999999","203412.73300000004"  ],
    ["Office Supplies","Storage","21278.82639999999","223843.60799999998"  ],
    ["Office Supplies","Appliances","18138.00540000003","107532.1610000001"  ],
    ["Office Supplies","Envelopes","6964.176699999995","16476.402"  ],
    ["Office Supplies","Art","6527.786999999998","27118.791999999998"  ],
    ["Office Supplies","Labels","5546.253999999996","12486.312000000005"  ],
    ["Office Supplies","Fasteners","949.5181999999995","3024.2799999999997"  ],
    ["Office Supplies","Supplies","-1189.0994999999998","46673.53799999997"  ],
    ["Furniture","Chairs","26590.16630000003","328449.10300000064"  ],
    ["Furniture","Furnishings","13059.143600000005","91705.16399999989"  ],
    ["Furniture","Bookcases","-3472.5560000000046","114879.9963"  ],
    ["Furniture","Tables","-17725.481100000015","206965.53199999995"  ]
  ]

  
  const roundedData = data.map((row, index) => {
    if (index === 0) {
      return row;
    }
  
    const modifiedRow = row.map((value, columnIndex) => {
      if (columnIndex === 2 && row[0] === "Technology") {
        const increasedProfit = Math.round(parseFloat(value) * 1.05); // Increase by 5%
        return increasedProfit;
      } else {
        return value;
      }
    });
  
    return modifiedRow;
  });
  
  console.log(roundedData);