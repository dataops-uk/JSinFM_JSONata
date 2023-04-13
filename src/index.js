import jsonata from 'jsonata';



window.callJSONata = function (json) {
  const obj = JSON.parse(json);
  const data = obj.data;
  const query = obj.query;

  evaluateJSONata(data, query)
    .then(result => passBackResult(result))
    .catch(error => console.error(error));
};




function evaluateJSONata(data, query) {
  return new Promise((resolve, reject) => {
    try {
      const result = jsonata(query).evaluate(data);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}


function passBackResult(result) {
  FileMaker.PerformScript ( "set Result" , JSON.stringify(result)) ;
}