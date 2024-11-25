const uploadInput = document.getElementById("imageUpload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.getElementById("downloadButton");
const traits = document.querySelectorAll(".traits button");

// Load image onto canvas
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    };
    reader.readAsDataURL(file);
  }
});

// Apply personality filters
traits.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    applyFilter(filter);
  });
});

function applyFilter(filter) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw image with filter
  const img = new Image();
  img.src = canvas.toDataURL();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Apply overlay based on filter
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = getFilterColor(filter);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
}

function getFilterColor(filter) {
  const colors = {
    "X-Bold": "red",
    "X-Young": "yellow",
    "X-Rebel": "purple",
    "X-Dreamer": "blue",
    "X-Creator": "orange",
    "X-Adventurer": "green",
    "X-Loyal": "brown",
    "X-Charismatic": "pink",
    "X-Passionate": "crimson",
    "X-Edgy": "black",
  };
  return colors[filter] || "white";
}

// Download image
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
