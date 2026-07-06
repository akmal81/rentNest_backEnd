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
2. **POST/api/auth/me	        user profile**

# Landlord Management
1. **POST/api/landlord/properties            Create new property listing**
2. **PUT/api/landlord/properties/:id         Update property listing**
3. DELETE/api/landlord/properties/:id      Remove property listing
4. GET/api/landlord/requests       Get all rental requests for landlord's properties
5. PATCH-/api/landlord/requests/:id        Approve or reject a rental request

# Properties (Public)
1. GET/api/properties	      Get all properties with filters (location, price, type)
2. GET/api/properties/:id	    Get property details
3. **GET/api/categories	        Getall property categories**