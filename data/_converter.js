const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const YAML = require('yaml');

const contentYaml = fs.readFileSync('./data/_inhaltsverzeichnis.yml', 'utf8');
const content = YAML.parse(contentYaml);

const form = {};

for (const section of content) {
  const sectionYaml = fs.readFileSync(`./data/${section}.yml`, 'utf8');
  form[section] = YAML.parse(sectionYaml);
}

const jsonFileSanitized = sanitizeHtml(JSON.stringify(form));

fs.writeFileSync('./src/data/form.json', jsonFileSanitized, 'utf8');
