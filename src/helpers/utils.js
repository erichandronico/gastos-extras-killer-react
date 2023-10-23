import {camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase, upperFirst} from 'lodash';


export const trans =  (txt='') => txt


export default class StringUtility {
  
    static toCamelCase(str) {
      return camelCase(str);
    }
  
    static toTitleCase(str) {
      return startCase(camelCase(str));
    }
  
    static toPascalCase(str) {
      return startCase(camelCase(str)).replace(/ /g, '');
    }
  
    static toConstantCase(str) {
      return upperCase(str).replace(/ /g, '_');
    }
  
    static toDotCase(str) {
      return lowerCase(str).replace(/ /g, '.');
    }
  
    static toKebabCase(str) {
      return kebabCase(str);
    }
  
    static toLowerCase(str) {
      return lowerCase(str).replace(/ /g, '');
    }
  
    static toPathCase(str) {
      return lowerCase(str).replace(/ /g, '/');
    }
  
    static toSnakeCase(str) {
      return snakeCase(str);
    }
  
    static toSentenceCase(str) {
      return upperFirst(lowerCase(str));
    }
    
  }