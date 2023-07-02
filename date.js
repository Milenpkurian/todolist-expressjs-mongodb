export function getDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

export function getDay() {
  const date = new Date();
  const options = {
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}
