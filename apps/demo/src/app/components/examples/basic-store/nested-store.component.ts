import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signalTree } from '@signal-tree';

interface Address extends Record<string, unknown> {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserProfile extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

interface UserSettings extends Record<string, unknown> {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
}

interface UserData extends Record<string, unknown> {
  profile: UserProfile;
  settings: UserSettings;
  address: Address;
  preferences: {
    newsletter: boolean;
    marketing: boolean;
    updates: boolean;
  };
}

@Component({
  selector: 'app-nested-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">
        🏗️ Nested Signal Tree
      </h1>

      <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-center mb-2">
          <span class="text-green-600 mr-2">💡</span>
          <h3 class="font-semibold text-green-800">What This Demonstrates</h3>
        </div>
        <p class="text-green-700 text-sm">
          Signal Trees can automatically handle nested object structures,
          creating individual signals for each property while maintaining the
          hierarchical structure.
        </p>
      </div>

      <!-- User Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            👤 Profile Information
          </h2>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  [(ngModel)]="userTree.state.profile.firstName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label
                  for="lastName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  [(ngModel)]="userTree.state.profile.lastName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                [(ngModel)]="userTree.state.profile.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label
                for="avatar"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Avatar URL
              </label>
              <input
                id="avatar"
                [(ngModel)]="userTree.state.profile.avatar"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            ⚙️ User Settings
          </h2>

          <div class="space-y-4">
            <div>
              <label
                for="theme"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Theme
              </label>
              <select
                id="theme"
                [(ngModel)]="userTree.state.settings.theme"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label
                for="language"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Language
              </label>
              <select
                id="language"
                [(ngModel)]="userTree.state.settings.language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
              </select>
            </div>

            <div>
              <label
                for="timezone"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Timezone
              </label>
              <select
                id="timezone"
                [(ngModel)]="userTree.state.settings.timezone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                [(ngModel)]="userTree.state.settings.notifications"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                for="notifications"
                class="ml-2 block text-sm text-gray-700"
              >
                Enable notifications
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Address Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          🏠 Address Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label
              for="street"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Street Address
            </label>
            <input
              id="street"
              [(ngModel)]="userTree.state.address.street"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <label
              for="city"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="city"
              [(ngModel)]="userTree.state.address.city"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="San Francisco"
            />
          </div>

          <div>
            <label
              for="state"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <input
              id="state"
              [(ngModel)]="userTree.state.address.state"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="CA"
            />
          </div>

          <div>
            <label
              for="zipCode"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP Code
            </label>
            <input
              id="zipCode"
              [(ngModel)]="userTree.state.address.zipCode"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="94102"
            />
          </div>
        </div>
      </div>

      <!-- Preferences Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          🎯 Communication Preferences
        </h2>

        <div class="space-y-3">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              [(ngModel)]="userTree.state.preferences.newsletter"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="newsletter" class="ml-2 block text-sm text-gray-700">
              Subscribe to newsletter
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="marketing"
              [(ngModel)]="userTree.state.preferences.marketing"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="marketing" class="ml-2 block text-sm text-gray-700">
              Receive marketing communications
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="updates"
              [(ngModel)]="userTree.state.preferences.updates"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="updates" class="ml-2 block text-sm text-gray-700">
              Get product updates
            </label>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🎮 Actions</h2>

        <div class="flex space-x-4">
          <button
            (click)="updateProfile()"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Update Profile
          </button>

          <button
            (click)="resetToDefaults()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset to Defaults
          </button>

          <button
            (click)="loadSampleData()"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Load Sample Data
          </button>

          <button
            (click)="toggleTheme()"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Toggle Theme
          </button>
        </div>
      </div>

      <!-- Live State Display -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Nested Access Examples -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            🔍 Nested Signal Access
          </h2>

          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Profile Signals</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>First Name:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.profile.firstName()
                  }}</code>
                </div>
                <div>
                  <strong>Last Name:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.profile.lastName()
                  }}</code>
                </div>
                <div>
                  <strong>Email:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.profile.email()
                  }}</code>
                </div>
                <div>
                  <strong>Full Name:</strong>
                  <code class="bg-blue-100 px-2 py-1 rounded">{{
                    getFullName()
                  }}</code>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Settings Signals</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>Theme:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.settings.theme()
                  }}</code>
                </div>
                <div>
                  <strong>Notifications:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.settings.notifications()
                  }}</code>
                </div>
                <div>
                  <strong>Language:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.settings.language()
                  }}</code>
                </div>
                <div>
                  <strong>Timezone:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.settings.timezone()
                  }}</code>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Address Signals</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>Street:</strong>
                  <code class="bg-green-100 px-2 py-1 rounded">{{
                    userTree.state.address.street()
                  }}</code>
                </div>
                <div>
                  <strong>City, State:</strong>
                  <code class="bg-blue-100 px-2 py-1 rounded">{{
                    getCityState()
                  }}</code>
                </div>
                <div>
                  <strong>Full Address:</strong>
                  <code class="bg-blue-100 px-2 py-1 rounded">{{
                    getFullAddress()
                  }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Complete Tree State -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            📊 Complete Tree State
          </h2>

          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Unwrapped Tree</h3>
              <pre
                class="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto"
                >{{ userTree.unwrap() | json }}</pre
              >
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Tree Statistics</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>Total Properties:</strong> {{ getTotalProperties() }}
                </div>
                <div>
                  <strong>Nested Levels:</strong> 3 (profile, settings, address,
                  preferences)
                </div>
                <div>
                  <strong>Boolean Values:</strong> {{ getBooleanCount() }}
                </div>
                <div>
                  <strong>String Values:</strong> {{ getStringCount() }}
                </div>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-medium text-gray-800 mb-2">Update Methods</h3>
              <div class="space-y-1 text-sm text-gray-600">
                <div>
                  <code>userTree.state.profile.firstName.set('John')</code>
                </div>
                <div><code>userTree.state.settings.update(...)</code></div>
                <div><code>userTree.update(...)</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          💻 Code Example
        </h2>

        <div class="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto">
          <pre><code>{{ codeExample }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      code {
        font-family: 'Courier New', monospace;
      }
    `,
  ],
})
export class NestedTreeComponent {
  userTree = signalTree<UserData>({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
    settings: {
      theme: 'light',
      notifications: true,
      language: 'en',
      timezone: 'America/New_York',
    },
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
    },
    preferences: {
      newsletter: true,
      marketing: false,
      updates: true,
    },
  });

  updateProfile() {
    // Example of updating nested properties using the tree's update method
    this.userTree.update((current) => ({
      ...current,
      profile: {
        ...current.profile,
        firstName: current.profile.firstName.toUpperCase(),
        lastName: current.profile.lastName.toUpperCase(),
      },
    }));
  }

  resetToDefaults() {
    this.userTree.update(() => ({
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      },
      settings: {
        theme: 'light',
        notifications: true,
        language: 'en',
        timezone: 'UTC',
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      preferences: {
        newsletter: false,
        marketing: false,
        updates: false,
      },
    }));
  }

  loadSampleData() {
    this.userTree.update(() => ({
      profile: {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@company.com',
        avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
      },
      settings: {
        theme: 'dark',
        notifications: false,
        language: 'es',
        timezone: 'America/Los_Angeles',
      },
      address: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
      },
      preferences: {
        newsletter: true,
        marketing: true,
        updates: false,
      },
    }));
  }

  toggleTheme() {
    const currentTheme = this.userTree.state.settings.theme();
    this.userTree.state.settings.theme.set(
      currentTheme === 'light' ? 'dark' : 'light'
    );
  }

  getFullName(): string {
    const firstName = this.userTree.state.profile.firstName();
    const lastName = this.userTree.state.profile.lastName();
    return `${firstName} ${lastName}`.trim();
  }

  getCityState(): string {
    const city = this.userTree.state.address.city();
    const state = this.userTree.state.address.state();
    return `${city}, ${state}`.replace(', ,', '').replace(',  ', ', ').trim();
  }

  getFullAddress(): string {
    const street = this.userTree.state.address.street();
    const cityState = this.getCityState();
    const zipCode = this.userTree.state.address.zipCode();

    const parts = [street, cityState, zipCode].filter((part) => part.trim());
    return parts.join(', ');
  }

  getTotalProperties(): number {
    const data = this.userTree.unwrap();

    function countProperties(obj: unknown): number {
      if (obj && typeof obj === 'object') {
        let localCount = 0;
        for (const value of Object.values(obj)) {
          if (value && typeof value === 'object') {
            localCount += countProperties(value);
          } else {
            localCount += 1;
          }
        }
        return localCount;
      }
      return 1;
    }

    return countProperties(data);
  }

  getBooleanCount(): number {
    const data = this.userTree.unwrap();

    function countBooleans(obj: unknown): number {
      if (obj && typeof obj === 'object') {
        let localCount = 0;
        for (const value of Object.values(obj)) {
          if (typeof value === 'boolean') {
            localCount += 1;
          } else if (value && typeof value === 'object') {
            localCount += countBooleans(value);
          }
        }
        return localCount;
      }
      return 0;
    }

    return countBooleans(data);
  }

  getStringCount(): number {
    const data = this.userTree.unwrap();

    function countStrings(obj: unknown): number {
      if (obj && typeof obj === 'object') {
        let localCount = 0;
        for (const value of Object.values(obj)) {
          if (typeof value === 'string') {
            localCount += 1;
          } else if (value && typeof value === 'object') {
            localCount += countStrings(value);
          }
        }
        return localCount;
      }
      return 0;
    }

    return countStrings(data);
  }

  codeExample = `// Create a nested signal tree
const userTree = signalTree<UserData>({
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://...'
  },
  settings: {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'America/New_York'
  },
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102'
  }
});

// Access nested signals directly
console.log(userTree.state.profile.firstName()); // 'John'
console.log(userTree.state.settings.theme());    // 'light'
console.log(userTree.state.address.city());      // 'San Francisco'

// Update individual nested properties
userTree.state.profile.firstName.set('Jane');
userTree.state.settings.theme.set('dark');

// Update entire nested objects
userTree.state.address.update(addr => ({
  ...addr,
  city: 'Los Angeles',
  state: 'CA'
}));

// Update multiple nested properties
userTree.update(state => ({
  ...state,
  profile: {
    ...state.profile,
    firstName: 'Alice'
  },
  settings: {
    ...state.settings,
    theme: 'dark'
  }
}));`;
}
