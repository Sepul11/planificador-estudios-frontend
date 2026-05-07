import SubtareaItem from "./SubtareaItem";

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