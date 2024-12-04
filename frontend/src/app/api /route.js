import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/tasks`);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}