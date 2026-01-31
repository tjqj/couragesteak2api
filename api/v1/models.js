export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Handle Authentication
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || authHeader !== 'Bearer sh-123456') {
    return new Response(JSON.stringify({ error: { message: "Invalid API Key", type: "invalid_request_error", param: null, code: "invalid_api_key" } }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const response = {
    object: "list",
    data: [
      {
        id: "qwen-chat",
        object: "model",
        created: 1677610602,
        owned_by: "openai",
        permission: [
            {
                id: "modelperm-123",
                object: "model_permission",
                created: 1677610602,
                allow_create_engine: false,
                allow_sampling: true,
                allow_logprobs: true,
                allow_search_indices: false,
                allow_view: true,
                allow_fine_tuning: false,
                organization: "*",
                group: null,
                is_blocking: false
            }
        ],
        root: "qwen-chat",
        parent: null
      }
    ]
  };

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
