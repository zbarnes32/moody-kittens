let kittens = []
// loadKittens();
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5
  }

  let index = kittens.findIndex(k => kitten.name == k.name);
  if (index != -1){
    throw new Error('Kitten name already taken')
  }

  setKittenMood(kitten);
  kittens.push(kitten);
  saveKittens();
  drawKittens();

  form.reset();
};

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens));
};

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenInfo = JSON.parse(window.localStorage.getItem('kittens'))
  if (kittenInfo){
    kittens = kittenInfo
  }
  drawKittens();
};

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenElem = document.getElementById('kittens');
  let template = "";
  
  kittens.forEach( kitten => { 
    template += `
  <div class="card-container p-2">
    <div class="kitten-card text-center kitten ${kitten.mood}">
      <h2 class="shadows-into-light-regular">${kitten.name}</h2>
          <img src="moody-logo.png" height="60px">
          <p>
            <span class="shadows-into-light-regular">${kitten.mood}</span>
          </p>
           <button onclick="pet('${kitten.id}')">Pet</button>
           <button onclick="catnip('${kitten.id}')">Catnip</button>
        </div>
    </div>
  `
});

kittenElem.innerHTML = template;
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kitten => {
    return kitten.id == id
  });
    if (index === -1){
      throw new Error('Kitten not found!');
    }
    return kittens[index];
    
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id);
  let randomNumber = Math.random();
  if (randomNumber > 0.5){
    kitten.affection += 1;
  } else {
    kitten.affection -= 1;
  }

  setKittenMood(kitten);
  drawKittens();
  saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.affection = 5;
  setKittenMood(kitten);
  drawKittens();
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
 if (kitten.affection >= 10){
  kitten.mood = "happy";
 } else if (kitten.affection >= 5){
  kitten.mood = "tolerant";
 } else if (kitten.affection >= 2){
  kitten.mood = "angry";
 } else {
  kitten.mood = "gone";
 }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = [];
  saveKittens();
  drawKittens();
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();

