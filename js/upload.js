// Seleccionar los checkboxes y textareas
const checkboxes = [
    { checkbox: document.getElementById('cbx-1'), textarea: document.getElementById('imp-ambiental') },
    { checkbox: document.getElementById('cbx-2'), textarea: document.getElementById('imp-social') },
    { checkbox: document.getElementById('cbx-3'), textarea: document.getElementById('imp-predial') }
];

// Agregar evento a cada checkbox
checkboxes.forEach(item => {
    item.checkbox.addEventListener('change', () => {
        // Habilitar o deshabilitar el textarea según el estado del checkbox
        item.textarea.disabled = !item.checkbox.checked;
    });
});