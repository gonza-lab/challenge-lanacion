import axios from 'axios';

const EXTERNAL_API = 'https://api.example.com/articles';

export const fetchArticles = async () => {
  const response = await axios.get(EXTERNAL_API);
  return response.data.filter((article: {subtype: string}) => article.subtype === '7');
};
