import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY_API = '25284059-64aa950e28f1ef43b7bf646a1';

const optionsQuery = {
  params: {
    key: `${KEY_API}`,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    page: 1,
    per_page: 12,
  },
};

export async function GetDataFromAPI(searchQuery, page) {
  optionsQuery.params.q = searchQuery;
  optionsQuery.params.page = page;
  const response = await axios.get('', optionsQuery);
  return response.data;
}
