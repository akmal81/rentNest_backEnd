Backend Repo     : https://github.com/your-username/rentnest-backend
Live API         : https://rentnest-api.vercel.app
API Docs         : https://documenter.getpostman.com/view/xxx
Demo Video       : https://drive.google.com/file/d/xxx/view
Admin Email      : admin@rentnest.com
Admin Password   : admin123

*Deadlin: July 09, 2026, 11:59 PM*

# auth
1. **POST/api/auth/register	Register new user**
2. **POST/api/auth/login	    Login  user**
3. **POST/api/auth/me	        user profile**

# Properties (Public)
4. **GET/api/properties	    Get all properties with filters (location, price, type)**
5. **GET/api/properties/:id	    Get property details**
6. **GET/api/categories	        Getall property categories**

# Landlord Management
7. **POST/api/landlord/properties            Create new property listing**
8. **PUT/api/landlord/properties/:id         Update property listing**
9. **DELETE/api/landlord/properties/:id      Remove property listing**
  **extrea /properties/availability/:id"**
10. **GET/api/landlord/requests   Get all rental requests for landlord's properties**
11. **PATCH-/api/landlord/requests/:id        Approve or reject a rental request**


# Rental Requests
12. **POSt/api/rentals	  Submit a rental request (tenant)** // *check response*
13. **GET/api/rentals	      Get user's rental requests**
14. **GET/api/rentals/:id	  Get rental request details**


# Payments (Stripe / SSLCommerz)
15. POST	/api/payments/create	Create a payment intent/session for an approved rental
16. POST	/api/payments/confirm	Confirm/verify payment (webhook or callback)
17. GET	/api/payments	Get user's payment history
18. GET	/api/payments/:id	Get payment details


# Reviews
19. POST	/api/reviews	Create review (after completed rental)

# Admin
20. **GET	/api/admin/users	Get all users**
21. **PATCH	/api/admin/users/:id	Update user status (ban/unban)**
22. **GET	/api/admin/properties	Get all properties**
23. **GET	/api/admin/rentals	Get all rental requests**






## deploy doc

1. **install tsup**

change script  in package.json

"build": "tsup",


add a tsup.config.ts at root dir

```ts
import { defineConfig } from "tsup";

export default defineConfig({

    entry: ["src/server.ts"],

    //format: ["esm", "cjs"], // Keep this as ESM
    format: ["esm"], // Keep this as ESM

    target: "esnext",

    outDir: "dist",

    clean: true,

    bundle: true,

    splitting: false,

    sourcemap: true,

    // Add this banner to shim require() for CJS dependencies

    banner: {

        js: `

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  `,

    },

});
```
2. **build and test dist folder**
```bash
npm run build
npm run start
```

add this two file in tsconfig.ts

```ts
"include": ["src/**/*"],
  "exclude": []
```

3. **deploy in vercel **
```bash
npm i -g vercel // vercel not installed before
vercel login
vercel --prod
```

4. add a vercel.json at root dir

```ts
{
    "version": 2,
    "builds": [
        {
            "src": "dist/server.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "dist/server.js"
        }
    ]
}
```