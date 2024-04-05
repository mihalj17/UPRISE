class Person {
  constructor(first_name, last_name, date_of_birth, gender, location) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    this.gender = gender;
    this.location = location;
  }
}
const iblerovTrgLocation = { latitude: 45.8135, longitude: 15.9783 };

function createRandomDateOfBirth() {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  const year = Math.floor(Math.random() * (2001 - 1967 + 1)) + 1967;
  return `${year}-${month}-${day}`;
}

function createRandomLocation() {
  const latitude = Math.random() * (67.85 - 27.7) + 45.81;
  const longitude = Math.random() * (32.05 - 8.9) + 15.9;
  return { latitude, longitude };
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(location1, location2) {
  const earthRadius = 6371;
  const latitude1 = location1.latitude;
  const longitude1 = location1.longitude;
  const latitude2 = location2.latitude;
  const longitude2 = location2.longitude;

  const distanceLatitude = toRadians(latitude2 - latitude1);
  const distanceLongitude = toRadians(longitude2 - longitude1);

  const a =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

function findClosestPerson(people) {
  let closestDistance = Infinity;
  let closestPerson = null;

  people.forEach((person) => {
    const distance = calculateDistance(person.location, iblerovTrgLocation);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPerson = person;
    }
  });

  return closestPerson;
}

function createNewSetWithOlderPeople(people) {
  const newSet = people.map((person) => {
    const [year, month, day] = person.date_of_birth.split("-");
    const newYear = parseInt(year) - 5;
    const newDateOfBirth = `${newYear}-${month}-${day}`;

    return {
      ...person,
      date_of_birth: newDateOfBirth,
    };
  });

  return newSet;
}

function createPerson() {
  const first_names_male = [
    "Matko",
    "Ivan",
    "Marko",
    "Petar",
    "Josip",
    "Ante",
    "Tomislav",
    "Fran",
    "Mihovil",
    "Adrian",
  ];
  const first_names_female = [
    "Josipa",
    "Ankica",
    "Anamarija",
    "Iva",
    "Jelena",
    "Katarina",
    "Anastazija",
    "Marija",
  ];
  const last_names = [
    "Mihalj",
    "Cabraja",
    "Cosic",
    "Rajzl",
    "Vukovic",
    "Beljan",
    "Simon",
    "Mandaric",
  ];

  const first_name =
    Math.random() < 0.5
      ? first_names_male[Math.floor(Math.random() * first_names_male.length)]
      : first_names_female[
          Math.floor(Math.random() * first_names_female.length)
        ];
  const last_name = last_names[Math.floor(Math.random() * last_names.length)];
  const date_of_birth = createRandomDateOfBirth();
  const gender = first_name in first_names_male ? "M" : "F";
  const location = createRandomLocation();

  return new Person(first_name, last_name, date_of_birth, gender, location);
}

function main() {
  // Kreiranje inicijalnog seta od ukupno 100 muških i ženskih osoba
  const main_set = Array.from({ length: 100 }, createPerson);
  main_set.forEach((person) =>
    console.log(
      `${person.last_name}, ${person.first_name},${person.date_of_birth}`
    )
  );
  console.log("------------------------------------");

  // Sortiranje inicijalnog seta po prezimenu u formatu "Prezime, Ime"
  const sorted_set = main_set
    .slice()
    .sort((a, b) => a.last_name.localeCompare(b.last_name));
  sorted_set.forEach((person) =>
    console.log(
      `${person.last_name}, ${person.first_name},${person.date_of_birth}`
    )
  );
  console.log("------------------------------------");

  // Pronalazak osobe koja se nalazi najbliže IBEROVOM TRGU 10
  const closestPerson = findClosestPerson(main_set);
  console.log("Osoba najbliže Iblerovom trgu 10:");
  console.log(`Ime: ${closestPerson.first_name}`);
  console.log(`Prezime: ${closestPerson.last_name}`);
  console.log(
    `Koordinate: Latitude: ${closestPerson.location.latitude}, Longitude: ${closestPerson.location.longitude}`
  );
  console.log("------------------------------------");

  //Stvaranje novog seta na bazi inicijalnog u kojem su osobe 5 godina starije
  const olderSet = createNewSetWithOlderPeople(sorted_set);
  olderSet.forEach((person) =>
    console.log(
      `${person.last_name}, ${person.first_name}, ${person.date_of_birth}`
    )
  );
}
main();
