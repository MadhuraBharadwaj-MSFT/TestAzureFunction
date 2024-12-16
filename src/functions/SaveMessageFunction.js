const { app } = require('@azure/functions');

app.http('SaveMessageFunction', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (request, context) => {
    context.log("HTTP trigger function processed a request.");

    let message;
    try {
      const body = await request.json();
      message = body.message || 'No message provided';
    } catch (error) {
      context.log("Error parsing body:", error.message); 
      return {
        status: 400,
        jsonBody: { 
          error: 'Invalid input', 
          details: error.message 
        }
      };
    }

    // Ensure context.bindings exists and set outputBlob
    context.bindings = context.bindings || {};
    context.bindings.outputBlob = message;

    return { 
      status: 200, 
      jsonBody: { message: 'Message saved successfully!' } 
    };
  }
});