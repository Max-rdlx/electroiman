/* demo.js — controla la demo interactiva de la página
   Encuentra el control range, actualiza el texto y ajusta la opacidad/color de elementos SVG
*/
(function(){
  const slider = document.getElementById('strength');
  const valueEl = document.getElementById('strengthValue');
  const fieldLines = document.querySelectorAll('#fieldLines path');
  const core = document.getElementById('core');
  const coils = document.querySelectorAll('#coils path');

  function clamp(v,min,max){return Math.max(min,Math.min(max,v))}

  function update(v){
    v = clamp(Number(v),0,100);
    valueEl.textContent = v;

    // ajustar opacidad de líneas de campo
    const fieldOpacity = 0.02 + (v/100)*0.9; // rango 0.02 - 0.92
    fieldLines.forEach(p => p.style.opacity = fieldOpacity);

    // cambiar color del núcleo entre gris y naranja
    // gris base: rgb(158,158,158) -> naranja: rgb(255,112,67)
    const r = Math.round(158 + (255-158)*(v/100));
    const g = Math.round(158 + (112-158)*(v/100));
    const b = Math.round(158 + (67-158)*(v/100));
    core.style.fill = `rgb(${r}, ${g}, ${b})`;

    // engrosar ligeramente las bobinas y tintarlas
    const strokeW = 3 + (v/100)*3; // 3..6
    const coilColor = `rgb(${Math.round(97 + (158-97)*(v/100))}, ${Math.round(97 - (10*(v/100)))}, ${Math.round(97 - (20*(v/100)))})`;
    coils.forEach(p => {
      p.style.strokeWidth = strokeW;
      p.style.stroke = coilColor;
    });
  }

  // inicializar
  if(slider){
    slider.addEventListener('input', e => update(e.target.value));
    update(slider.value);
  }
})();
