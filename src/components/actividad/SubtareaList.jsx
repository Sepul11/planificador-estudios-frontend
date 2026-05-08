import SubtareaItem from "./SubtareaItem.jsx";

export default function SubtareaList({
  subtareas,
  eliminarSubtarea,
}) {
  return (
    <>
      {subtareas.map((sub) => (
        <SubtareaItem
          key={sub.id}
          subtarea={sub}
          eliminarSubtarea={eliminarSubtarea}
        />
      ))}
    </>
  );
}