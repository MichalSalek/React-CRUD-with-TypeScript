const dateConverter = (date: string, option: string) => {
  let neededForResult = '';
  switch (option) {
    case 'add-time':
      neededForResult = `${date}T00:00:00+02:00`;
      break;
    case 'cut-time':
      neededForResult = date.substr(0, 10);
      break;
    default:
      console.error('Check date converter in book editor (dev).');
      return date;
  }
  return neededForResult;
};

export default dateConverter;
