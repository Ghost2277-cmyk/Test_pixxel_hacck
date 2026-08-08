const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/EcoLife\./g, 'SYLVA-eCO LIFE.')
    .replace(/EcoLife\"/g, 'SYLVA-eCO LIFE\"')
    .replace(/EcoLife</g, 'SYLVA-eCO LIFE<')
    .replace(/\"EcoLife\"/g, '\"SYLVA-eCO LIFE\"')
    .replace(/Preparing your EcoLife\.\.\./g, 'Preparing your SYLVA-eCO LIFE...')
    .replace(/EcoLife\?/g, 'SYLVA-eCO LIFE?')
    .replace(/EcoLife Inc\./g, 'SYLVA-eCO LIFE Inc.')
    .replace(/EcoLife transforms/g, 'SYLVA-eCO LIFE transforms')
    .replace(/EcoLife users/g, 'SYLVA-eCO LIFE users')
    .replace(/Join EcoLife/g, 'Join SYLVA-eCO LIFE')
    .replace(/EcoLife \|/g, 'SYLVA-eCO LIFE |')
    .replace(/>EcoLife</g, '>SYLVA-eCO LIFE<')
    .replace(/EcoLife experience/g, 'SYLVA-eCO LIFE experience')
    .replace(/EcoLife integrates/g, 'SYLVA-eCO LIFE integrates')
    .replace(/Why EcoLife/g, 'Why SYLVA-eCO LIFE')
    .replace(/EcoLife turned/g, 'SYLVA-eCO LIFE turned')
    .replace(/use EcoLife/g, 'use SYLVA-eCO LIFE');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Updated ' + filePath);
  }
}

function walk(dir) {
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      walk(file);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        replaceInFile(file);
      }
    }
  });
}

walk('c:/Anti gravity/ecolife/src');
