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

10. *GET/api/landlord/requests       Get all rental requests for landlord's properties*
11. *PATCH-/api/landlord/requests/:id        Approve or reject a rental request*


# Rental Requests
12. POSt/api/rentals	  Submit a rental request (tenant)
13. GET/api/rentals	      Get user's rental requests
14. GET/api/rentals/:id	  Get rental request details