// Filters
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// Buttons
let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
const bwButton = document.getElementById("bw-button"); // Black & White Button
const popButton = document.getElementById("pop-button"); // Pop Filter Button
const autoButton = document.getElementById("auto-button"); // Auto Filter Button

// Image & canvas Box and Image Element
let imgBox = document.querySelector(".img-box");
let img = document.getElementById("img");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Popup div
const popup = document.getElementById("popup");

window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

// Function to apply all filters
function applyFilters() {
  ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value}%)
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Function to show popup notifications
function showPopup(message) {
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000); // Hide after 2 seconds
}

function resetValue() {
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";

  // Reset the filter on the canvas
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  // When image is loaded, draw the canvas
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", applyFilters);
});

// Reset button functionality
reset.onclick = () => {
  resetValue();
};

// Black and White Filter
bwButton.onclick = () => {
  grayscale.value = "100";
  ctx.filter = `grayscale(100%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    showPopup("Black & White");
};

// Pop Filter Button functionality
popButton.onclick = () => {
  saturate.value = "150"; // Increase saturation for vivid colors
  contrast.value = "120"; // Increase contrast
  brightness.value = "110"; // Slightly increase brightness
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";

  applyFilters();
  showPopup("Auto pop");
};

// Auto Filter Button functionality
autoButton.onclick = () => {
  saturate.value = "110"; // Slightly increase saturation
  contrast.value = "110"; // Slightly increase contrast
  brightness.value = "110"; // Slightly increase brightness
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";

  applyFilters();
  showPopup("Auto Fix");
};

download.onclick = () => {
  download.href = canvas.toDataURL();
  Swal.fire({
    title: "Download Succes!",
    text: "",
    icon: "success",
  });
};
