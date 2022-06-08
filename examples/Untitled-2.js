
const multiplyBy = (a, b) => a + b;

const multiplyBy12 = multiplyBy(12)
multiplyBy12(8)
multiplyBy12(9)
multiplyBy12(10)
multiplyBy12(222)
multiplyBy12(900)







// Vali -> URL METHOD QUERY BODY
const fetchBlockchain = fetch('https://blockchain.com');
const requestLogin = fetch('https://blockchain.com/login');
const BlockchainGet = fetchBlockchain('GET');
const BlockchainPost = fetchBlockchain("POST");
const requestLoginPost = requestLogin('POST');

const requestWithToken = requestLoginPost({ token: 'static' });

const login = (body) => requestWithToken(body); 
const searchForCustomer = (searchStr) => BlockchainGet({ q: searchStr })
// https://blockchain.com/?q=Hello
// https://blockchain.com/login?q=Hello

BlockchainGet({}, new FormData({}));
fetchBlockchainPost({}, new FormData({}));
fetchBlockchain('PUT', {}, new FormData({}));
BlockchainGet({}, new FormData({}));
BlockchainGet({}, new FormData({}));

searchForCustomer('Hello')

