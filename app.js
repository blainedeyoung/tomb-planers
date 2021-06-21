// code to initialize popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map((popoverTriggerEl) => {
  return new bootstrap.Popover(popoverTriggerEl, {
    html: true,
    container: "body",
    placement: "top"
  })
});

//a list of words which will randomly appear in landscape image 1
//add more or substract some at your leisure, no other changes are necessary
const wordArray = ['exotic', 'mysterious', 'occult', 'distant', 'foreign', 'strange', 'hidden', 'forbidden', 'fascinating', 'alien', 'alluring', 'bizarre', 'unfamiliar', 'romantic', 'curious'];

//random numbers
const rnsL = [];
const rnsP = [];

//rearrange images in the grid
function rearrange() {
  //first hide any popovers that might be open
  $(".popover").removeClass("show");
  
  //fill random numbers arrays
  for(let i = 1; i < 7; i++) {
    rnsL.push(i);
    rnsP.push(i);
  }
  
  //randomize their order
  for(let i = 0; i < 6; i++) {
    let swapL = Math.floor(Math.random() * 6);
    let swapP = Math.floor(Math.random() * 6);
    let temp = rnsL[i];
    rnsL[i] = rnsL[swapL];
    rnsL[swapL] = temp;
    temp = rnsP[i];
    rnsP[i] = rnsP[swapP];
    rnsP[swapP] = temp;
  }

  //loop controller to skip a value of j after landscape images
  let con = false;
  
  console.log(rnsL);
  console.log(rnsP);
  //set grid-area for each image
  for(let i = 1; i < 4; i++) {
    for(let j = 1; j < 7; j++) {
      let coin = Math.random();
      if (con) {
        con = false;
        continue;
      } else if (j === 6) {
        $("#p" + rnsP.pop()).css("grid-area", i + " / 6 / span 1 / span 1");
        console.log("portrait on end");
        console.log(i);
        console.log(j);
      } else if (rnsL.length > 0 && coin >= .5) {
        $("#l" + rnsL.pop()).css("grid-area", i + " / " + j + " / span 1 / span 2");
        con = true;
        console.log("landscape");
        console.log(i);
        console.log(j);
      } else if (rnsP.length > 0) {
        $("#p" + rnsP.pop()).css("grid-area", i + " / " + j + " / span 1 / span 1");
        console.log("portrait");
        console.log(i);
        console.log(j);
      } else {
        $("#l" + rnsL.pop()).css("grid-area", i + " / " + j + " / span 1 / span 2");
        con = true;
      }
    }
  }
    //assign a new word to l1
    $("#l1").text(wordArray[Math.floor(Math.random() * wordArray.length)]);
    
    //make the function recur after ten seconds
    setTimeout(() => {
      rearrange();
    }, 10000);
}
    
// make the function recur after ten seconds
setTimeout(() => {
  rearrange();
}, 10000);