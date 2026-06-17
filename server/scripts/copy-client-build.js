const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "../../client/dist");
const destination = path.join(__dirname, "../public");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(path.join(source, "index.html"))) {
  console.error("Erreur build : client/dist/index.html introuvable.");
  process.exit(1);
}

if (fs.existsSync(destination)) {
  fs.rmSync(destination, { recursive: true, force: true });
}

copyDir(source, destination);
console.log("Build client copié vers server/public");
