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

function getStudentGradeBasedOnHandedInTime(student: Student): string {
  student.passed = student.name === 'Sebastian' && student.handedInOnTime;

  return student.passed ? 'VG' : 'IG';
}

// TEST 2

const sebastian = new Student('Sebastian', true, false);

console.log('student grades:', getStudentGradeBasedOnHandedInTime(sebastian));

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

interface IProduct {
  name: string;
  price: string;
  image: string;
  parentElement: HTMLElement;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function generateProductAsHTML(product: IProduct) {
  const { name, price, image, parentElement } = product;

  const productContainer = document.createElement('div');
  const productTitle = document.createElement('h4');
  const productPrice = document.createElement('strong');
  const productImage = document.createElement('img');

  productTitle.textContent = name;
  productImage.src = image;
  productPrice.textContent = price.toString();

  productContainer.append(productTitle, productImage, productPrice);
  parentElement.appendChild(productContainer);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function generateStudentsInListAsHTML(students: Student[]) {
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

// Funderade på olika namn här, antingen joinWords eller mer generisk getStringFromArray, i fall den kommer att återanvändas

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

interface IUser {
  birthday: Date;
  username?: string;
  email?: number;
  password?: string;
  avatar?: string;
  address?: string;
}

function createUser(userInfo: IUser) {
  // Validation

  const START_YEAR_EPOCH = 1970;

  const ageDifferenceMS = Date.now() - userInfo.birthday.getTime();
  const ageAsDate = new Date(ageDifferenceMS);
  const userAgeInYears = Math.abs(
    ageAsDate.getUTCFullYear() - START_YEAR_EPOCH
  );

  if (userAgeInYears >= 20) {
    // Logik för att skapa en användare
  } else {
    return 'Du är under 20 år';
  }
}

// TEST 7

console.log('createUser:', createUser({ birthday: new Date('2004-06-02') }));

/*
8. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum SortByCategory {
  PRICE_ASCENDING = 'Stigande pris',
  PRICE_DECENDING = 'Sjunkande pris',
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
    if (category === SortByCategory.PRICE_ASCENDING) {
      return product1.price - product2.price;
    } else if (category === SortByCategory.PRICE_DECENDING) {
      return product2.price - product1.price;
    } else if (category === SortByCategory.NAME_ALPHABETIC) {
      // localCompare för strings
      return product1.name.localeCompare(product2.name);
    } else if (category === SortByCategory.NAME_ALPHABETIC_REVERSE) {
      return product2.name.localeCompare(product1.name);
    }
    return 0;
  });
}

// TEST 8

const JennisProduct = new Product(1, 'Jenni', ['url'], 45, 'tomater');
const JannesProduct = new Product(2, 'Janne', ['url'], 10345, 'portabel bastu');
const SebastianProduct = new Product(3, 'Sebastian', ['url'], 999, 'löparskor');

const fed23Products = [JennisProduct, JannesProduct, SebastianProduct];

console.log(
  'sortera på pris:',
  SortProductsByCategory(SortByCategory.PRICE_DECENDING, fed23Products)
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

interface IProduct {
  name: string;
  price: string;
  info: string;
  productSpec: boolean;
  pictureSrc: string;
  pictureAlt: string;
  category: 'sassy' | 'kriminella' | 'singlar' | 'puppy' | 'oldies';
}

interface IPicture {
  pictureSrc: string;
  pictureAlt: string;
}

export let cartList = JSON.parse(localStorage.getItem('savedCartList') || '[]');
export let productList: IProduct[] = JSON.parse(
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
  let dogImg: HTMLImageElement = document.createElement('img');
  dogImg.src = pictureSrc;
  dogImg.alt = pictureAlt;
  return dogImg;
};

// skapade en generisk funktion, kanske bör ha mer specifik, men hade två element som hade samma logik
const createDivElementWithClass = (className: string) => {
  let divElement: HTMLDivElement = document.createElement('div');
  divElement.className = className;
  return divElement;
};

const createCartSymbol = (className: string) => {
  const cartSymbol: HTMLElement = document.createElement('i');
  cartSymbol.className = className;
  return cartSymbol;
};

const createHeadings = () => {
  const nameHeading: HTMLHeadingElement = document.createElement('h5');
  const priceHeading: HTMLHeadingElement = document.createElement('h5');
  const infoHeading: HTMLHeadingElement = document.createElement('h5');
  return { nameHeading, priceHeading, infoHeading };
};

const createFloatingCart = (quantity: number) => {
  const floatingCart = document.getElementById(
    'floatingcartnumber'
  ) as HTMLElement;
  floatingCart.textContent = `${quantity}`;
};

const attachImageEventListeners = (
  image: HTMLImageElement,
  product: IProduct
) => {
  image.addEventListener('mouseover', () => {
    image.classList.add('hover');
  });
  image.addEventListener('mouseout', () => {
    image.classList.remove('hover');
  });
  image.addEventListener('click', () => {
    product.productSpec = !product.productSpec;
    window.location.href = 'product-spec.html#backArrow';
    localStorage.setItem('savedList', JSON.stringify(productList));
  });
};

const attachCartSymbolClickEvent = (cartSymbol: HTMLElement, index: number) => {
  cartSymbol.addEventListener('click', () => {
    let cart = new Cart();
    cart.addToCart(index);
  });
};

export function createProductHtml() {
  const quantity = getSumOfCartList(cartList);
  createFloatingCart(quantity);

  productList.forEach((product, index) => {
    let { pictureSrc, name, price, info, pictureAlt, productSpec, category } =
      product;

    const dogProduct: HTMLDivElement = document.createElement('div');
    const dogImgContainer = createDivElementWithClass('dogimagecontainer');
    const cartSymbolContainer = createDivElementWithClass(
      'cartSymbolContainer'
    );
    const cartSymbol = createCartSymbol('bi bi-bag-plus');
    const pictureInfo = { pictureSrc, pictureAlt };
    const dogImg = createDogImage(pictureInfo);
    const categoryContainer = document.getElementById(category) as HTMLElement;
    const headings = createHeadings();

    const { nameHeading, priceHeading, infoHeading } = headings;

    nameHeading.textContent = name;
    priceHeading.textContent = `$${price}`;
    infoHeading.textContent = info;

    dogImgContainer.append(dogImg, cartSymbolContainer);
    cartSymbolContainer.appendChild(cartSymbol);
    dogProduct.append(dogImgContainer, nameHeading, priceHeading, infoHeading);
    categoryContainer.appendChild(dogProduct);

    productSpec = false;

    attachImageEventListeners(dogImg, product);
    attachCartSymbolClickEvent(cartSymbol, index);
  });

  localStorage.setItem('savedList', JSON.stringify(productList));
  sessionStorage.clear();
}
