//Denna funktion öppnar menyn i HTML. Den gör det genom att ändra "width"
//på div:en med id "menu" till 100%
function openMenu() {
  document.getElementById("menu").style.width = "100%";
}

//Denna funktion stänger menyn i HTML. Den gör det genom att ändra "width"
//på div:en med id "menu" till 0%
function closeMenu() {
  document.getElementById("menu").style.width = "0%";
}
