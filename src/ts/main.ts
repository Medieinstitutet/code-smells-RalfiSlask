/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getSumOfLongJumps(longJumpings: number[]): number {
  return longJumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

// TEST 1

console.log('long jumps test:', getSumOfLongJumps([1, 2, 3]));

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

function getStudentGradeBasedOnTime(student: Student): string {
  student.passed = student.name === 'Sebastian' && student.handedInOnTime;

  return student.passed ? 'VG' : 'IG';
}

// TEST 2

const sebastian = new Student('Sebastian', true, false);

console.log('student grades:', getStudentGradeBasedOnTime(sebastian));

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temperature {
  constructor(
    public location: string,
    public dateOfReading: Date,
    public temperatureMeasurment: number
  ) {}
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

function averageWeeklyTemperatureInStockholm(
  temperatureReadings: Temperature[]
) {
  const DAYS_IN_WEEK = 7;
  const MS_IN_WEEK = 604800000;
  const timeStamp = Date.now() - MS_IN_WEEK;

  const stockholmTemperatures = temperatureReadings.filter(
    (reading) =>
      reading.location === 'Stockholm' &&
      reading.dateOfReading.getTime() > timeStamp
  );

  const totalTemperature = stockholmTemperatures.reduce((previous, current) => {
    return previous + current.temperatureMeasurment;
  }, 0);

  return totalTemperature / DAYS_IN_WEEK;
}

const stockholm = new Temperature('Stockholm', new Date('2024-03-18'), 45);

// TEST 3

console.log(
  'weekly temperature: ',
  averageWeeklyTemperatureInStockholm([stockholm])
);

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

export interface IProduct {
  name: string;
  price: string;
  image: string;
  parentElement: HTMLElement;
}

function renderProductAsHTML(product: IProduct) {
  const { name, price, image, parentElement } = product;

  const productContainer = document.createElement('div');
  const productTitle = document.createElement('h4');
  const productPrice = document.createElement('strong');
  const productImage = document.createElement('img');

  productTitle.textContent = name;
  productPrice.textContent = price.toString();
  productImage.src = image;

  productContainer.append(productTitle, productImage, productPrice);
  parentElement.appendChild(productContainer);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function renderStudents(students: Student[]) {
  // skulle kunna använda template literals med dynamiskt id, kan sänka läsbarhet?
  const passedList = document.querySelector('ul#passedstudents');
  const failedList = document.querySelector('ul#failedstudents');

  for (const student of students) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = student.handedInOnTime ? true : false;
    listItem.appendChild(checkbox);

    if (student.handedInOnTime) {
      passedList?.appendChild(listItem);
    } else {
      failedList?.appendChild(listItem);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

const loremIpsumWords = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

// Funderade på olika namn här, antingen joinWords eller mer generisk getStringFromArray i fall den kommer att återanvändas

function getStringFromArray(array: string[]) {
  return array.join(' ');
}

// TEST 6

console.log('string from array:', getStringFromArray(loremIpsumWords));

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

export interface IUser {
  birthday: Date;
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  address?: string;
}

function createUser(userInfo: IUser) {
  const START_YEAR_EPOCH = 1970;

  // Validation
  const ageDifferenceMS = Date.now() - userInfo.birthday.getTime();
  const ageAsDate = new Date(ageDifferenceMS);
  const userAgeInYears = Math.abs(
    ageAsDate.getUTCFullYear() - START_YEAR_EPOCH
  );

  if (userAgeInYears < 20) {
    return 'Du är under 20 år';
  } else {
    // Logik för att skapa en användare
  }
}

// TEST 7

console.log('createUser:', createUser({ birthday: new Date('2004-06-02') }));

/*
8. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum SortByCategory {
  PRICE_ASCENDING = 'Stigande pris',
  PRICE_DESCENDING = 'Sjunkande pris',
  NAME_ALPHABETIC = 'Alfabetisk ordning',
  NAME_ALPHABETIC_REVERSE = 'Omvänd alfabetisk ordning',
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

export function SortProductsByCategory(
  category: SortByCategory,
  products: Product[]
): Product[] {
  // shallow array med spread istället för att pusha in i en ny array
  return [...products].sort((product1, product2) => {
    switch (category) {
      case SortByCategory.PRICE_ASCENDING:
        return product1.price - product2.price;
      case SortByCategory.PRICE_DESCENDING:
        return product2.price - product1.price;
      case SortByCategory.NAME_ALPHABETIC:
        return product1.name.localeCompare(product2.name);
      case SortByCategory.NAME_ALPHABETIC_REVERSE:
        return product2.name.localeCompare(product1.name);
      default:
        return 0;
    }
  });
}

// TEST 8

const JennisProduct = new Product(1, 'Jenni', ['url'], 45, 'tomater');
const JannesProduct = new Product(2, 'Janne', ['url'], 10345, 'portabel bastu');
const SebastianProduct = new Product(3, 'Sebastian', ['url'], 999, 'löparskor');

const fed23Products = [JennisProduct, JannesProduct, SebastianProduct];

console.log(
  'sortera på pris:',
  SortProductsByCategory(SortByCategory.PRICE_DESCENDING, fed23Products)
);

console.log(
  'sortera på nam:',
  SortProductsByCategory(SortByCategory.NAME_ALPHABETIC_REVERSE, fed23Products)
);

/*
  9. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}

export interface IPicture {
  pictureSrc: string;
  pictureAlt: string;
}

export interface IProductDetails {
  name: string;
  price: string;
  info: string;
}

export interface IProductInfo extends IProductDetails, IPicture {
  productSpec: boolean;
  category: 'sassy' | 'kriminella' | 'singlar' | 'puppy' | 'oldies';
}

export const cartList = JSON.parse(
  localStorage.getItem('savedCartList') || '[]'
);
export const productList: IProductInfo[] = JSON.parse(
  localStorage.getItem('savedList') || '[]'
);

const getSumOfCartList = (cartList: { quantity: number }[]) => {
  return cartList.reduce(
    (prevCartProduct, currentCartProduct) =>
      prevCartProduct + currentCartProduct.quantity,
    0
  );
};

const createDogImage = (pictureInfo: IPicture) => {
  const { pictureSrc, pictureAlt } = pictureInfo;
  const dogImg: HTMLImageElement = document.createElement('img');
  // adding id
  dogImg.id = 'dogImage';
  dogImg.src = pictureSrc;
  dogImg.alt = pictureAlt;
  return dogImg;
};

// skapade en generisk funktion, kanske bör ha mer specifik, men hade två element som hade samma logik
const createDivElementWithClass = (className: string) => {
  const divElement: HTMLDivElement = document.createElement('div');
  divElement.className = className;
  return divElement;
};

const createCartSymbol = (className: string) => {
  const cartSymbol: HTMLElement = document.createElement('i');
  cartSymbol.className = className;
  cartSymbol.id = 'cartSymbol';
  return cartSymbol;
};

const createHeadings = (namePriceInfo: IProductDetails) => {
  const { name, price, info } = namePriceInfo;
  const nameHeading: HTMLHeadingElement = document.createElement('h5');
  const priceHeading: HTMLHeadingElement = document.createElement('h5');
  const infoHeading: HTMLHeadingElement = document.createElement('h5');
  nameHeading.textContent = name;
  priceHeading.textContent = `$${price}`;
  infoHeading.textContent = info;
  return { nameHeading, priceHeading, infoHeading };
};

const createFloatingCart = (quantity: number) => {
  const floatingCart = document.getElementById(
    'floatingCartNumber'
  ) as HTMLElement;
  floatingCart.textContent = `${quantity}`;
};

// Using event delegation instead
const attachEventListeners = (
  imageContainer: HTMLDivElement,
  product: IProductInfo,
  index: number
) => {
  imageContainer.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'dogImage') {
      target.classList.add('hover');
    }
  });
  imageContainer.addEventListener('mouseout', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'dogImage') {
      target.classList.remove('hover');
    }
  });

  imageContainer.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'dogImage') {
      product.productSpec = !product.productSpec;
      window.location.href = 'product-spec.html#backArrow';
      localStorage.setItem('savedList', JSON.stringify(productList));
    }
  });

  imageContainer.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'cartSymbol') {
      let cart = new Cart();
      cart.addToCart(index);
    }
  });
};

export function renderProducts() {
  const quantity = getSumOfCartList(cartList);
  createFloatingCart(quantity);

  productList.forEach((product, index) => {
    const { pictureSrc, name, price, info, pictureAlt, category } = product;

    const namePriceInfo = {
      name,
      price,
      info,
    };

    const pictureInfo = { pictureSrc, pictureAlt };

    const dogProduct: HTMLDivElement = document.createElement('div');
    const dogImgContainer = createDivElementWithClass('dogImageContainer');
    const cartSymbolContainer = createDivElementWithClass(
      'cartSymbolContainer'
    );
    const cartSymbol = createCartSymbol('bi bi-bag-plus');

    const dogImg = createDogImage(pictureInfo);
    const categoryContainer = document.getElementById(category) as HTMLElement;
    const headings = createHeadings(namePriceInfo);

    const { nameHeading, priceHeading, infoHeading } = headings;

    dogImgContainer.append(dogImg, cartSymbolContainer);
    cartSymbolContainer.appendChild(cartSymbol);
    dogProduct.append(dogImgContainer, nameHeading, priceHeading, infoHeading);
    categoryContainer.appendChild(dogProduct);

    product.productSpec = false;

    attachEventListeners(dogImgContainer, product, index);
  });

  localStorage.setItem('savedList', JSON.stringify(productList));
  sessionStorage.clear();
}

/*
  10. Refaktorera funktionen getfromstorage
  */

// separerar klass och id namn klass namn-namn, id camelCase namnNamn

export interface ICartProduct {
  name: string;
  image: string;
  price: number;
  amount: number;
}

export interface IContainers {
  titleContainer: HTMLTableRowElement;
  amountContainer: HTMLDivElement;
  productQuantity: HTMLTableRowElement;
  checkoutTotal: HTMLTableCellElement;
}

const createTableElementWithTextAndClass = (
  className?: string,
  text?: string
) => {
  const tableElement: HTMLTableCellElement = document.createElement('th');
  if (text) {
    tableElement.textContent = text;
  }
  if (className) {
    tableElement.className = className;
  }
  return tableElement;
};

const getStoredCartProducts = () => {
  const storedCartProducts: string = localStorage.getItem('cartArray') || '';
  const parsedCartProducts: ICartProduct[] = JSON.parse(storedCartProducts);
  return parsedCartProducts;
};

const createFontAwesomeIconButton = (
  iconClassName: string,
  buttonClassName: string
) => {
  const button = document.createElement('button');
  const awesomeIcon = document.createElement('i');
  awesomeIcon.className = iconClassName;
  button.appendChild(awesomeIcon);
  button.className = buttonClassName;
  return button;
};

const getSumOfCartProducts = (cartProducts: ICartProduct[]) => {
  return cartProducts.reduce((prevProd, currProd) => {
    return prevProd + currProd.price * currProd.amount;
  }, 0);
};

const renderProduct = (cartProduct: ICartProduct, containers: IContainers) => {
  const { name, amount } = cartProduct;
  const { titleContainer, amountContainer, productQuantity } = containers;
  const product = createTableElementWithTextAndClass(name, 'product');
  const cartProductsAmount = createTableElementWithTextAndClass(
    `x${amount}`,
    'amount'
  );
  const amountQuantity = createTableElementWithTextAndClass(
    undefined,
    'amount-quantity'
  );
  const amountPlusButton = createFontAwesomeIconButton(
    'fas fa-plus',
    'plus-button'
  );
  const amountMinusButton = createFontAwesomeIconButton(
    'fas fa-minus',
    'minus-button'
  );

  titleContainer.appendChild(product);
  amountContainer.append(
    cartProductsAmount,
    amountPlusButton,
    amountMinusButton
  );
  productQuantity.appendChild(amountQuantity);
};

const createContainers = () => {
  const amountContainer = document.getElementById(
    'amountCheckoutContainer'
  ) as HTMLDivElement;
  const titleContainer = document.getElementById(
    'titleContainer'
  ) as HTMLTableRowElement;
  const productQuantity = document.getElementById(
    'productQuantity'
  ) as HTMLTableRowElement;
  const checkoutTotal = document.getElementById(
    'titleTotal'
  ) as HTMLTableCellElement;
  const strong = document.createElement('strong');

  strong.textContent = 'products:';

  titleContainer.appendChild(strong);
  return { amountContainer, titleContainer, productQuantity, checkoutTotal };
};

const appendContainers = (containers: IContainers) => {
  const { amountContainer, productQuantity, checkoutTotal } = containers;
  const amountTable = createTableElementWithTextAndClass('amount:');
  const quantityText = createTableElementWithTextAndClass('change quantity:');
  const totalText = createTableElementWithTextAndClass('total:');

  amountContainer.appendChild(amountTable);
  productQuantity.appendChild(quantityText);
  checkoutTotal.appendChild(totalText);
};

function updateCartDisplay() {
  const containers = createContainers();
  appendContainers(containers);

  const cartProducts = getStoredCartProducts();
  cartProducts.forEach((cartProduct) => {
    renderProduct(cartProduct, containers);
  });

  const sumOfCartProducts = getSumOfCartProducts(cartProducts);
  const totalPrice = createTableElementWithTextAndClass(
    `${sumOfCartProducts}$`,
    'totalPriceCenter'
  );
  containers.checkoutTotal.appendChild(totalPrice);
}
