export function formatFecha(fechaStr) {
  if (!fechaStr) return "";

  const [year, month, day] = fechaStr.split("-");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

export function formatHoras(horas) {
  if (!horas) return "0 horas";
  if (horas === 1) return "1 hora";
  return `${horas} horas`;
}