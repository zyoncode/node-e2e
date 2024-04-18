const languages = [
  { 'title': 'Auto', 'value': 'system' },
  { 'title': 'English', 'value': 'en-US' },
  { 'title': '简体中文', 'value': 'zh-CN' },
  { 'title': '繁體中文', 'value': 'zh-HK' },
  { 'title': '日本語', 'value': 'ja-JP' },
  { 'title': '한국어', 'value': 'ko-KR' },
  { 'title': 'বাংলা', 'value': 'bn' },
  { 'title': 'Deutsch', 'value': 'de' },
  { 'title': 'Español', 'value': 'es' },
  { 'title': 'Filipino', 'value': 'fil' },
  { 'title': 'Français', 'value': 'fr-FR' },
  { 'title': 'हिन्दी', 'value': 'hi-IN' },
  { 'title': 'Italiano', 'value': 'it-IT' },
  { 'title': 'Монгол хэл', 'value': 'mn-MN' },
  { 'title': 'Português', 'value': 'pt' },
  { 'title': 'Русский', 'value': 'ru' },
  { 'title': 'ไทย', 'value': 'th-TH' },
  { 'title': 'Українська', 'value': 'uk-UA' },
  { 'title': 'Tiếng Việt', 'value': 'vi' },
  { 'title': 'Bahasa Indonesia', 'value': 'id' },
];

export const languagesKV = languages.reduce((acc, curr) => {
  return {
    ...acc,
    [curr.value]: curr,
  };
}, {});
export default languages;
