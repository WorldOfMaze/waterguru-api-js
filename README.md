# waterguru-api-js

[![NPM version](https://img.shields.io/npm/v/waterguru-api-js)](https://www.npmjs.com/package/waterguru-api-js)
[![License](https://img.shields.io/npm/l/waterguru-api-js)](https://github.com/WorldOfMaze/waterguru-api-js/blob/main/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/waterguru-api-js/badge.svg?branch=main)](https://coveralls.io/github/WorldOfMaze/waterguru-api-js?branch=main)
[![TypeScript](https://img.shields.io/badge/types-yes-blue)](#)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/waterguru-api-js)](https://bundlephobia.com/package/waterguru-api-js)



TypeScript client library for accessing the WaterGuru dashboard data.

---

## Table of Contents

- [waterguru-api-js](#waterguru-api-js)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [API](#api)
    - [`new WaterGuruAPI(options)`](#new-waterguruapioptions)
    - [`getDashboard(): Promise<WaterGuruDashboard>`](#getdashboard-promisewatergurudashboard)
  - [Types](#types)
  - [Error Handling](#error-handling)
  - [Demo](#demo)
  - [Changelog](#changelog)
    - [\[1.1.0\] - 2025-09-21](#110---2025-09-21)
      - [Added](#added)
      - [Fixed](#fixed)
      - [Changed](#changed)
    - [\[1.0.0\] - 2025-09-20](#100---2025-09-20)
      - [Added](#added-1)
      - [Fixed](#fixed-1)
      - [Changed](#changed-1)
  - [Caveats \& Limitations](#caveats--limitations)
  - [License](#license)
  - [Credits](#credits)

---

## Installation

```bash
npm install waterguru-api-js
# or
yarn add waterguru-api-js
# or
ban add water-guru-js
```

---

## Quick Start

```ts
import { WaterGuruAPI, WaterGuruDashboard } from 'waterguru-api-js';

async function main() {
  try {
    const username = process.env.WATERGURU_USER!;
    const password = process.env.WATERGURU_PASSWORD!;

    const api = new WaterGuruAPI({ username, password });
    const dashboard: WaterGuruDashboard = await api.getDashboard();

    console.log('Status:', dashboard.status);
    console.log('Water Bodies:', dashboard.waterBodies.length);

  }
  catch (error) {
    console.error('WaterGuru API error:', error)
  }
}

main().catch(console.error);
```

---

## API

### `new WaterGuruAPI(options)`

Constructor options:

| Option     | Type     | Required | Description                     |
| ---------- | -------- | -------- | ------------------------------- |
| `username` | `string` | ✅        | Your WaterGuru account email    |
| `password` | `string` | ✅        | Your WaterGuru account password |

### `getDashboard(): Promise<WaterGuruDashboard>`

Returns the full dashboard data object. Includes water bodies, alerts, measurements, etc.

---

## Types

Some important types exported by this library:

```ts
export interface WaterGuruDashboard {
  rspType: string;
  code: string;
  lastModified: string;
  status: 'GREEN' | 'YELLOW' | 'RED';
  waterBodies: WaterBodyView[];
  // ... more fields
}

export interface WaterBodyView {
  viewType: string;
  status: 'GREEN' | 'YELLOW' | 'RED';
  name: string;
  waterTemp: number;
  waterTempTime: string;
  // ... more fields
}
```

---

## Error Handling

If something goes wrong (login failure, network issue, response mismatch, etc.), the methods throw an `Error`. Always wrap calls in `try/catch`:

```ts
try {
  const dashboard = await api.getDashboard();
} catch (err) {
  console.error("WaterGuru API error:", err);
}
```

---

## Demo

A simple demonstration is included to show how to use the waterguru-api-ts library.

1. Install dependencies
   
    ```bash
    npm install
    ```

2. Build the library
    ```bash
    npm run build
    ```

3. Build the demo
    ```bash
    npm run build:demo
    ```
    Note: The following error will be displayed and can safely be ignored

    > demo/server.ts:4:30 - error TS2792: Cannot find module '../../dist/index.js'. Did you mean
    > to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?
    >
    > 4 import { WaterGuruAPI } from "../../dist/index.js";

4. Run the demo server
    ```bash
    npm run demo
    ```

    The server will start on http://localhost:3000

5. Open the demo in a browser

    Open http://localhost:3000 and enter your WaterGuru username and password.
The dashboard data will be fetched and sample data displayed on the page.


## Changelog

### [1.1.0] - 2025-09-21

#### Added
* Added demo page and server
* Updated build system to handle both distribution and demo
  
#### Fixed
* N/A

#### Changed
* N/A
* 
### [1.0.0] - 2025-09-20

#### Added
* Initial release of waterguru-api-ts.
  
#### Fixed
* N/A

#### Changed
* N/A

## Caveats & Limitations

- This is an **unofficial** library.  
- WaterGuru does not publish a stable public API; endpoints may change without warning.  
- Avoid frequent polling — excessive requests may result in blocks or rate limiting.  

---

## License

MIT © Steve Maze

---

## Credits

- This library is inspired by and ported from [bdwilson/waterguru-api](https://github.com/bdwilson/waterguru-api).  
  Huge thanks to bdwilson and contributors for their work.
