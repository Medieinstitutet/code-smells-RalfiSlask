/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  return totalNumber;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

function averageWeeklyTemperature(heights: Temp[]) {
  let r = 0;

  for (let who = 0; who < heights.length; who++) {
    if (heights[who].q === "Stockholm") {
      if (heights[who].where.getTime() > Date.now() - 604800000) {
        r += heights[who].v;
      }
    }
  }

  return r / 7;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}

/*
8. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];
  if (sort === Sort.PRICE_ASCENDING) {
    sortedList = sortList("Price", copiedList);
    sortedList.reverse();
  } else if (sort === Sort.PRICE_DECENDING) {
    sortedList = sortList("Price", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC) {
    sortedList = sortList("Name", copiedList);
  } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
    sortedList = sortList("Name", copiedList);
    sortedList.reverse();
  }

  return sortedList;
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      if (p1.price < p2.price) {
        return 1;
      } else if (p1.price > p2.price) {
        return -1;
      }
      return 0;
    } else {
      if (p1.name < p2.name) {
        return 1;
      } else if (p1.name > p2.name) {
        return -1;
      }
      return 0;
    }
  });
}

/*
  9. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }
  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });

    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "kriminella") {
      let cat2: HTMLElement = document.getElementById(
        "kriminella"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "singlar") {
      let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }
  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

/*
  10. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
