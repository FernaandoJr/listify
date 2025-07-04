// Test file to debug API calls
// Execute these commands in the browser console to test the API

// Test 1: Register a user
async function testRegister() {
    console.log('Testing registration...');
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            })
        });
        
        console.log('Register response status:', response.status);
        const data = await response.json();
        console.log('Register response data:', data);
        return data;
    } catch (error) {
        console.error('Register error:', error);
    }
}

// Test 2: Login
async function testLogin() {
    console.log('Testing login...');
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });
        
        console.log('Login response status:', response.status);
        const data = await response.json();
        console.log('Login response data:', data);
        return data;
    } catch (error) {
        console.error('Login error:', error);
    }
}

// Test 3: Check profile
async function testProfile() {
    console.log('Testing profile...');
    try {
        const response = await fetch('/api/profile');
        console.log('Profile response status:', response.status);
        const data = await response.json();
        console.log('Profile response data:', data);
        return data;
    } catch (error) {
        console.error('Profile error:', error);
    }
}

// Test 4: Create shopping list
async function testCreateList() {
    console.log('Testing create list...');
    try {
        const response = await fetch('/api/shopping-lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test Shopping List'
            })
        });
        
        console.log('Create list response status:', response.status);
        const data = await response.json();
        console.log('Create list response data:', data);
        return data;
    } catch (error) {
        console.error('Create list error:', error);
    }
}

// Test 5: Get shopping lists
async function testGetLists() {
    console.log('Testing get lists...');
    try {
        const response = await fetch('/api/shopping-lists');
        console.log('Get lists response status:', response.status);
        const data = await response.json();
        console.log('Get lists response data:', data);
        return data;
    } catch (error) {
        console.error('Get lists error:', error);
    }
}

// Run all tests in sequence
async function runAllTests() {
    console.log('=== Starting API Tests ===');
    
    await testRegister();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    
    await testLogin();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    
    await testProfile();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    
    await testCreateList();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
    
    await testGetLists();
    
    console.log('=== Tests completed ===');
}

console.log('Test functions loaded. You can run:');
console.log('- testRegister()');
console.log('- testLogin()');
console.log('- testProfile()');
console.log('- testCreateList()');
console.log('- testGetLists()');
console.log('- runAllTests() // runs all tests in sequence');
