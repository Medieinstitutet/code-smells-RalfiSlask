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
  const passedList = document.querySelector('ul#passedstudents'); // skulle kunna använda template literals med dynamiskt id?
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
