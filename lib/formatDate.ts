export default function formatDate(date: string, local: string) {
  const d = new Date(date);
  return d.toLocaleDateString(local, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
