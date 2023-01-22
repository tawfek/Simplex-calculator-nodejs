/**
 * MIT License
 * Copyright <2023> <Tawfeeq Mohammed> <kirkuk university> 
 * Coptyright contact <tawfekaltaae3@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

/**
 * 
 * Requirments :
 * 
 * nodejs ^16+
 * prompt-sync ^4.2.0+
 * 
 * STEP 1 : 
 * installing nodejs 18 lts :
 * for windows users : https://nodejs.org/dist/v18.13.0/node-v18.13.0-x64.msi
 * for mac users : https://nodejs.org/dist/v18.13.0/node-v18.13.0.pkg
 * for linux users : https://nodejs.org/dist/v18.13
 * 
 * OR you can install it from the attached file (/requirments/node18.msi)
 * 
 * STEP 2 : 
 * then inside the project folder run the command :
 *   # npm install

 * STEPT 3: 
 * to run the project run the command :
 *   # node index.js
 * 
*/

/**
 * 
 * Basics in javascript : 
 * 
 *  console.log(text) : to print in the console
 *  console.table(array) : to print the array as table in the console
 * 
 *  array.push(element) : to push new element in the array
 *  array.slice(start, end) :  generate a shallow copy of a portion of an array into a new array 
 *  array.map(function) : loop over the elements and minpulate elements values
 * 
 *  element += value : is equal to (element = element + value)
 *  element /= value : is equal to (element = element / value)
 *  element -= value : is equal to (element -= value)
 *  element *= value : is equal to (element * value)
 */

const prompt = require("prompt-sync")({ sigint: true });

// getting Objective values from user input
console.log("Objective equation : ");
firstObjectiveValue = prompt("first objective variable value (x1) : ");
secondObjectiveValue = prompt("first variable value (x2) : ");

// The equation maximize  12x + 8x
let objective = [firstObjectiveValue, secondObjectiveValue, "Max"];

let constrain = [];

let constrainLength = prompt("How many constrain equation you have : ");

for (let c = 0; c < constrainLength; c++) {
  console.log(`Constrain equation ${c + 1} : `);
  let firstConstrainValue = prompt(`equation ${c + 1} first variable value : `);
  let secondConstrainValue = prompt(
    `equation ${c + 1} second variable value : `
  );
  let maxConstrainValue = prompt(
    `equation ${firstConstrainValue} + ${secondConstrainValue} <=  `
  );
  constrain.push([
    firstConstrainValue,
    secondConstrainValue,
    maxConstrainValue,
    "<=",
  ]);
}

console.log(objective);
console.table(constrain);

// ccreate empty array to push contents into table
let table = [];

/**
 * copy the contents of the objective array into new array
 * to combine them with constraint array
 * using slice function in js
 *
 * Array.prototype.slice() Reference :
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#:~:text=The%20slice()%20method%20returns,array%20will%20not%20be%20modified.
 *  */
const cj = objective.slice(0, objective.length - 1);

/**
 * push zero values to CJ on how many contstrain we have
 */
for (i = 0; i < constrain.length; ++i) {
  cj.push(0);
}

console.log("CJ", cj);
console.log("\nTable:1");

/**
 * Map on constrain values
 * to optmize the table
 *
 * Array.prototype.map() reference :
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

constrain.map((equation, index) => {
  // create new array to push zero as x1 values
  let temp = [0];
  // push the steps to array s1,s2 ...
  temp.push("s" + (index + 1));

  /**
   * push only variables max values from equation to the array
   * example :
   *  equation [ 8 , 6 , 2200 , '<= ]
   *  equation [ 4 , 9 , 1800 , '<=']
   *  will be pushed only 2200 and 1800
   */
  temp.push(equation[equation.length - 2]);

  /**
   * push only variables values from equation to the array
   * example :
   *  equation [ 8 , 6 , 2200 , '<= ]
   *  equation [ 4 , 9 , 1800 , '<=']
   *  will be pushed only 8 , 6 , 4 and 9
   */
  for (i = 0; i < equation.length - 2; ++i) {
    temp.push(equation[i]);
  }

  /**
   * loop on constrain equations and add new arrays to them
   */
  for (i = 0; i < constrain.length; ++i) {
    // check if current equation index is the same as i value then push 0
    if (index === i) {
      temp.push(1);
      continue;
    }
    // else will push zero
    temp.push(0);
  }

  // push the new array to the table
  table.push(temp);
});

