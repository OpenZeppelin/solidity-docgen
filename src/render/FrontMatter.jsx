import yaml from 'js-yaml';
import _ from 'lodash';

export function FrontMatter(props) {
  const { data } = props;

  if (data === undefined) {
    return '';
  } else if (_.isEmpty(data)) {
    return [
      '---\n',
      '---\n',
    ];
  } else {
    const frontMatter = yaml.safeDump(data);

    return [
      '---\n',
      frontMatter,
      '---\n',
    ];
  }
}
