// JOSHUA & OKIKI -> URL QUERY BODY METHOD

const fetchBlockchain = fetch('https://blockchain.com');

const searchForCustomer = fetchBlockchain({ token: 'static' })

const findCustomer = (body) => searchForCustomer(body);

// KELVIN -> METHOD URL BODY QUERY
const get = fetch('GET');
const post = fetch('POST');
const getBlockchain = get('https://blockchain.com');
const postBlockchain = get('https://blockchain.com')

const login = (body) => get('https://blockchain.com/login')(body);

login(new FormData(), { retry: true });
// GET https://blockchain.com?retry=true -> BODY

getBlockchain(null, { q: 'Hello' });
postBlockchain(new FormData(), { token: 'static' });
putBlockchain(new FormData(), { type: 'account' })
getBlockchain(null, { verified: 'true' });
getBlockchain(null, { verified: 'false' });