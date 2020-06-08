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

const contentVis = fs.readFileSync('./data/visualisation.yml', 'utf8');
const vis = YAML.parse(contentVis);

const contentMail = fs.readFileSync('./data/mail.yml', 'utf8');
const mail = YAML.parse(contentMail);

const jsonFileSanitized = sanitizeHtml(JSON.stringify(form));
const jsonFileVisSanitized = sanitizeHtml(JSON.stringify(vis));
const jsonFileMailSanitized = sanitizeHtml(JSON.stringify(mail));

fs.writeFileSync('./src/data/form.json', jsonFileSanitized, 'utf8');
fs.writeFileSync('./src/data/visualisation.json', jsonFileVisSanitized, 'utf8');
fs.writeFileSync('./src/data/mail.json', jsonFileMailSanitized, 'utf8');
