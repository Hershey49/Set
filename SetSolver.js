// -----------Get set table data------------
const getVisibleCardNodes = () => {
  const setCards = [];

  const allDivs = document.getElementsByTagName("div");
  for (const i in allDivs) {
    const divStyle = allDivs[i].getAttribute?.("style");
    if (
      divStyle &&
      divStyle.includes("transition: width 0.5s ease 0s, height 0.5s ease 0s") //Making sure cards are visbible on the screen
    ) {
      setCards.push(allDivs[i]);
    }
  }

  const visibleCards = [];

  for (const i in setCards) {
    const card = setCards[i];
    if (card.parentElement.outerHTML.includes("visible")) {
      visibleCards.push(card);
    }
  }
  
  return visibleCards;  
};

const getSetTableData = () => {
  const visibleCards = getVisibleCardNodes();

  const setTableData = visibleCards.map((card) => {
    const svgs = card.getElementsByTagName("use");

    console.log(svgs[0], card);


    const color = svgs[1]
      ? svgs[1].getAttribute("stroke")
      : svgs[0].getAttribute("fill");


    const isTransparent = svgs[0].getAttribute("fill") === "transparent";
    const isStriped = svgs[0].getAttribute("mask") === "url(#mask-stripe)";
    const shade = isTransparent
      ? "transparent"
      : isStriped
      ? "striped"
      : "solid";


    const quantity = card.getElementsByTagName("svg").length;


    const shape = svgs[0].getAttribute("href");

    return {
      shape,
      shade,
      color,
      quantity,
    };
  });

  return setTableData;
};

// -------------------Find sets--------------------
const areAllEqualOrUnique = (a, b, c) =>
  (a === b && b === c) || (a !== b && a !== c && b !== c);

const isSet = (setTable, index1, index2, index3) =>
  areAllEqualOrUnique(
    setTable[index1].color,
    setTable[index2].color,
    setTable[index3].color
  ) &&
  areAllEqualOrUnique(
    setTable[index1].quantity,
    setTable[index2].quantity,
    setTable[index3].quantity
  ) &&
  areAllEqualOrUnique(
    setTable[index1].shape,
    setTable[index2].shape,
    setTable[index3].shape
  ) &&
  areAllEqualOrUnique(
    setTable[index1].shade,
    setTable[index2].shade,
    setTable[index3].shade
  );

const getSets = (setTable) => {
  let sets = [];

  for (let cardA = 0; cardA < setTable.length - 2; cardA++) {
    for (let cardB = cardA + 1; cardB < setTable.length - 1; cardB++) {
      for (let cardC = cardB + 1; cardC < setTable.length; cardC++) {
        if (isSet(setTable, cardA, cardB, cardC)) {
          sets.push([cardA, cardB, cardC]);
        }
      }
    }
  }

  return sets;
};

function findSets() {
  const tableNodes = getVisibleCardNodes();
  const tableData = getSetTableData();

  const sets = getSets(tableData);

  console.log({ tableData, sets });

  tableNodes.forEach((node) => {
  });

  if (sets[0]) {
    sets[0].forEach((index) => {
      tableNodes[index].click();
    });
  }

  if (sets[1]) {
    sets[1].forEach((index) => {
      tableNodes[index].click();
    });
  }

  if (sets[2]) {
    sets[2].forEach((index) => {
      tableNodes[index].click();
    });
  }
}


const addHighlightSetsButton = () => {
  const button = document.createElement("button");
  button.textContent = "Highlight Sets (h)";
  button.style.position = "fixed";
  button.style.top = "2rem";
  button.style.left = "0";
  button.style.zIndex = "9999";
  button.style.backgroundColor = "salmon";
  button.style.color = "white";
  button.style.border = "none";
  button.style.padding = "0.5rem 0.75rem";
  button.style.fontWeight = "bold";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  document.body.appendChild(button);

  document.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      findSets();
    }
  });
};

addHighlightSetsButton();
