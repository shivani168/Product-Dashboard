Features Overview
1. Product List View
Displays a list of products fetched from an API.
Each product card includes basic details like name, price, category, and an image.
Supports infinite scrolling to dynamically load more products as you scroll.
2. Filtering and Sorting
Filters:
By category: Narrow down the product list based on categories.
By price range: Set minimum and maximum prices to filter products.
By rating: Select products based on their ratings.
Sorting:
Fresh Arrivals
Price Low to High
Price High to Low
Seamless integration: Filters and sorting options work together without refreshing the page.
3. Product Details Modal
Click on any product to view more details in a popup modal.
The modal dynamically loads additional information for better performance.
4. Responsive Design
Adapts seamlessly to both desktop and mobile views.
5. Optimized Performance
Used modular, reusable components for maintainable code.
Images and components are lazy-loaded to reduce load time.
Optimized to minimize re-renders and unnecessary API calls.
6. Error Handling and Loading States
Displays user-friendly error messages if API calls fail.




How to Run the Application
1. Clone the Repository
bash
Copy code
git clone <repository-url>
cd <project-folder>
2. Install Dependencies
bash
Copy code
npm install
3. Start the Development Server
bash
Copy code
npm start
The app will run locally at http://localhost:3000.




Project Structure
The project is organized into various directories to ensure a clean, modular, and maintainable structure. Here's a detailed breakdown of each directory and its purpose:

ecommerce-dashboard/
The root directory of the project.

src/
The main directory for all source code files.

components/
Contains reusable UI components. This directory is divided into two subdirectories:

containers/:
These components handle logic and state management. They act as the connection between the application's business logic and the UI.

ProductListContainer.tsx: Handles logic for fetching and managing the list of products.


presenters/:
These are purely UI components responsible for rendering the visual elements of the application. They are stateless and reusable.

ProductList.tsx: Displays the list of products in a grid or list view.
ProductCard.tsx: Represents individual product items with basic details like name, price, and image.
ProductDetailsModal.tsx: Displays detailed information about a single product in a modal popup.


context/
This directory contains files related to the Context API, which is used for managing global states like product filtering, user authentication, and UI themes.

ProductContext.tsx: Manages the state and logic for product-related features such as filtering, sorting, and infinite scrolling.


hooks/
Custom React hooks used throughout the application for reusable logic.
useFetchProducts.ts: Manages API calls to fetch all product data, along with loading and error states.
useFetchProductById.ts: Manages API calls to fetch product data by id, along with loading and error states.
useFetchProductsWithSort.ts: Manages API calls to fetch product data by asc or desc sorting, along with loading and error states

pages/
This directory contains full-page components. Each file represents a single page in the application.
Dashboard.tsx: The main page displaying the product list and all associated functionality, such as filtering, sorting, and modals.


styles/
Contains all global and component-specific styles.
ProductListContainer.css: Defines the application's ProductListContainer CSS styles, such as typography, layout, and responsive design rules.


utils/
This directory holds utility functions and constants used across the application.
api.ts: Handles API configurations and requests for fetching product data.
constants.ts: Stores static values like category names, rating options, and API URLs.
types.ts: Contains interface type for product


App.tsx
The root component of the application. It defines the layout and renders the main content, including global providers like context.

index.tsx
The entry point of the application. It renders the App component into the DOM and initializes React.




Key Technologies Used
React.js for building the user interface.
CSS/SCSS for styling and responsiveness.
fetch for API calls.
React Hooks for state and lifecycle management.


Best Practices Followed
Code Structure: Organized and modular for maintainability.
Design Patterns: Container-Presenter pattern for separation of logic and UI.
Performance: Lazy loading, optimized re-renders, and efficient API usage.

