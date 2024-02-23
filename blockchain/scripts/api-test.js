const proposalId = 1;
const URL = `https://backend-mac.vercel.app/clicks/count/${proposalId}`;

let response = await Functions.makeHttpRequest({ url: URL });

if (response.error) {
  const returnedErr = response.response.data;
  let apiErr = new Error(
    `API returned one or more errors: ${JSON.stringify(returnedErr)}`
  );
  apiErr.returnedErr = returnedErr;
  throw apiErr;
}

// Convert JSON object to a string using JSON.stringify()
// Then encode it to a a bytes using the helper Functions.encodeString
//return Functions.encodeString(JSON.stringify(result));
// ABI encoding
const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
  ["uint256", "uint256"],
  [Number(response.data.clicks), Number(response.data.proposalId)]
);

// return the encoded data as Uint8Array
return ethers.getBytes(encoded);
