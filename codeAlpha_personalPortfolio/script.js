const navBar = document.getElementById("navBar");
const displayNav = document.getElementById("nav");
const cancelNav = document.getElementById("cancel-btn");
const overlay = document.querySelectorAll(".section")
navBar.addEventListener("click", () =>{
    displayNav.style.display = "flex";
});
cancelNav.addEventListener("click", () => {
    displayNav.style.display="none";
});
for(let i =0;i<=overlay.length;i ++){
overlay[i].addEventListener("click", ()=>{
  if(displayNav.style.display="flex"){
      displayNav.style.display="none";
  }  
});
}

