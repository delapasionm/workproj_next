var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {

    let date = new Date();
    console.log("event.request.userAttributes", event.request)
    if (event.request.userAttributes.sub) {
        let params = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'email': {S: event.request.userAttributes.email},
                'username': {S: event.request.userAttributes['custom:username']},
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()}
            },
            TableName: process.env.USERTABLE
        }
        try {
            await ddb.putItem(params).promise()
            console.log("Success")
        } catch (err) {
            console.log("Error", err)
        }
        context.done(null, event)
    } else {
        console.log("Error: Nothing was written to DynamoDB")
        context.done(null, event)
    }
}