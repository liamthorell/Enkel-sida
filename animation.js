//animerar element som har classen "animate". När användaren skrollar till
//elementet så kommer elementet att animeras uppåt och förstoras lite.
//Jag använder mig av "ScrollReveal" javascript librariet för att lätt göra detta.
//https://scrollrevealjs.org/guide/hello-world.html

ScrollReveal().reveal(".animate", {
  distance: "20%",
  duration: 3000,
  origin: "bottom",
  opacity: null,
  scale: 0.7,
});
