//number writing
//Get the name of value less than 1000
const getcountIntext = (count) => {
  let valname = '';

  if (count >= 100) {
    const number = parseInt(count / 100);

    switch (number) {
      case 1:
        valname = 'مائة';
        break;
      case 2:
        valname = 'مائتان';
        break;
      case 3:
        valname = 'ثلاثمائة';
        break;
      case 4:
        valname = 'أربعمائة';
        break;
      case 5:
        valname = 'خمسمائة';
        break;
      case 6:
        valname = 'ستمائة';
        break;
      case 7:
        valname = 'سبعمائة';
        break;
      case 8:
        valname = 'ثمانمائة';
        break;
      case 9:
        valname = 'تسعمائة';
        break;
      default:
        return;
    }
    count = count % 100;
  }

  let singcount = count;
  let singname = '';

  if (singcount > 10) {
    singcount = singcount % 10;
  }

  if (singcount > 0) {
    switch (singcount) {
      case 1:
        singname = 'واحد';
        break;
      case 2:
        singname = 'اثنان';
        break;
      case 3:
        singname = 'ثلاثة';
        break;
      case 4:
        singname = 'أربعة';
        break;
      case 5:
        singname = 'خمسة';
        break;
      case 6:
        singname = 'ستة';
        break;
      case 7:
        singname = 'سبعة';
        break;
      case 8:
        singname = 'ثمانية';
        break;
      case 9:
        singname = 'تسعة';
        break;
      default:
        return;
    }
  }

  if (count >= 10) {
    if (valname.length > 0) valname += ' و';

    if (count % 10 !== 0) {
      if (count >= 20) valname += singname + ' و';
      else if (count > 10) {
        if (singcount === 1) valname += 'احدى ';
        else if (singcount === 2) valname += 'اثنى ';
        else valname += singname + ' ';
      }
    }

    switch (parseInt(count / 10)) {
      case 1:
        if (count === 10) valname += 'عشرة';
        else valname += 'عشر';
        break;
      case 2:
        valname += 'عشرون';
        break;
      case 3:
        valname += 'ثلاثون';
        break;
      case 4:
        valname += 'أربعون';
        break;
      case 5:
        valname += 'خمسون';
        break;
      case 6:
        valname += 'ستون';
        break;
      case 7:
        valname += 'سبعون';
        break;
      case 8:
        valname += 'ثمانون';
        break;
      case 9:
        valname += 'تسعون';
        break;
      default:
        return;
    }
  } else if (count > 0) {
    if (valname.length > 0) valname += ' و';

    valname += singname;
  }

  return valname;
};

//Get value initial number in text
const getvalueintextBybase = (value, basev) => {
  let valname = '';
  let dblvalname = '';
  let count = parseInt(value / basev);

  switch (basev) {
    case 1000000000000000:
      valname = 'كوادريليون';
      dblvalname = 'كوادريليونان';
      break;
    case 1000000000000:
      valname = 'تريليون';
      dblvalname = 'تريليونان';
      break;
    case 1000000000:
      valname = 'مليار';
      dblvalname = 'ملياران';
      break;
    case 1000000:
      valname = 'مليون';
      dblvalname = 'مليونان';
      break;
    case 1000:
      valname = 'ألف';
      dblvalname = 'الفان';
      break;
    default:
      return;
  }

  if (count === 1) return valname;
  else if (count === 2) return dblvalname;
  else return getcountIntext(count) + ' ' + valname;
};

//Main function
const getvalueintext = (value) => {
  let base_value = 1000000000000;
  let valuename = '';

  while (base_value > 100) {
    if (+value >= base_value) {
      if (valuename) valuename += ' و';

      valuename += getvalueintextBybase(value, base_value);

      value = value % base_value;
    }

    base_value /= 1000;
  }

  if (+value > 0) {
    if (valuename) valuename += ' و';

    valuename += getcountIntext(+value);
  }

  return valuename;
};

export default getvalueintext;
