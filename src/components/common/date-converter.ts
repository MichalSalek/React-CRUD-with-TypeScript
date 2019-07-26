const dateConverter = (date: string, option: 'add-time' | 'cut-time' | 'today') => {
  let neededForResult = '';
  const today = new Date();
  switch (option) {
    case 'add-time':
      neededForResult = `${date}T00:00:00+02:00`;
      break;
    case 'cut-time':
      neededForResult = date.substr(0, 10);
      break;
    case 'today':
      neededForResult = dateConverter(today.toISOString(), 'cut-time');
      break;
    default:
      console.error('Check date converter in book editor (dev).');
      return date;
  }
  return neededForResult;
};

export default dateConverter;
