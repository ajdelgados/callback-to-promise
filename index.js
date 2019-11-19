async function execute () {
  const request = require('request');
  
  const options = {
    method: 'GET',
    url: 'https://aws.random.cat/meow'
  };
  
  request(options, (error, response, body) => {
    if(error) console.log("Error form callback", error);
    else console.log("Data from callback", body);
  });
  console.log("Done!");
  
  const getData = () => {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if(error) reject(error);
        else resolve(body);
      });
    });
  };
  
  const data = await getData();
  console.log("Data from function async/await", data);
  console.log("Finished!")
}

execute();
