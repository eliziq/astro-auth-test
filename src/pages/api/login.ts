// This tells Astro to not prerender this route
export const prerender = false;

import type { APIRoute } from 'astro';

// Demo credentials (must match config.ts)
const DEMO_CREDENTIALS = {
  username: 'kminchelle',
  password: '0lelplR'
};

export const POST: APIRoute = async ({ request }) => {
  // Log request details for debugging
  console.log('=== Login Request ===');
  console.log('Method:', request.method);
  console.log('URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    // Get the request body
    const requestBody = await request.text();
    console.log('Raw request body:', requestBody);
    
    if (!requestBody) {
      console.error('Error: Empty request body');
      return new Response(
        JSON.stringify({ success: false, message: 'Request body is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse JSON data from the request
    const data = JSON.parse(requestBody);
    console.log('Parsed request data:', JSON.stringify(data, null, 2));
    
    if (!data.username || !data.password) {
      console.error('Error: Missing username or password');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Username and password are required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const username = data.username || '';
    const password = data.password || '';
    const redirectTo = data.redirectTo || '/';

    // Validate credentials
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      // In a real app, you would create a session or JWT token here
      
      // Set a cookie or session
      const headers = new Headers();
      
      // Return a JSON response with redirect info
      return new Response(
        JSON.stringify({
          success: true,
          redirectTo: redirectTo,
          user: {
            id: 1,
            email: DEMO_CREDENTIALS.username,
            name: 'Demo User',
            firstName: 'Demo',
            lastName: 'User',
            username: DEMO_CREDENTIALS.username,
            image: 'https://via.placeholder.com/100'
          },
          auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTYyNjYwMzE3Mn0.1234567890abcdef'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `user=${encodeURIComponent(JSON.stringify({
              id: 1,
              email: DEMO_CREDENTIALS.username,
              name: 'Demo User',
              firstName: 'Demo',
              lastName: 'User',
              username: DEMO_CREDENTIALS.username,
              image: 'https://via.placeholder.com/100'
            }))}; Path=/; HttpOnly; SameSite=Strict`
          }
        }
      );
    }

    // Invalid credentials
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid username or password'
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred during login'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
