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
