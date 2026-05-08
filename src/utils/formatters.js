export function formatFecha(fechaStr, conSemana = false) {
  if (!fechaStr) return "";
  
  const date = new Date(fechaStr + "T12:00:00");

  const opciones = conSemana
    ? { weekday: "short", day: "numeric", month: "short" }
    : { day: "numeric", month: "short" };

  const texto = date.toLocaleDateString("es-CO", opciones);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatHoras(horas) {
  if (!horas) return "0 horas";
  if (horas === 1) return "1 hora";
  return `${horas} horas`;
}