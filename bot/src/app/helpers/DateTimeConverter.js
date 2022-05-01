const pattern = /(\d{4})-(\d{2})-(\d{2})/;

class DateTimeConverter {
  constructor() {
    throw new Error('DateTimeConverter não deve ser instanciado!');
  }

  static convert(string) {
    const partDate = pattern.exec(string);
    return `${partDate[3]}/${partDate[2]}/${partDate[1]}`;
  }
}

export default DateTimeConverter;