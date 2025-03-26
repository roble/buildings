# Buildings

A web application for managing building metrics, including room and meter data, with real-time search capabilities, user-friendly UI/UX, and mock API integration.

## Task Requirements

The task involves creating a feature that allows users to download a time series, with the following specifications:

1. **Data Associations**:

   - **Electricity Meters**: Provide energy consumption and cost data.
   - **Rooms**: Provide temperature and humidity data.
   - Both are associated with buildings, and a building can have multiple meters and rooms.

2. **Features**:

   - Allow users to select a time series.
   - Include a date range picker.
   - Enable users to choose the file format for download: CSV or JSON.
   - Provide appropriate feedback after initiating the download.
   - Simulate an API call for downloading data. Handle both successful and failed responses gracefully.
   - If the download is successful, display mock data in a modal (not required to trigger an actual file download).

3. **Tools and Guidelines**:
   - Component Library: Use any modern UI library (e.g., Bootstrap, Material-UI, Ant Design etc) for building the interface.
   - Styling: Choose your preferred styling approach (Traditional CSS, Tailwind CSS, etc.).
   - **Node.js**: Use version 18 or newer.
   - **React**: Use version 18 or newer.

---

## Approach

### **Key Points of the Buildings Design**

**User-Centric Approach**:
   - Simplified workflows for users to search, filter, and view building metrics.
   - Designed with user personas in mind: energy managers, project managers, and school managers.

**Dynamic Search**:
   - Auto-complete dropdowns for buildings and associated assets (rooms/meters).
   - Filters based on selected building, asset, and date range.

**Seamless Data Display**:
   - Reusable dialog for presenting results with a dynamic table structure.
   - Table columns and data adapt to the selected asset type (e.g., temperature/humidity for rooms, energy/cost for meters).

**Error Handling**:
   - **30% of API requests intentionally fail** to simulate real-world scenarios and test the app’s error handling capabilities.
   - Error messages and retry options displayed in a user-friendly manner.

**Mock API Integration**:
   - MSW (Mock Service Worker) simulates API calls for a realistic development environment.
   - Mocked data for buildings, assets, and search results ensures consistency during testing.

**Customizable UI**:
   - Built with **PrimeReact** for modern, interactive components.
   - Styled using **SCSS** for easy customization and maintainability.

**Performance-Oriented Design**:
   - Lightweight frontend built with **Vite**, ensuring fast development and build times.

**Reusability**:
   - Modular components (e.g., `SearchResults`, `BuildingInput`) that can be reused across different parts of the app.
   - SCSS mixins and variables for consistent theming.

**Error Recovery**:
   - Dialogs provide clear feedback for errors with actionable options (e.g., retrying requests).
   - Ensures smooth user experience even during simulated failures.

**Prototype-Driven Development**:
    - Backed by a detailed **Figma prototype** and **interactive design**.
    - Aligns with user expectations and tested design patterns for usability.

## Features

- **Dynamic Search**: Auto-complete dropdowns for buildings and assets.
- **Data Display**: Reusable, responsive dialogs with tables for results.
- **Mock API Integration**: Simulates real-world scenarios with MSW.
- **Customizable Design**: Built with SCSS for easy styling.
- **User-Friendly UX**: Research-backed design to ensure usability.

## User Research

- **Personas**:

  1. **Energy and System Manager**: Interested in tracking energy consumption and cost data for operational efficiency.
  2. **Project Manager**: Needs insights into building metrics to support project decisions.
  3. **School Manager**: Focuses on temperature and humidity data for ensuring a safe and comfortable environment.

- **Insights**:
  - Users want a streamlined way to search and filter data without overwhelming options.
  - The need for clear and intuitive visualizations of results.
  - Importance of separating data types to avoid confusion.

## UI/UX Design

- The design prioritizes simplicity and accessibility, leveraging color contrasts and clear labels.
- Fully responsive interface for desktops and tablets.
- **Interactive Prototype**: [View Prototype](https://www.figma.com/proto/5fS8HvhLB86etBmvHtQN5x/Buildings?node-id=0-1&t=OslvGxoESSX9cmB7-1)
- **Figma Design**: [View Design](https://www.figma.com/design/5fS8HvhLB86etBmvHtQN5x/Buildings?node-id=0-1&t=OslvGxoESSX9cmB7-1)


---

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or later.
- **npm**: Version 8 or later (comes with Node.js).
- **Vite**: Installed globally (optional, for easier local builds).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/roble/buildings.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install dependencies:

   ```bash
   npm run dev
   ```

4. Open your browser at http://localhost:5173

---

## Key Libraries

- **React**: Frontend framework.
- **Vite**: Development environment.
- **PrimeReact**: UI components.
- **MSW**: Mock API service.
- **SCSS**: For styling.

---

## License

This project is licensed under the [MIT License](LICENSE).

