const fs = require('fs');
const YAML = require('yaml');

const contentYaml = fs.readFileSync('./data/_inhaltsverzeichnis.yml', 'utf8');
const content = YAML.parse(contentYaml);

const form = {};

for (const section of content) {
  const sectionYaml = fs.readFileSync(`./data/${section}.yml`, 'utf8');
  form[section] = YAML.parse(sectionYaml);
}

fs.writeFileSync('./src/data/form.json', JSON.stringify(form), 'utf8');
