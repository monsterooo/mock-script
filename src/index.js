const functTemlate = (function(){
  const template = {
    bool: function() {
      return !!Math.floor(2 * Math.random())
    },
    number: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    repeat: function(min, max) {
      if (min && !max) {
        return min
      } else {
        return parseInt(this.number(min, max), 10);
      }
    }
  };
  return {
    excute: (func, index) => {
      let result;
      template.currentIndex = index || 0;
      try {
        result = new Function(`with (this) { return ${func} }`).call(template)
      } catch (e) {
        result = e.toString();
      }
      return result;
    },
    template: template,
  }
})();

class Mock {
  constructor(json) {
    this.json = this.parseJSON(json);
  };
  get() {
    return this.generate(this.json);
  }
  generate(data, index, source) {
    switch(this.type(data)) {
      case 'array':
        return this.arrayProcess(data);
      case 'string':
        return this.stringProcess(data, index);
      case 'object':
        return this.objectProcess(data, index);
      case 'function':
        return this.functionProcess(data, index, source);
      default:
        return data;
    }
  }
  functionProcess(func, index, source) {
    return func.call(source, functTemlate.template, index);
  }
  objectProcess(data, index) {
    let cloneData = this.deepClone(data);
    let key;
    for(key in cloneData) {
      if(cloneData.hasOwnProperty(key)) {
        cloneData[key] = this.generate(cloneData[key], index, cloneData);
      }
    }
    return cloneData;
  }
  stringProcess(data, index) {
    return data.replace(/\{\{([^}]+)\}\}/g, function(pattern, match) {
      return functTemlate.excute(match, index);
    });
  }
  arrayProcess(data) {
    const first = data[0];
    
    if (this.type(first) === 'string' && first.includes('repeat')) {
      const second = data[1];
      const repeat = this.stringProcess(first);
      data = this.repeatProcess(second, repeat);
    } else {
      data.forEach((currentData, index) => {
        data[index] = this.generate(currentData, index);
      });
    }
    return data;
  }
  repeatProcess(data, repeat) {
    const result = [];
    let i = 0;
    for(; i < repeat; i++) {
      result.push(this.generate(data, i));
    }
    return result;
  }
  deepClone(object) {
    if (typeof object !== 'object') {
      return object;
    }
    let key;
    let val;
    let clone = typeof object.pop !== 'function' ? {} : [];
    for(key in object) {
      val = object[key]
      if (object.hasOwnProperty(key)) {
        if (typeof val === 'object') {
          clone[key] = this.deepClone(object[key])
        } else {
          clone[key] = val;
        }
      }
    }
    return clone;
  }
  type(value) {
    const match = Object.prototype.toString.call(value).match(/\s([a-zA-Z]+)/)
    if (match) {
      return match[1].toLowerCase();
    }
    return;
  }
  parseJSON(json) {
    return eval(`(${json})`);
  }
}
export default Mock;