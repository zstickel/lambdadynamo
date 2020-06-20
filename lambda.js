var AWS = require("aws-sdk");


// Initialising the DynamoDB SDK
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const day=new Date();
  var daystring=day.toString();
  var timestamp=day.getTime();
 
 //replace with node UUID to scale
  var id =Math.floor(timestamp/1000);
 //  const hazards=event;

 const hazards = JSON.parse(event.body);
 
  var hazlength =hazards.length;

    var params = {
      TableName: "flights", // The name of your DynamoDB table
        Item: { // Creating an Item with a unique id and with the passed title
          flightid: id,
          name: hazards[0].name,
          descrip: hazards[0].descrip,
          probability: hazards[0].probability,
          time: hazards[0].time,
          cost: hazards[0].cost,
          quality: hazards[0].quality,
          date: daystring
        }
    };
  
    var i;
    for(i=0; i<hazlength;i++){
     
      params.Item.flightid=id;
      params.Item.name=hazards[i].name;
      params.Item.probability=hazards[i].probability;
      params.Item.time=hazards[i].time;
      params.Item.quality=hazards[i].quality;
      params.Item.descrip=hazards[i].descrip;
      params.Item.cost=hazards[i].cost;
      try {
      // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
        var data = await documentClient.put(params).promise();
        var response = {
      // headers: {'Access-Control-Allow-Origin':'http://zanecloudarchitect.com'},
          statusCode: 200
        };
         // Returning a 200 if the item has been inserted 
      } catch (e) {
          response = {
            statusCode: 500,
            body: JSON.stringify(e)
          };
      }
      id++;
    }
    return response;
};