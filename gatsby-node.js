const axios = require('axios');
const crypto = require('crypto');

exports.modifyBabelrc = ({ babelrc }) => {
  if (process.env.NODE_ENV !== `production`) {
    return {
      plugins: [
        [require.resolve(`babel-plugin-emotion`), { sourceMap: true }],
      ].concat(babelrc.plugins),
    };
  }
  return {
    plugins: [require.resolve(`babel-plugin-emotion`)].concat(babelrc.plugins),
  };
};

// POC API call to SWAPI
exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;

  // fetch raw data from the randomuser api
  const fetchRandomUser = () => axios.get(`https://swapi.co/api/people`);
  // await for results
  const res = await fetchRandomUser();

  // map into these results and create nodes
  res.data.results.map((user, i) => {
    // Create your node object
    const userNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `RandomUser`, // name of the graphQL query --> allRandomUser {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      name: user.name,
      height: user.height,
      mass: user.mass,
      hair_color: user.hair_color,
      skin_color: user.skin_color,
      eye_color: user.eye_color,
      birth_year: user.birth_year,
      gender: user.gender,
      homeworld: user.homeworld,
      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`);
    // add it to userNode
    userNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(userNode);
  });

  return;
}