// The max try (tables) that we can get
let maxTry = 3;

for (let itry = 0; itry < maxTry; ++itry) {
  // printing the table
  console.log(`\nTable:${itry + 1}`);
  console.table(table);

  /**
   * Generate new array with same length as the table without last two columns
   * and fill it with zero values
   */
  let zj = new Array(table[0].length - 2).fill(0);

  /**
   * Map through table contents
   */
  table.map((data) => {
    /**
     * loop through table data skipping the first and the second element
     * Add new values to zj
     * example:
     *  equation [12 , s1 , 257]
     *  new zj value will be : 12 * 257 = 3300
     */
    for (j = 2; j < data.length; ++j) {
      zj[j - 2] += data[j] * data[0];
    }
  });

  let zj_cj = [];

  /**
   * combine zj and cj values
   * by the equation : zj[index + 1] - cj[index]
   */
  for (j = 0; j < cj.length; ++j) {
    zj_cj.push(zj[j + 1] - cj[j]);
  }

  console.log("ZJ", zj);
  console.log("ZJ-CJ", zj_cj);

  let keyCol = 3;

  // validation variable to check whether the equation is solved or not
  // check first element in zj_cj is its minus then its not solved
  let isSolved = zj_cj[0] < 0 ? false : true;

  /**
   * map through zj_cj values and check for minus values
   * if there were a minus values
   * then the equation is not solved and need to try again
   */
  zj_cj.map((num, index) => {
    /**
     * Check if zj_cj first value is negative
     * then go to the third value of zj_cj and check it again
     */
    if (num < zj_cj[keyCol - 3] && num < 0) {
      keyCol = index + 3;
      isSolved = false;
    }
  });

  // check if equation solved then break the loop and don't try again
  if (isSolved !== false) {
    console.log("Equation Solved");
    break;
  }

  let keyRow = 0;

  let previousTable = table[0][2] / table[0][keyCol];

  // add flag for all negative values after dividing
  if (previousTable <= 0) previousTable = 1e300;

  // map through table
  table.map((data, index) => {
    // divide the third column by keyCol
    const divideTemp = data[2] / data[keyCol];

    // check if the divided values is non-negative and less then the divided previous table value
    if (divideTemp < previousTable && divideTemp >= 0) {
      keyRow = index;
      // change the previous table value to the new divided values
      previousTable = divideTemp;
    }
  });

  optimizeTableValues(keyRow, keyCol);
}

/**
 * Function to calculate and optimize the table
 * @param {Integer} keyRow
 * @param {Integer} keyCol
 * @return {void}
 */
function optimizeTableValues(keyRow, keyCol) {
  /**
   * Get key element by dividing the keyRow and keyCol values that we got
   */
  const keyElement = table[keyRow][keyCol];

  /**
   * loop through the table starting from the third element
   */
  for (i = 2; i < table[keyRow].length; i++) {
    // change the values of the keyRow array by dividing them to the keyElement

    table[keyRow][i] /= keyElement;
    // another solution is : table[keyRow][i] = table[keyRow][i] / keyElement
  }

  /**
   * Go through the table content the minues the values by the keyCol
   */
  table.map((data, i) => {
    // check weather the current element is not the KeyRow
    if (i !== keyRow) {
      let colValue = data[keyCol];
      // loop starting from the third column
      for (j = 2; j < data.length; ++j) {
        // change the array values that inside the table
        // and decrease them by colValue and the values of the keyRow value
        table[i][j] -= colValue * table[keyRow][j];
      }
    }
  });

  // change the first element of the keyRow array that inside the table
  // and set it to cj value
  table[keyRow][0] = cj[keyCol - 3];

  // set the value of the key column to x1 instead of s1
  // when cj is 5 element is les then the cj array length and constrain length
  table[keyRow][1] =
    keyCol - 2 <= cj.length - constrain.length
      ? `x${keyCol - 2}`
      : `s${keyCol - constrain[0].length}`;
}
