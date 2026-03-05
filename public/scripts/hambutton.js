const hambutton = document.querySelector("#hambutton");
const navigation = document.querySelector("nav ul");

hambutton.addEventListener("click", () => {
    hambutton.classList.toggle("open");
    navigation.classList.toggle("open");
});