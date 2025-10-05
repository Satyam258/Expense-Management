
const API_BASE_URL = 'http://your-backend-url/api/admin'; // adjust as needed

export async function fetchDashboardData(token) {
  const res = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return res.json();
}

export async function fetchUsers(token) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export async function updateUser(token, userId, data) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update user');
  }
  return res.json();
}

// Add more API calls for approval flows, etc.
