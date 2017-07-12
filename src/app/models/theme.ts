import { parsePropertiesInto } from '../utils/models';

const COLORS = {
  bird: '#3f95e9',
  butterfly: '#ff8e31',
  flower: '#ed5567',
  tree: '#35c05b'
};

export class Theme {
  static color(theme: string | Theme): string {
    return COLORS[theme instanceof Theme ? theme.name : theme];
  }

  name: string;
  description: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'name', 'description');
  }
}
