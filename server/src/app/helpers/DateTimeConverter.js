import { DataTypes } from "sequelize";

const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;

class DateTimeConverter {
  constructor() {
    throw new Error('DateTimeConverter não deve ser instanciado!');
  }

  static convert(obj) {
    obj.hora = obj.hora+':00';
    const partDate = pattern.exec(obj.data);
    obj.data = `${partDate[3]}-${partDate[2]}-${partDate[1]}`;

    return obj;
  }
}

export default DateTimeConverter;