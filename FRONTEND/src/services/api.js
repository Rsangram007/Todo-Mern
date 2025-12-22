const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";


class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Get token from localStorage
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in requests
      ...options,
    };

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (options.body && typeof options.body === "object") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.msg || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return await this.request("/auth/register", {
      method: "POST",
      body: userData,
    });
  }

  async login(credentials) {
    return await this.request("/auth/login", {
      method: "POST",
      body: credentials,
    });
  }

  async logout() {
    // No API call needed for logout since we handle it client-side
    // The actual logout is handled in AuthContext
    return Promise.resolve({ success: true });
  }

  // Task endpoints
  async getTasks() {
    return await this.request("/tasks");
  }

  async getTask(id) {
    return await this.request(`/tasks/${id}`);
  }

  async createTask(taskData) {
    return await this.request("/tasks", {
      method: "POST",
      body: taskData,
    });
  }

  async updateTask(id, taskData) {
    return await this.request(`/tasks/${id}`, {
      method: "PATCH",
      body: taskData,
    });
  }

  async deleteTask(id) {
    return await this.request(`/tasks/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient();
