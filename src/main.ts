import { invoke } from '@tauri-apps/api/tauri';
import pdf from 'pdfjs-dist';

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke('greet', {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  greetInputEl = document.querySelector('#greet-input');
  greetMsgEl = document.querySelector('#greet-msg');
  document
    .querySelector('#greet-button')
    ?.addEventListener('click', () => greet());
});

var viewport = page.getViewport({ scale: scale });

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = Math.floor(viewport.width * outputScale);
canvas.height = Math.floor(viewport.height * outputScale);
canvas.style.width = Math.floor(viewport.width) + 'px';
canvas.style.height = Math.floor(viewport.height) + 'px';
