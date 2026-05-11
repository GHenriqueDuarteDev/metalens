export default function dateFormated(date: string) {
  const result = new Date(date);
  return result.toLocaleString("en-Us");
}
