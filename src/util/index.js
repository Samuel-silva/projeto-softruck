function dateFormat(date, options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric" }) {
  if (new Date(date).valueOf()) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('pt-BR', options);
  }
  return '';
}

export { dateFormat }
