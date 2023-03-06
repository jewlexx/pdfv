import { invoke } from '@tauri-apps/api/tauri';
import * as pdf from 'pdfjs-dist';

pdf.GlobalWorkerOptions.workerSrc =
  '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const outputScale = window.devicePixelRatio || 1;

enum OpenType {
  PICK = 'Pick',
  DEFAULT = 'Default',
}

async function loadPdf(type: OpenType) {
  const pdfBytes = await invoke<number[]>('open_pdf', { openType: type }).then(
    (x) => Uint8Array.from(x),
  );

  console.log(pdfBytes);
  const doc = await pdf.getDocument(pdfBytes).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 1 });

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = Math.floor(viewport.width) + 'px';
  canvas.style.height = Math.floor(viewport.height) + 'px';

  const transform =
    outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

  await page.render({
    canvasContext: ctx!,
    transform: transform!,
    viewport: viewport,
  }).promise;
}

loadPdf(OpenType.DEFAULT);
